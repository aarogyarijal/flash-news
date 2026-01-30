#!/usr/bin/env python3
import json
import sys
import os
import requests
from datetime import datetime
import xml.etree.ElementTree as ET
from urllib.parse import urlparse

def fetch_rss_feed(url, source_name, category, logo=None):
    """Fetch and parse an RSS feed"""
    articles = []
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
        }
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        
        root = ET.fromstring(response.content)
        
        # Handle different RSS formats
        items = root.findall('.//item') or root.findall('.//{http://www.w3.org/2005/Atom}entry')
        
        for item in items[:10]:  # Limit to 10 articles per source
            article = parse_rss_item(item, source_name, category, logo)
            if article:
                articles.append(article)
                
    except Exception as e:
        print(f"Error fetching {source_name}: {e}")
    
    return articles

def upgrade_image_resolution(url):
    """Upgrade image URL to higher resolution version if possible"""
    if not url:
        return url
    
    import re
    
    # BBC images: change /standard/240/ to /standard/1024/ or remove size constraint
    if 'ichef.bbci.co.uk' in url:
        url = re.sub(r'/standard/\d+/', '/standard/1024/', url)
        url = re.sub(r'/ace/standard/\d+/', '/ace/standard/1024/', url)
    
    # Reuters images: upgrade resolution
    if 'reuters.com' in url:
        url = re.sub(r'/resizer/v2/[^?]+', lambda m: m.group(0).replace('width=', 'width=1200'), url)
    
    # Guardian images: upgrade to larger size
    if 'guim.co.uk' in url:
        url = re.sub(r'/\d+\.jpg', '/1000.jpg', url)
    
    # Generic: try to replace common small size patterns with larger ones
    url = re.sub(r'[?&]w=\d+', '?w=1200', url)
    url = re.sub(r'[?&]width=\d+', '?width=1200', url)
    url = re.sub(r'[?&]size=\d+', '?size=1200', url)
    
    return url

def parse_rss_item(item, source_name, category, logo=None):
    """Parse a single RSS item into an article dict"""
    try:
        # Standard RSS format
        title = item.findtext('title') or item.findtext('{http://www.w3.org/2005/Atom}title')
        link = item.findtext('link') or item.findtext('{http://www.w3.org/2005/Atom}link')
        description = item.findtext('description') or item.findtext('{http://www.w3.org/2005/Atom}summary') or ''
        pub_date = item.findtext('pubDate') or item.findtext('{http://www.w3.org/2005/Atom}published')
        
        # Try to get image from media:content or enclosure
        image = None
        media_content = item.find('.//{http://search.yahoo.com/mrss/}content')
        if media_content is not None:
            image = media_content.get('url')
        
        enclosure = item.find('enclosure')
        if enclosure is not None and not image:
            enc_type = enclosure.get('type', '')
            if 'image' in enc_type:
                image = enclosure.get('url')
        
        # Try media:thumbnail
        if not image:
            media_thumb = item.find('.//{http://search.yahoo.com/mrss/}thumbnail')
            if media_thumb is not None:
                image = media_thumb.get('url')
        
        # Try to get author/journalist information
        authors = []
        # Try dc:creator (Dublin Core)
        dc_creator = item.findtext('.//{http://purl.org/dc/elements/1.1/}creator')
        if dc_creator:
            authors.append(dc_creator.strip())
        # Try standard author tag
        author = item.findtext('author') or item.findtext('{http://www.w3.org/2005/Atom}author/{http://www.w3.org/2005/Atom}name')
        if author and author.strip() not in authors:
            authors.append(author.strip())
        # Try media:credit
        media_credit = item.findtext('.//{http://search.yahoo.com/mrss/}credit')
        if media_credit and media_credit.strip() not in authors:
            authors.append(media_credit.strip())
        
        if not title or not link:
            return None
        
        # Clean up description (remove HTML tags)
        import re
        clean_description = re.sub('<[^<]+?>', '', description)
        clean_description = clean_description.strip()[:300]
        
        # Upgrade image to higher resolution
        image = upgrade_image_resolution(image)
        
        return {
            'id': hash(link) & 0xFFFFFFFF,
            'title': title.strip(),
            'link': link.strip() if isinstance(link, str) else link,
            'description': clean_description,
            'source': source_name,
            'category': category,
            'image': image,
            'logo': logo,
            'journalists': authors if authors else None,
            'publishedAt': pub_date or datetime.now().isoformat(),
            'scrapedAt': datetime.now().isoformat()
        }
    except Exception as e:
        print(f"Error parsing item: {e}")
        return None

def main():
    if len(sys.argv) < 2:
        print("Usage: python3 newsscraper.py <newspapers.json>")
        sys.exit(1)
    
    config_path = sys.argv[1]
    
    # Get the directory where this script is located
    script_dir = os.path.dirname(os.path.abspath(__file__))
    parent_dir = os.path.dirname(script_dir)
    
    # Load newspapers config
    try:
        with open(config_path, 'r') as f:
            config = json.load(f)
    except Exception as e:
        print(f"Error loading config: {e}")
        sys.exit(1)
    
    all_articles = []
    seen_links = set()  # Track URLs to avoid duplicates
    seen_titles = set()  # Track titles to catch same article from different feeds
    
    # Fetch articles from each source
    for source in config.get('sources', []):
        name = source.get('name', 'Unknown')
        url = source.get('rss_url')
        category = source.get('category', 'General')
        logo = source.get('logo')
        
        if url:
            print(f"Fetching from {name}...")
            articles = fetch_rss_feed(url, name, category, logo)
            
            # Deduplicate articles
            new_articles = []
            for article in articles:
                link = article.get('link', '')
                # Normalize title for comparison (lowercase, strip whitespace)
                title_normalized = article.get('title', '').lower().strip()
                
                if link in seen_links:
                    continue
                if title_normalized in seen_titles:
                    continue
                    
                seen_links.add(link)
                seen_titles.add(title_normalized)
                new_articles.append(article)
            
            all_articles.extend(new_articles)
            print(f"  Found {len(articles)} articles ({len(new_articles)} new, {len(articles) - len(new_articles)} duplicates)")
    
    # Sort by published date (newest first)
    all_articles.sort(key=lambda x: x.get('publishedAt', ''), reverse=True)
    
    # Save to scraped_articles.json
    output_path = os.path.join(parent_dir, 'scraped_articles.json')
    try:
        with open(output_path, 'w') as f:
            json.dump({
                'articles': all_articles,
                'lastUpdated': datetime.now().isoformat(),
                'totalArticles': len(all_articles)
            }, f, indent=2)
        print(f"\nSaved {len(all_articles)} articles to {output_path}")
    except Exception as e:
        print(f"Error saving articles: {e}")
        sys.exit(1)

if __name__ == '__main__':
    main()

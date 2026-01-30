const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const cron = require('node-cron');
const { exec} = require('child_process');
const app = express();
const port = 3001; // You can change this port if needed

app.use(cors());

// Image proxy endpoint to bypass CORS/ORB restrictions
app.get('/proxy-image', async (req, res) => {
    const imageUrl = req.query.url;
    if (!imageUrl) {
        return res.status(400).send('Missing image URL');
    }

    try {
        const urlObj = new URL(imageUrl);
        const response = await fetch(imageUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.9',
                'Accept-Encoding': 'gzip, deflate, br',
                'Referer': urlObj.origin + '/',
                'Origin': urlObj.origin,
                'Sec-Fetch-Dest': 'image',
                'Sec-Fetch-Mode': 'no-cors',
                'Sec-Fetch-Site': 'cross-site',
                'Sec-Ch-Ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
                'Sec-Ch-Ua-Mobile': '?0',
                'Sec-Ch-Ua-Platform': '"macOS"'
            }
        });

        if (!response.ok) {
            console.error(`Image fetch failed: ${response.status} for ${imageUrl}`);
            return res.status(response.status).send('Failed to fetch image');
        }

        const contentType = response.headers.get('content-type');
        res.set('Content-Type', contentType || 'image/jpeg');
        res.set('Cache-Control', 'public, max-age=86400'); // Cache for 24 hours

        const buffer = await response.arrayBuffer();
        res.send(Buffer.from(buffer));
    } catch (error) {
        console.error('Image proxy error:', error);
        res.status(500).send('Failed to proxy image');
    }
});

// Schedule the script to run every 5 minutes
cron.schedule('*/1 * * * *', () => {
    console.log('Running the scraper script...');
    exec('python3 ./NewsScraper/newsscraper.py ./NewsScraper/NewsPapers.json', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
});

// Serve static files from the NewsScraper directory
app.get('/search', function (req, res) {
    const filePath = path.join(__dirname, 'scraped_articles.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading file: ${err}`);
            res.status(500).send('Internal Server Error');
            return;
        }

        try {
            const jsonData = JSON.parse(data);
            res.json(jsonData);
        } catch (parseError) {
            console.error(`Error parsing JSON: ${parseError}`);
            res.status(500).send('Internal Server Error');
        }
    });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
});

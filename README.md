# Flash News 📰

> A revolutionary React-based news aggregator that transforms traditional news consumption by presenting articles in an engaging TikTok-like vertical scrolling format.

## 🎯 Project Overview

Flash News reimagines how we consume news by combining the familiar social media experience of TikTok with real-time news content. Instead of scrolling through text-heavy articles, users can swipe through visually appealing news cards that display images, headlines, and summaries in an intuitive, mobile-first interface.

### Key Concept
- **TikTok-Style Interface**: Vertical scrolling through news articles with full-screen cards
- **Real-Time Content**: Automated web scraping delivers fresh news every minute
- **Visual-First Approach**: Each news story is presented as an image-based card with overlay text
- **Mobile-Optimized**: Designed primarily for mobile consumption with responsive design

## 🏗️ Architecture

Flash News follows a modern full-stack architecture with clear separation of concerns:

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Frontend      │    │     Backend      │    │  News Sources   │
│   (React)       │◄──►│  (Node.js/Express)│◄──►│   (RSS/Web)     │
│                 │    │                  │    │                 │
│ • UI Components │    │ • REST API       │    │ • BBC           │
│ • State Mgmt    │    │ • News Scraper   │    │ • Other Sources │
│ • Routing       │    │ • Cron Jobs      │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

### Frontend Architecture
- **React.js** with functional components and hooks
- **Component-based structure**: PostCard, NavBar, PostInfo, PostInteract
- **State management** via React hooks (useState, useEffect)
- **Responsive CSS** for mobile-first design
- **Font Awesome icons** for interactive elements

### Backend Architecture  
- **Express.js server** providing RESTful API
- **Automated news scraping** with Python scripts
- **Cron job scheduling** for regular content updates
- **JSON data storage** for scraped articles
- **CORS-enabled** for cross-origin requests

## ✨ Features

### 🚀 Implemented Features

#### Core News Experience
- **📱 TikTok-Style Feed**: Vertical scrolling through full-screen news cards
- **🖼️ Visual News Cards**: Each article displayed with hero images and overlay text
- **⚡ Real-Time Updates**: Automated scraping delivers fresh content every minute
- **🎯 Smooth Scrolling**: Intuitive swipe gestures for seamless navigation

#### Navigation & Discovery
- **🧭 Bottom Navigation**: Mobile-friendly navigation bar with 4 main sections:
  - 🏠 **Home**: Main news feed
  - 🔍 **Search**: Find specific content
  - 📌 **Saved**: Bookmarked articles
  - 👤 **Profile**: User settings (placeholder)
- **🔎 Smart Search**: Filter news by title, description, or source
- **📊 Grid View**: Alternative layout for browsing saved content

#### Interaction Features
- **❤️ Like System**: Interactive heart button with real-time count updates
- **💬 Comments**: Comment system UI (frontend ready)
- **🔖 Bookmark**: Save articles for later reading
- **📤 Share**: Share functionality (UI implemented)
- **🔗 Read More**: Direct links to full articles on source websites

#### Mobile Experience
- **📱 Responsive Design**: Optimized for mobile devices
- **🎨 Touch-Friendly UI**: Large tap targets and gesture-based navigation
- **⚡ Fast Loading**: Optimized image loading and caching
- **🌐 Progressive Web App**: Can be installed on mobile devices

### 🚧 Planned Features
- **👤 User Profiles**: Complete user management system
- **💬 Comments System**: Backend integration for user comments
- **🔔 Push Notifications**: Real-time news alerts
- **🎨 Themes**: Dark/light mode support
- **📊 Analytics**: User engagement tracking

## 🛠️ Technology Stack

### Frontend
- **⚛️ React 18.2.0**: Modern React with hooks and functional components
- **🎨 CSS3**: Custom responsive styling with Flexbox and Grid
- **🔧 JSX**: Component markup
- **📦 Create React App**: Development toolchain
- **🎯 Font Awesome**: Icon library for UI elements
- **🎬 React YouTube**: Video embedding capabilities

### Backend
- **🟢 Node.js**: JavaScript runtime for server-side logic
- **🚀 Express.js**: Web application framework
- **⏰ Node-Cron**: Task scheduling for automated scraping
- **🌐 CORS**: Cross-origin resource sharing middleware
- **📄 File System (fs)**: JSON data storage and retrieval

### Mobile Development
- **📱 Capacitor**: Cross-platform native runtime
- **🤖 Android Support**: Native Android app generation
- **📦 Native Plugins**: Access to device features

### Development Tools
- **💻 VS Code**: Recommended IDE
- **📦 NPM**: Package management
- **🔧 Nodemon**: Development server auto-reload
- **🏗️ Build Tools**: React Scripts for bundling and optimization

### Data & APIs
- **🗞️ RSS Feeds**: BBC and other news sources
- **🐍 Python Scripts**: Web scraping automation
- **📊 JSON**: Data storage format
- **🔄 REST API**: Client-server communication

## 📦 Installation and Setup

### Prerequisites
- **Node.js** (v14 or higher)
- **NPM** (v6 or higher)
- **Python** (for web scraping scripts)
- **Git** for version control

### Frontend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/aarogyarijal/flash-news.git
   cd flash-news
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```
   The app will open at `http://localhost:3000`

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Start the backend server**
   ```bash
   node server.js
   ```
   The API will run on `http://localhost:5000`

### Mobile Development Setup

1. **Install Capacitor CLI** (if building for mobile)
   ```bash
   npm install -g @capacitor/cli
   ```

2. **Build and sync** (for Android development)
   ```bash
   npm run andy
   ```

### Development Workflow

1. **Start both servers**:
   - Frontend: `npm start` (port 3000)
   - Backend: `node backend/server.js` (port 5000)

2. **Enable mobile view**:
   - Open browser Developer Tools (F12)
   - Enable Responsive Design Mode
   - Select a mobile device preset (iPhone/Android)

3. **Development mode**: The app will auto-reload when you make changes to the code

## 🚀 Usage Guide

### Basic Navigation
- **📱 Mobile Experience**: Best viewed in mobile responsive mode
- **⬆️⬇️ Vertical Scrolling**: Swipe or scroll to navigate between news articles
- **🧭 Bottom Navigation**: Tap icons to switch between sections
- **🔗 Read Full Articles**: Tap "Read More" to visit the original source

### Interacting with News
- **❤️ Like Articles**: Tap the heart icon to like/unlike
- **🔖 Save for Later**: Tap bookmark icon to save articles
- **🔍 Search Content**: Use the search tab to find specific topics
- **📤 Share**: Use share button to share articles (UI ready)

### Search Functionality
- **🔎 Text Search**: Search by keywords in titles, descriptions, or sources
- **📊 Results Display**: View results in a grid layout with thumbnails
- **🎯 Real-time Filtering**: Results update as you type

## 🔌 API Documentation

### Endpoints

#### GET `/search`
Returns all scraped news articles in JSON format.

**Response Format:**
```json
{
  "newspapers": {
    "bbc": {
      "rss": "http://feeds.bbci.co.uk/news/rss.xml",
      "link": "http://www.bbc.com/",
      "articles": [
        {
          "source": "bbc",
          "url": "https://www.bbc.com/news/...",
          "title": "Article Title",
          "published": "2024-01-01T12:00:00Z",
          "images": "https://image-url.jpg",
          "videos": null,
          "description": "Article description...",
          "journalists": ["Author Name"]
        }
      ]
    }
  }
}
```

### Data Flow
1. **Cron Job**: Runs every minute to scrape fresh news
2. **Python Script**: Extracts articles from RSS feeds and websites
3. **JSON Storage**: Saves scraped data to `scraped_articles.json`
4. **API Endpoint**: Serves data to React frontend
5. **React Components**: Render news cards from API data

## 🎨 Component Structure

### Core Components

#### `App.js`
- Main application component
- Manages global state (videos, currentPage, loading)
- Handles API data fetching
- Controls page routing

#### `PostCard.jsx`
- Individual news article card
- Displays image, title, description
- Handles image loading and fallbacks
- Contains interaction controls

#### `PostInfo.jsx`
- Article information display
- Title, description, source
- "Read More" link to original article
- Animated source ticker

#### `PostInteract.jsx`
- Interaction buttons (like, comment, save, share)
- Real-time count updates
- State management for user actions

#### `NavBar.jsx`
- Bottom navigation component
- Four main sections with icons
- Active state management

#### `SearchPage.jsx`
- Search functionality
- Real-time filtering
- Grid layout for results

## 🐛 Troubleshooting

### Common Issues

#### "Network Error" or Failed to Fetch
- **Cause**: Backend server not running
- **Solution**: Start backend with `node backend/server.js`
- **Verify**: Check `http://localhost:5000/search` returns JSON

#### Images Not Loading
- **Cause**: CORS issues or broken image URLs
- **Solution**: Component includes fallback image loading logic
- **Check**: Network tab in browser dev tools for failed requests

#### Mobile View Issues
- **Cause**: Not using responsive mode
- **Solution**: Enable responsive design mode in browser dev tools
- **Recommended**: Use iPhone or Android device presets

#### Blank Search Results
- **Cause**: No scraped data available
- **Solution**: Ensure backend scraping is working
- **Check**: Verify `backend/scraped_articles.json` contains data

### Development Tips
- **Hot Reload**: Both frontend and backend support auto-reload during development
- **Debug Mode**: Use browser dev tools console for debugging
- **API Testing**: Test backend endpoints directly via browser or Postman
- **Mobile Testing**: Use browser dev tools device emulation

## 🤝 Contributing

### Development Guidelines
1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Code Style
- Use **functional components** with hooks
- Follow **React best practices**
- Write **descriptive commit messages**
- Add **comments** for complex logic
- Ensure **mobile responsiveness**

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **BBC News** for RSS feeds
- **Font Awesome** for icons
- **React Community** for excellent documentation
- **TikTok** for UI/UX inspiration

---

**Made with ❤️ for better news consumption**


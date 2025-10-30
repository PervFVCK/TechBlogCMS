# TechPulse - Modern Tech Blog

## Overview
TechPulse is a fully functional, professional tech blog website built with HTML, CSS, and JavaScript. It features a complete content management system (CMS) that allows you to manage posts, images, and content without any coding knowledge.

## Current State
The website is fully functional with:
- Responsive homepage with featured articles and latest posts
- Category browsing (News, Tutorials, Reviews, Tips & Tricks)
- Full-text search functionality
- Individual article pages with related posts
- Contact form with local storage
- Newsletter subscription system
- Complete admin dashboard for content management

## Project Architecture

### File Structure
```
.
├── index.html          - Homepage with featured and latest posts
├── article.html        - Individual article view
├── category.html       - Category browsing page
├── search.html         - Search functionality
├── contact.html        - Contact form
├── admin.html          - Admin dashboard (CMS)
├── css/
│   └── style.css       - All styles and responsive design
└── js/
    ├── storage.js      - Local storage data layer
    ├── app.js          - Homepage logic
    ├── article.js      - Article page logic
    ├── category.js     - Category page logic
    ├── search.js       - Search functionality
    ├── contact.js      - Contact form logic
    └── admin.js        - Admin panel logic
```

### Technology Stack
- **Frontend**: Pure HTML5, CSS3, JavaScript (ES6+)
- **Data Storage**: Browser Local Storage API
- **Server**: Python HTTP Server (for serving static files)
- **No Dependencies**: Zero external libraries or frameworks

## Features

### Public-Facing Website
1. **Homepage**
   - Hero section with tagline
   - Featured article showcase
   - Category cards
   - Latest articles grid
   - Newsletter subscription

2. **Article Pages**
   - Clean, readable typography
   - Featured images
   - Reading time estimation
   - Related articles section
   - Category tags

3. **Category Browsing**
   - Filter articles by category
   - Dedicated pages for News, Tutorials, Reviews, Tips

4. **Search Functionality**
   - Real-time search across all posts
   - Search by title, content, excerpt, tags, or category

5. **Contact Form**
   - Name, email, subject, message fields
   - Form validation
   - Messages saved to local storage

### Admin Panel
The admin dashboard at `/admin.html` provides:

1. **Post Management**
   - View all published posts
   - Edit existing posts
   - Delete posts with confirmation
   - Mark posts as featured

2. **Create New Posts**
   - Title, category, excerpt, content
   - Featured image URL support
   - Tag management
   - Featured post toggle

3. **Subscriber Management**
   - View all newsletter subscribers
   - Remove subscribers

4. **Contact Messages**
   - View all contact form submissions
   - Delete messages

## How to Use the Admin Panel

### Adding a New Post
1. Navigate to `/admin.html`
2. Click the "New Post" tab
3. Fill in the post details:
   - **Title**: Your article title
   - **Category**: Choose from News, Tutorials, Reviews, or Tips
   - **Excerpt**: A short summary (appears on cards)
   - **Content**: Full article content (paragraphs separated by blank lines)
   - **Featured Image URL**: Link to an image or leave empty for default
   - **Tags**: Comma-separated keywords
   - **Featured**: Check to display on homepage hero
4. Click "Publish Post"

### Editing a Post
1. Go to the "Posts" tab in admin
2. Click "Edit" on any post
3. Modify the fields
4. Click "Publish Post" to save changes

### Deleting a Post
1. Go to the "Posts" tab in admin
2. Click "Delete" on the post
3. Confirm the deletion

### Image Management
- Use image hosting services like Imgur, Unsplash, or any public URL
- Paste the full image URL in the "Featured Image URL" field
- Leave empty to use a default placeholder

## Data Storage

All data is stored in the browser's Local Storage:
- **Posts**: `techblog_posts`
- **Subscribers**: `techblog_subscribers`
- **Messages**: `techblog_messages`

### Sample Data
The website comes pre-loaded with 6 sample articles covering:
- AI and technology news
- Web development tutorials
- Product reviews
- Productivity tips
- Cybersecurity trends
- Cloud computing guides

## Recent Changes
- **October 25, 2025**: Initial website creation
  - Implemented complete frontend structure
  - Created admin panel with full CRUD operations
  - Added local storage data layer
  - Implemented search and category filtering
  - Added responsive design for mobile devices
  - Included 6 sample blog posts

## Design Features
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Modern UI**: Clean, professional design with smooth animations
- **Accessibility**: Semantic HTML and proper ARIA labels
- **SEO-Friendly**: Meta tags, semantic markup, and proper heading structure
- **Fast Loading**: Optimized CSS and JavaScript, no external dependencies
- **Color Scheme**: Blue primary (#2563eb), Green accents (#10b981)

## Deployment
The website is served using Python's built-in HTTP server on port 5000. To deploy:
1. The workflow "Website Server" is automatically configured
2. All pages are accessible via the webview
3. No build step required - pure static files

## Browser Compatibility
- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Full support

## Future Enhancements (Optional)
- Backend API for multi-device sync
- User authentication for admin panel
- Comment system
- Social media integration
- Analytics dashboard
- Real email service integration
- Image upload functionality
- Rich text editor
- Draft/publish workflow
- SEO optimization tools

## Maintenance Notes
- All data is stored locally in the browser
- Clearing browser data will reset all content
- To backup data, export the localStorage items
- The website requires no server-side maintenance
- No database setup needed

## User Preferences
None recorded yet.

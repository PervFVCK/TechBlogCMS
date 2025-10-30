# TechPulse - Professional Tech Blog

A fully functional, modern tech blog website built with pure HTML, CSS, and JavaScript. Features a complete content management system for easy content management without any coding knowledge.

## 🚀 Features

### Public Website
- **Homepage**: Featured articles, latest posts, and category navigation
- **Article Pages**: Clean reading experience with related posts
- **Categories**: Browse by News, Tutorials, Reviews, and Tips & Tricks
- **Search**: Real-time search across all content
- **Contact Form**: Functional contact form with local storage
- **Newsletter**: Subscription system for updates
- **Responsive Design**: Perfect on desktop, tablet, and mobile

### Admin Panel (`/admin.html`)
- **Post Management**: Create, edit, and delete posts
- **Content Editor**: Simple forms - no coding required
- **Featured Posts**: Mark posts to appear on homepage
- **Image Management**: Add images via URL
- **Subscriber Management**: View and manage newsletter subscribers
- **Contact Messages**: View all contact form submissions
- **Tag System**: Organize posts with tags

## 📁 Project Structure

```
.
├── index.html          # Homepage
├── article.html        # Article detail page
├── category.html       # Category browsing
├── search.html         # Search functionality
├── contact.html        # Contact form
├── admin.html          # Admin dashboard
├── css/
│   └── style.css       # All styles
└── js/
    ├── storage.js      # Data management & local storage
    ├── app.js          # Homepage logic
    ├── article.js      # Article page logic
    ├── category.js     # Category page logic
    ├── search.js       # Search functionality
    ├── contact.js      # Contact form logic
    └── admin.js        # Admin panel logic
```

## 🎨 Using the Admin Panel

### Creating a New Post

1. Navigate to `/admin.html`
2. Click the "New Post" tab
3. Fill in the form:
   - **Title**: Your article title
   - **Category**: Select from dropdown
   - **Excerpt**: Brief summary (shows on cards)
   - **Content**: Full article (paragraphs separated by blank lines)
   - **Featured Image URL**: Paste image URL or leave empty
   - **Tags**: Comma-separated keywords
   - **Featured**: Check to show on homepage
4. Click "Publish Post"

### Editing Posts

1. Go to "Posts" tab
2. Click "Edit" on any post
3. Modify fields
4. Click "Publish Post" to save

### Managing Content

- **Subscribers**: View and remove newsletter subscribers
- **Messages**: Read and delete contact form submissions
- **Posts**: Edit or delete any published article

## 🔒 Security

- All user inputs are sanitized to prevent XSS attacks
- No inline event handlers - uses modern addEventListener
- HTML content is escaped before rendering
- Production-ready and secure

## 💾 Data Storage

All data is stored in browser's Local Storage:
- Posts, subscribers, and messages persist between sessions
- No server or database required
- Sample content included for demonstration

## 🎯 Sample Content

The blog comes with 6 sample articles:
- AI and technology news
- Web development tutorials
- Product reviews
- Productivity tips
- Cybersecurity trends
- Cloud computing guides

## 🌐 Deployment

The website is ready to deploy as-is:
- Pure static files - no build process needed
- Works with any web server
- Currently served via Python HTTP server on port 5000

To publish to production, use Replit's deployment feature.

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints at 768px and 480px
- Touch-friendly navigation
- Optimized images

## 🎨 Design Features

- **Modern UI**: Clean, professional design
- **Smooth Animations**: Subtle transitions and hover effects
- **Typography**: Optimized for readability
- **Color Scheme**: Blue (#2563eb) and Green (#10b981)
- **Icons**: SVG icons and emoji for visual interest

## 🚀 Getting Started

1. Open the website - it's already running!
2. Browse the sample content
3. Go to `/admin.html` to manage content
4. Create your first post
5. Customize and enjoy!

## 📝 Notes

- Clear browser data to reset all content
- Images use URLs from external sources (Unsplash, placeholders)
- All features work offline after first load
- No external dependencies or frameworks

---

Built with ❤️ using pure HTML, CSS, and JavaScript

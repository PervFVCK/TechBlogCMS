document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    const searchIcons = document.querySelectorAll('.search-icon');
    searchIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            window.location.href = 'search.html';
        });
    });

    loadArticle();
    loadRelatedPosts();
});

function loadArticle() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    const articleContainer = document.getElementById('articleContent');

    if (!postId) {
        articleContainer.innerHTML = '<p class="loading">Article not found</p>';
        return;
    }

    const post = StorageManager.getPostById(postId);

    if (!post) {
        articleContainer.innerHTML = '<p class="loading">Article not found</p>';
        return;
    }

    document.title = `${post.title} - TechPulse`;

    const sanitizedTitle = StorageManager.sanitizeHTML(post.title);
    const sanitizedContent = StorageManager.sanitizeForDisplay(post.content);
    const sanitizedCategory = StorageManager.sanitizeHTML(post.category);
    const sanitizedImageAlt = StorageManager.sanitizeHTML(post.title);

    const html = `
        <div class="article-header">
            <span class="post-category">${sanitizedCategory}</span>
            <h1 class="article-title">${sanitizedTitle}</h1>
            <div class="featured-meta">
                <span>📅 ${StorageManager.formatDate(post.date)}</span>
                <span>⏱️ ${StorageManager.getReadingTime(post.content)}</span>
            </div>
        </div>
        <img src="${StorageManager.sanitizeHTML(post.image)}" alt="${sanitizedImageAlt}" class="article-image" data-fallback="https://via.placeholder.com/1200x500?text=Article+Image">
        <div class="article-body">
            ${sanitizedContent}
        </div>
    `;

    articleContainer.innerHTML = html;
    StorageManager.setupImageFallbacks(articleContainer);
}

function loadRelatedPosts() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
    const currentPost = StorageManager.getPostById(postId);

    if (!currentPost) return;

    const relatedPosts = StorageManager.getPostsByCategory(currentPost.category)
        .filter(post => post.id !== postId)
        .slice(0, 3);

    const relatedContainer = document.getElementById('relatedPosts');

    if (relatedPosts.length === 0) {
        relatedContainer.innerHTML = '<p class="loading">No related articles found</p>';
        return;
    }

    const html = relatedPosts.map(post => `
        <a href="article.html?id=${post.id}" class="post-card">
            <img src="${StorageManager.sanitizeHTML(post.image)}" alt="${StorageManager.sanitizeHTML(post.title)}" class="post-image" data-fallback="https://via.placeholder.com/400x200?text=Article+Image">
            <div class="post-content">
                <span class="post-category">${StorageManager.sanitizeHTML(post.category)}</span>
                <h3>${StorageManager.sanitizeHTML(post.title)}</h3>
                <p class="post-excerpt">${StorageManager.sanitizeHTML(post.excerpt)}</p>
                <div class="post-meta">
                    <span>📅 ${StorageManager.formatDate(post.date)}</span>
                    <span>⏱️ ${StorageManager.getReadingTime(post.content)}</span>
                </div>
            </div>
        </a>
    `).join('');

    relatedContainer.innerHTML = html;
    StorageManager.setupImageFallbacks(relatedContainer);
}

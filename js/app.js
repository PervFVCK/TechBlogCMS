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

    loadFeaturedPost();
    loadLatestPosts();
    setupNewsletterForm();
});

function loadFeaturedPost() {
    const featuredPost = StorageManager.getFeaturedPost();
    const featuredContainer = document.getElementById('featuredPost');

    if (!featuredPost) {
        featuredContainer.innerHTML = '<p class="loading">No featured post available</p>';
        return;
    }

    const html = `
        <div class="featured-card">
            <img src="${StorageManager.sanitizeHTML(featuredPost.image)}" alt="${StorageManager.sanitizeHTML(featuredPost.title)}" class="featured-image" data-fallback="https://via.placeholder.com/800x400?text=Featured+Article">
            <div class="featured-content-text">
                <span class="featured-category">${StorageManager.sanitizeHTML(featuredPost.category)}</span>
                <h2>${StorageManager.sanitizeHTML(featuredPost.title)}</h2>
                <div class="featured-meta">
                    <span>📅 ${StorageManager.formatDate(featuredPost.date)}</span>
                    <span>⏱️ ${StorageManager.getReadingTime(featuredPost.content)}</span>
                </div>
                <p>${StorageManager.sanitizeHTML(featuredPost.excerpt)}</p>
                <a href="article.html?id=${featuredPost.id}" class="btn btn-primary">Read More</a>
            </div>
        </div>
    `;

    featuredContainer.innerHTML = html;
    StorageManager.setupImageFallbacks(featuredContainer);
}

function loadLatestPosts() {
    const posts = StorageManager.getPosts().slice(0, 6);
    const postsContainer = document.getElementById('latestPosts');

    if (posts.length === 0) {
        postsContainer.innerHTML = '<p class="loading">No posts available</p>';
        return;
    }

    const html = posts.map(post => createPostCard(post)).join('');
    postsContainer.innerHTML = html;
    StorageManager.setupImageFallbacks(postsContainer);
}

function createPostCard(post) {
    return `
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
    `;
}

function setupNewsletterForm() {
    const form = document.getElementById('newsletterForm');
    const messageDiv = document.getElementById('newsletterMessage');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const emailInput = document.getElementById('newsletterEmail');
            const email = emailInput.value.trim();

            if (StorageManager.addSubscriber(email)) {
                showMessage(messageDiv, 'Thank you for subscribing! Check your inbox for updates.', 'success');
                emailInput.value = '';
            } else {
                showMessage(messageDiv, 'This email is already subscribed.', 'error');
            }
        });
    }
}

function showMessage(element, message, type) {
    element.textContent = message;
    element.className = `message ${type}`;
    setTimeout(() => {
        element.className = 'message';
    }, 5000);
}

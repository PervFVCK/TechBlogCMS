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

    loadCategoryPosts();
});

function loadCategoryPosts() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('cat');

    const titleElement = document.getElementById('categoryTitle');
    const descriptionElement = document.getElementById('categoryDescription');
    const postsContainer = document.getElementById('categoryPosts');

    if (!category) {
        postsContainer.innerHTML = '<p class="loading">Category not specified</p>';
        return;
    }

    const categoryInfo = {
        news: {
            title: 'Tech News',
            description: 'Latest updates and breaking news from the technology industry'
        },
        tutorials: {
            title: 'Tutorials',
            description: 'Step-by-step guides to help you learn and master new technologies'
        },
        reviews: {
            title: 'Product Reviews',
            description: 'In-depth analysis and reviews of the latest tech products'
        },
        tips: {
            title: 'Tips & Tricks',
            description: 'Expert tips and best practices for developers and tech enthusiasts'
        }
    };

    const info = categoryInfo[category] || { title: category, description: 'Browse articles in this category' };
    titleElement.textContent = info.title;
    descriptionElement.textContent = info.description;
    document.title = `${info.title} - TechPulse`;

    const posts = StorageManager.getPostsByCategory(category);

    if (posts.length === 0) {
        postsContainer.innerHTML = '<p class="loading">No posts found in this category</p>';
        return;
    }

    const html = posts.map(post => `
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

    postsContainer.innerHTML = html;
    StorageManager.setupImageFallbacks(postsContainer);
}

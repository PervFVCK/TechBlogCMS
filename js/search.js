document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    setupSearch();
});

function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const resultsContainer = document.getElementById('searchResults');

    function performSearch() {
        const query = searchInput.value.trim();

        if (!query) {
            resultsContainer.innerHTML = '<p class="search-hint">Please enter a search term</p>';
            return;
        }

        const results = StorageManager.searchPosts(query);

        if (results.length === 0) {
            resultsContainer.innerHTML = `
                <div style="text-align: center; padding: 3rem;">
                    <h3>No results found for "${StorageManager.sanitizeHTML(query)}"</h3>
                    <p style="color: var(--text-secondary); margin-top: 1rem;">Try different keywords or browse our categories</p>
                </div>
            `;
            return;
        }

        const html = `
            <div style="margin-bottom: 2rem;">
                <h2>Found ${results.length} result${results.length !== 1 ? 's' : ''} for "${StorageManager.sanitizeHTML(query)}"</h2>
            </div>
            <div class="posts-grid">
                ${results.map(post => `
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
                `).join('')}
            </div>
        `;

        resultsContainer.innerHTML = html;
        StorageManager.setupImageFallbacks(resultsContainer);
    }

    searchButton.addEventListener('click', performSearch);

    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    searchInput.addEventListener('input', function() {
        if (this.value.trim().length >= 2) {
            performSearch();
        }
    });
}

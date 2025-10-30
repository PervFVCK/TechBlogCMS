document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    setupTabs();
    loadPosts();
    loadSubscribers();
    loadMessages();
    setupPostForm();
});

function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');

            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            this.classList.add('active');
            document.getElementById(`${targetTab}-tab`).classList.add('active');
        });
    });
}

function loadPosts() {
    const posts = StorageManager.getPosts();
    const postsContainer = document.getElementById('adminPostsList');

    if (posts.length === 0) {
        postsContainer.innerHTML = '<p class="loading">No posts yet. Create your first post!</p>';
        return;
    }

    const html = posts.map(post => `
        <div class="admin-post-item">
            <div class="admin-post-info">
                <h3>${StorageManager.sanitizeHTML(post.title)}</h3>
                <p>
                    <strong>Category:</strong> ${StorageManager.sanitizeHTML(post.category)} | 
                    <strong>Date:</strong> ${StorageManager.formatDate(post.date)} | 
                    <strong>Featured:</strong> ${post.featured ? 'Yes' : 'No'}
                </p>
            </div>
            <div class="admin-post-actions">
                <button class="edit-btn" data-post-id="${post.id}">Edit</button>
                <button class="delete-btn" data-post-id="${post.id}">Delete</button>
            </div>
        </div>
    `).join('');

    postsContainer.innerHTML = html;

    postsContainer.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            editPost(this.getAttribute('data-post-id'));
        });
    });

    postsContainer.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            deletePost(this.getAttribute('data-post-id'));
        });
    });
}

function setupPostForm() {
    const form = document.getElementById('postForm');
    const messageDiv = document.getElementById('postMessage');
    const cancelBtn = document.getElementById('cancelEdit');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const postId = document.getElementById('postId').value;
        const postData = {
            title: document.getElementById('postTitle').value.trim(),
            category: document.getElementById('postCategory').value,
            excerpt: document.getElementById('postExcerpt').value.trim(),
            content: document.getElementById('postContent').value.trim(),
            image: document.getElementById('postImage').value.trim() || 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=400&fit=crop',
            featured: document.getElementById('postFeatured').checked,
            tags: document.getElementById('postTags').value.split(',').map(tag => tag.trim()).filter(tag => tag)
        };

        if (postId) {
            StorageManager.updatePost(postId, postData);
            showMessage(messageDiv, 'Post updated successfully!', 'success');
        } else {
            StorageManager.addPost(postData);
            showMessage(messageDiv, 'Post created successfully!', 'success');
        }

        form.reset();
        document.getElementById('postId').value = '';
        document.getElementById('formTitle').textContent = 'Create New Post';
        loadPosts();

        setTimeout(() => {
            switchToTab('posts');
        }, 1500);
    });

    cancelBtn.addEventListener('click', function() {
        form.reset();
        document.getElementById('postId').value = '';
        document.getElementById('formTitle').textContent = 'Create New Post';
        switchToTab('posts');
    });
}

function editPost(id) {
    const post = StorageManager.getPostById(id);
    if (!post) return;

    document.getElementById('postId').value = post.id;
    document.getElementById('postTitle').value = post.title;
    document.getElementById('postCategory').value = post.category;
    document.getElementById('postExcerpt').value = post.excerpt;
    document.getElementById('postContent').value = post.content;
    document.getElementById('postImage').value = post.image;
    document.getElementById('postFeatured').checked = post.featured || false;
    document.getElementById('postTags').value = post.tags ? post.tags.join(', ') : '';

    document.getElementById('formTitle').textContent = 'Edit Post';

    switchToTab('new-post');
}

function deletePost(id) {
    if (confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
        StorageManager.deletePost(id);
        loadPosts();
        showMessage(document.getElementById('postMessage'), 'Post deleted successfully!', 'success');
    }
}

function loadSubscribers() {
    const subscribers = StorageManager.getSubscribers();
    const subscribersContainer = document.getElementById('subscribersList');

    if (subscribers.length === 0) {
        subscribersContainer.innerHTML = '<p class="loading">No subscribers yet</p>';
        return;
    }

    const html = subscribers.map((email, index) => {
        const sanitizedEmail = StorageManager.sanitizeHTML(email);
        return `
            <div class="subscriber-item">
                <span>${sanitizedEmail}</span>
                <button class="delete-btn" data-subscriber-index="${index}">Remove</button>
            </div>
        `;
    }).join('');

    subscribersContainer.innerHTML = html;

    subscribersContainer.querySelectorAll('.delete-btn').forEach((btn, index) => {
        btn.addEventListener('click', function() {
            const email = subscribers[index];
            if (confirm(`Remove ${email} from subscribers?`)) {
                StorageManager.deleteSubscriber(email);
                loadSubscribers();
            }
        });
    });
}

function loadMessages() {
    const messages = StorageManager.getMessages();
    const messagesContainer = document.getElementById('messagesList');

    if (messages.length === 0) {
        messagesContainer.innerHTML = '<p class="loading">No messages yet</p>';
        return;
    }

    const html = messages.map(msg => `
        <div class="message-item">
            <h4>${StorageManager.sanitizeHTML(msg.subject)}</h4>
            <p><strong>From:</strong> ${StorageManager.sanitizeHTML(msg.name)} (${StorageManager.sanitizeHTML(msg.email)})</p>
            <p><strong>Date:</strong> ${StorageManager.formatDate(msg.date)}</p>
            <p><strong>Message:</strong> ${StorageManager.sanitizeHTML(msg.message)}</p>
            <button class="delete-btn" data-message-id="${msg.id}">Delete</button>
        </div>
    `).join('');

    messagesContainer.innerHTML = html;

    messagesContainer.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            deleteMessage(this.getAttribute('data-message-id'));
        });
    });
}

function deleteMessage(id) {
    if (confirm('Delete this message?')) {
        StorageManager.deleteMessage(id);
        loadMessages();
    }
}

function switchToTab(tabName) {
    const tabButton = document.querySelector(`[data-tab="${tabName}"]`);
    if (tabButton) {
        tabButton.click();
    }
}

function showMessage(element, message, type) {
    element.textContent = message;
    element.className = `message ${type}`;
    setTimeout(() => {
        element.className = 'message';
    }, 5000);
}

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

    setupContactForm();
});

function setupContactForm() {
    const form = document.getElementById('contactForm');
    const messageDiv = document.getElementById('contactMessage');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                subject: document.getElementById('subject').value.trim(),
                message: document.getElementById('message').value.trim()
            };

            StorageManager.addMessage(formData);

            showMessage(messageDiv, 'Thank you for your message! We will get back to you soon.', 'success');
            form.reset();
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

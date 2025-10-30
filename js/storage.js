const StorageManager = {
    POSTS_KEY: 'techblog_posts',
    SUBSCRIBERS_KEY: 'techblog_subscribers',
    MESSAGES_KEY: 'techblog_messages',

    sanitizeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    },

    sanitizeForDisplay(content) {
        return content
            .split('\n\n')
            .map(paragraph => {
                const sanitized = this.sanitizeHTML(paragraph);
                return `<p>${sanitized}</p>`;
            })
            .join('');
    },

    getPosts() {
        const posts = localStorage.getItem(this.POSTS_KEY);
        return posts ? JSON.parse(posts) : this.getDefaultPosts();
    },

    savePosts(posts) {
        localStorage.setItem(this.POSTS_KEY, JSON.stringify(posts));
    },

    getPostById(id) {
        const posts = this.getPosts();
        return posts.find(post => post.id === id);
    },

    addPost(post) {
        const posts = this.getPosts();
        post.id = Date.now().toString();
        post.date = new Date().toISOString();
        posts.unshift(post);
        this.savePosts(posts);
        return post;
    },

    updatePost(id, updatedPost) {
        const posts = this.getPosts();
        const index = posts.findIndex(post => post.id === id);
        if (index !== -1) {
            posts[index] = { ...posts[index], ...updatedPost, id, date: posts[index].date };
            this.savePosts(posts);
            return posts[index];
        }
        return null;
    },

    deletePost(id) {
        const posts = this.getPosts();
        const filteredPosts = posts.filter(post => post.id !== id);
        this.savePosts(filteredPosts);
    },

    getPostsByCategory(category) {
        const posts = this.getPosts();
        return posts.filter(post => post.category === category);
    },

    getFeaturedPost() {
        const posts = this.getPosts();
        return posts.find(post => post.featured) || posts[0];
    },

    searchPosts(query) {
        const posts = this.getPosts();
        const lowercaseQuery = query.toLowerCase();
        return posts.filter(post =>
            post.title.toLowerCase().includes(lowercaseQuery) ||
            post.excerpt.toLowerCase().includes(lowercaseQuery) ||
            post.content.toLowerCase().includes(lowercaseQuery) ||
            post.category.toLowerCase().includes(lowercaseQuery) ||
            (post.tags && post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)))
        );
    },

    getSubscribers() {
        const subscribers = localStorage.getItem(this.SUBSCRIBERS_KEY);
        return subscribers ? JSON.parse(subscribers) : [];
    },

    addSubscriber(email) {
        const subscribers = this.getSubscribers();
        if (!subscribers.includes(email)) {
            subscribers.push(email);
            localStorage.setItem(this.SUBSCRIBERS_KEY, JSON.stringify(subscribers));
            return true;
        }
        return false;
    },

    deleteSubscriber(email) {
        const subscribers = this.getSubscribers();
        const filtered = subscribers.filter(sub => sub !== email);
        localStorage.setItem(this.SUBSCRIBERS_KEY, JSON.stringify(filtered));
    },

    getMessages() {
        const messages = localStorage.getItem(this.MESSAGES_KEY);
        return messages ? JSON.parse(messages) : [];
    },

    addMessage(message) {
        const messages = this.getMessages();
        message.id = Date.now().toString();
        message.date = new Date().toISOString();
        messages.unshift(message);
        localStorage.setItem(this.MESSAGES_KEY, JSON.stringify(messages));
    },

    deleteMessage(id) {
        const messages = this.getMessages();
        const filtered = messages.filter(msg => msg.id !== id);
        localStorage.setItem(this.MESSAGES_KEY, JSON.stringify(filtered));
    },

    getDefaultPosts() {
        const defaultPosts = [
            {
                id: '1',
                title: 'The Future of Artificial Intelligence in 2025',
                category: 'news',
                excerpt: 'Exploring the latest breakthroughs in AI technology and what they mean for the future of computing.',
                content: 'Artificial Intelligence continues to revolutionize every aspect of our lives. From advanced language models to autonomous systems, AI is becoming more sophisticated and accessible.\n\nMajor tech companies are investing billions in AI research, leading to unprecedented advancements in machine learning, natural language processing, and computer vision. These developments are not just theoretical - they\'re being deployed in real-world applications that touch millions of lives daily.\n\nAs we look toward the future, AI promises to solve some of humanity\'s greatest challenges, from healthcare diagnostics to climate change mitigation. However, with great power comes great responsibility, and the tech community must address ethical considerations and potential risks.\n\nThe democratization of AI tools means that developers and businesses of all sizes can now leverage these powerful technologies. This accessibility is driving innovation across industries and creating new opportunities for growth and efficiency.',
                image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
                date: '2025-10-20T10:00:00.000Z',
                featured: true,
                tags: ['AI', 'Technology', 'Future']
            },
            {
                id: '2',
                title: 'Complete Guide to Building Modern Web Applications',
                category: 'tutorials',
                excerpt: 'Learn how to build fast, responsive, and user-friendly web applications using the latest technologies and best practices.',
                content: 'Building modern web applications requires understanding of contemporary frameworks, tools, and methodologies. This comprehensive guide will walk you through the essential concepts.\n\nFirst, let\'s talk about the foundation - HTML, CSS, and JavaScript. While frameworks come and go, these core technologies remain essential. Understanding them deeply will make you a better developer regardless of which tools you choose.\n\nResponsive design is no longer optional. Your applications must work seamlessly across devices of all sizes. This means thinking mobile-first and using flexible layouts, relative units, and media queries effectively.\n\nPerformance optimization is crucial. Users expect fast-loading pages, and search engines reward them. Techniques like code splitting, lazy loading, and efficient caching can dramatically improve your application\'s speed.\n\nFinally, don\'t forget about accessibility. Building inclusive applications that work for everyone isn\'t just good practice - it\'s the right thing to do.',
                image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop',
                date: '2025-10-18T14:30:00.000Z',
                featured: false,
                tags: ['Web Development', 'Tutorial', 'JavaScript']
            },
            {
                id: '3',
                title: 'iPhone 16 Pro Review: Apple\'s Best Yet?',
                category: 'reviews',
                excerpt: 'An in-depth look at Apple\'s latest flagship smartphone and whether it lives up to the hype.',
                content: 'Apple\'s iPhone 16 Pro represents another iteration in the company\'s flagship smartphone line. After weeks of testing, here\'s our comprehensive review.\n\nThe design refinements are subtle but meaningful. The titanium frame feels premium, and the new matte finish resists fingerprints better than previous models. The display is stunning, with improved brightness that makes it easily readable even in direct sunlight.\n\nCamera improvements are where the iPhone 16 Pro really shines. The new sensor captures more detail in challenging lighting conditions, and the computational photography features produce consistently excellent results. Video recording capabilities are professional-grade.\n\nPerformance is exceptional, as expected from Apple\'s latest chip. Apps launch instantly, multitasking is seamless, and even demanding games run without a hint of lag. Battery life has also seen meaningful improvements.\n\nThe price point is high, but for users who demand the best, the iPhone 16 Pro delivers a complete package that justifies its premium positioning.',
                image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&h=400&fit=crop',
                date: '2025-10-15T09:00:00.000Z',
                featured: false,
                tags: ['Review', 'Apple', 'iPhone', 'Mobile']
            },
            {
                id: '4',
                title: '10 Productivity Tips for Remote Developers',
                category: 'tips',
                excerpt: 'Boost your productivity and maintain work-life balance while working from home with these proven strategies.',
                content: 'Remote work has become the norm for many developers. Here are ten proven tips to help you stay productive and maintain balance.\n\n1. Create a dedicated workspace. Physical separation between work and personal space helps maintain focus and boundaries.\n\n2. Establish a routine. Start and end your workday at consistent times to maintain structure.\n\n3. Take regular breaks. The Pomodoro Technique can help you stay focused while avoiding burnout.\n\n4. Communicate proactively. Over-communication is better than under-communication when working remotely.\n\n5. Use the right tools. Invest in quality equipment and software that make your work easier.\n\n6. Set clear boundaries. Let family or roommates know when you\'re working and shouldn\'t be disturbed.\n\n7. Stay connected with your team. Regular video calls help maintain relationships and collaboration.\n\n8. Exercise regularly. Physical activity improves focus and overall well-being.\n\n9. Manage distractions. Use website blockers and app limits during work hours.\n\n10. Celebrate wins. Acknowledge your accomplishments, no matter how small.',
                image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=400&fit=crop',
                date: '2025-10-12T11:00:00.000Z',
                featured: false,
                tags: ['Productivity', 'Remote Work', 'Tips']
            },
            {
                id: '5',
                title: 'Cybersecurity Trends to Watch in 2025',
                category: 'news',
                excerpt: 'Stay ahead of emerging threats and learn about the latest developments in cybersecurity.',
                content: 'The cybersecurity landscape is constantly evolving. Here are the key trends shaping the industry in 2025.\n\nZero-trust architecture is becoming the standard. Organizations are moving away from traditional perimeter-based security to models that verify every access request, regardless of source.\n\nAI-powered threats are on the rise. Cybercriminals are leveraging machine learning to create more sophisticated attacks that adapt and evolve to evade detection.\n\nCloud security remains a top priority. As more businesses migrate to cloud infrastructure, securing these environments becomes increasingly critical.\n\nQuantum computing poses both opportunities and challenges. While it promises breakthrough capabilities, it also threatens current encryption methods.\n\nThe human element continues to be the weakest link. Security awareness training and fostering a security-first culture are more important than ever.\n\nStaying informed and proactive about these trends is essential for protecting your organization\'s digital assets.',
                image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=400&fit=crop',
                date: '2025-10-10T08:00:00.000Z',
                featured: false,
                tags: ['Security', 'Cybersecurity', 'Trends']
            },
            {
                id: '6',
                title: 'Understanding Cloud Computing: A Beginner\'s Guide',
                category: 'tutorials',
                excerpt: 'Demystifying cloud computing and its benefits for businesses and developers.',
                content: 'Cloud computing has transformed how we build and deploy applications. This guide will help you understand the fundamentals.\n\nAt its core, cloud computing means using remote servers hosted on the internet to store, manage, and process data, rather than relying on local servers or personal computers.\n\nThere are three main service models: Infrastructure as a Service (IaaS), Platform as a Service (PaaS), and Software as a Service (SaaS). Each offers different levels of control and management.\n\nThe benefits are compelling: scalability, cost-effectiveness, reliability, and global accessibility. You can scale resources up or down based on demand, paying only for what you use.\n\nMajor cloud providers like AWS, Azure, and Google Cloud offer comprehensive services that handle everything from basic storage to advanced machine learning capabilities.\n\nGetting started with cloud computing doesn\'t have to be overwhelming. Most providers offer free tiers that let you experiment and learn without financial commitment.',
                image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop',
                date: '2025-10-08T15:00:00.000Z',
                featured: false,
                tags: ['Cloud Computing', 'Tutorial', 'AWS']
            }
        ];

        this.savePosts(defaultPosts);
        return defaultPosts;
    },

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },

    getReadingTime(content) {
        const wordsPerMinute = 200;
        const words = content.trim().split(/\s+/).length;
        const minutes = Math.ceil(words / wordsPerMinute);
        return `${minutes} min read`;
    },

    setupImageFallbacks(container) {
        const images = container.querySelectorAll('img[data-fallback]');
        images.forEach(img => {
            img.addEventListener('error', function() {
                this.src = this.getAttribute('data-fallback');
            });
        });
    }
};

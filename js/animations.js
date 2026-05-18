// Advanced Animations for Puciyun Website

// Parallax Effect
function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    window.addEventListener('scroll', () => {
        parallaxElements.forEach(el => {
            const speed = el.getAttribute('data-parallax');
            const yPos = window.pageYOffset * speed;
            el.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Initialize parallax on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initParallax);
} else {
    initParallax();
}

// Advanced SVG Animations
function initSVGAnimations() {
    const svgElements = document.querySelectorAll('svg');
    
    svgElements.forEach(svg => {
        const circles = svg.querySelectorAll('circle');
        const paths = svg.querySelectorAll('path');
        const rects = svg.querySelectorAll('rect');
        
        // Animate circles with stagger effect
        circles.forEach((circle, index) => {
            circle.style.animation = `pulse 2s ease-in-out ${index * 0.2}s infinite`;
        });
        
        // Animate paths
        paths.forEach((path, index) => {
            path.style.animation = `strokeAnimation 3s ease-in-out ${index * 0.3}s infinite`;
        });
    });
}

// Add animation styles for SVG
function addSVGAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0%, 100% { 
                opacity: 1;
                r: var(--original-r, 8px);
            }
            50% { 
                opacity: 0.6;
                r: calc(var(--original-r, 8px) * 1.5);
            }
        }
        
        @keyframes strokeAnimation {
            0% { 
                stroke-dashoffset: 1000;
                opacity: 0;
            }
            50% { 
                opacity: 1;
            }
            100% { 
                stroke-dashoffset: 0;
                opacity: 1;
            }
        }
        
        @keyframes gradientShift {
            0% { 
                background-position: 0% 50%;
            }
            50% { 
                background-position: 100% 50%;
            }
            100% { 
                background-position: 0% 50%;
            }
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes fadeInDown {
            from {
                opacity: 0;
                transform: translateY(-30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes scaleIn {
            from {
                opacity: 0;
                transform: scale(0.9);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
        
        @keyframes rotate {
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(360deg);
            }
        }
    `;
    document.head.appendChild(style);
}

addSVGAnimationStyles();

// Initialize SVG animations when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSVGAnimations);
} else {
    initSVGAnimations();
}

// Staggered Animation for Lists
function initStaggeredAnimation() {
    const lists = document.querySelectorAll('.service-list, .values-grid, .features-grid');
    
    lists.forEach(list => {
        const items = list.querySelectorAll('li, div[class*="card"], div[class*="item"]');
        
        items.forEach((item, index) => {
            item.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s forwards`;
            item.style.opacity = '0';
        });
    });
}

initStaggeredAnimation();

// Text Animation on Scroll
function initTextAnimations() {
    const textElements = document.querySelectorAll('h1, h2, h3, p');
    const textObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                entry.target.style.animation = 'fadeInUp 0.6s ease-out';
            }
        });
    }, { threshold: 0.1 });
    
    textElements.forEach(el => {
        textObserver.observe(el);
    });
}

initTextAnimations();

// Mouse Move Effect on Hero
function initMouseMoveEffect() {
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.addEventListener('mousemove', (e) => {
            const heroGraphics = hero.querySelector('.hero-graphics');
            if (heroGraphics) {
                const x = (e.clientX / window.innerWidth - 0.5) * 20;
                const y = (e.clientY / window.innerHeight - 0.5) * 20;
                heroGraphics.style.transform = `translate(${x}px, ${y}px)`;
            }
        });
    }
}

initMouseMoveEffect();

// Smooth Number Counter
function initCounters() {
    const counters = document.querySelectorAll('[data-target]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const speed = 100;
        
        let count = 0;
        const increment = target / speed;
        
        const updateCount = () => {
            count += increment;
            if (count < target) {
                counter.textContent = Math.floor(count);
                requestAnimationFrame(updateCount);
            } else {
                counter.textContent = target;
            }
        };
        
        // Start animation when element is in view
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCount();
                observer.unobserve(counter);
            }
        });
        
        observer.observe(counter);
    });
}

initCounters();

// Card Hover Effects
function initCardAnimations() {
    const cards = document.querySelectorAll('.feature-card, .app-card, .news-card, .value-card, .service-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 102, 204, 0.25)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

initCardAnimations();

// Typewriter Effect for Headlines
function typeWriterEffect(element, text, speed = 50) {
    let index = 0;
    element.textContent = '';
    
    const type = () => {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    };
    
    type();
}

// Apply typewriter to hero title on scroll
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        
        setTimeout(() => {
            typeWriterEffect(heroTitle, originalText, 30);
        }, 300);
    }
});

// Glitch Effect on Hover
function addGlitchEffect() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes glitch {
            0% {
                text-shadow: 3px 0 0 #0066cc, -3px 0 0 #00cc66;
            }
            20% {
                text-shadow: 3px 0 0 #00cc66, -3px 0 0 #0066cc;
            }
            40% {
                text-shadow: 3px 0 0 #ff6600, -3px 0 0 #0066cc;
            }
            60% {
                text-shadow: 3px 0 0 #0066cc, -3px 0 0 #ff6600;
            }
            80% {
                text-shadow: 3px 0 0 #00cc66, -3px 0 0 #0066cc;
            }
            100% {
                text-shadow: 3px 0 0 #0066cc, -3px 0 0 #00cc66;
            }
        }
        
        .glitch:hover {
            animation: glitch 0.3s infinite;
        }
    `;
    document.head.appendChild(style);
}

addGlitchEffect();

// Apply glitch to section titles
document.querySelectorAll('.section-title').forEach(title => {
    title.classList.add('glitch');
});

// Loading Animation
function showLoadingAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .loading {
            display: inline-block;
            width: 20px;
            height: 20px;
            border: 3px solid rgba(0, 102, 204, 0.3);
            border-top: 3px solid #0066cc;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
    `;
    document.head.appendChild(style);
}

showLoadingAnimation();

// Page Transition Animation
function initPageTransitions() {
    document.querySelectorAll('a:not([target="_blank"])').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Don't prevent default for hash links or external links
            if (href && !href.startsWith('#') && !href.startsWith('http')) {
                e.preventDefault();
                
                document.body.style.opacity = '0';
                document.body.style.transition = 'opacity 0.3s ease-out';
                
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            }
        });
    });
    
    // Fade in on page load
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.offsetHeight; // Trigger reflow
        document.body.style.opacity = '1';
    });
}

initPageTransitions();

// Scroll Reveal Animation
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.service-section, .features, .mobile-apps, .statistics, .cta-section');
    
    const revealOnScroll = () => {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight && elementBottom > 0) {
                if (!element.classList.contains('revealed')) {
                    element.classList.add('revealed');
                    element.style.animation = 'fadeInUp 0.8s ease-out';
                }
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Check on load
}

initScrollReveal();

// Intersection Observer for Lazy Loading Content
function initLazyContent() {
    const lazyElements = document.querySelectorAll('[data-lazy]');
    
    const lazyObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const content = entry.target.getAttribute('data-lazy');
                entry.target.innerHTML = content;
                lazyObserver.unobserve(entry.target);
            }
        });
    }, { rootMargin: '50px' });
    
    lazyElements.forEach(el => {
        lazyObserver.observe(el);
    });
}

initLazyContent();

// Animate on Scroll - General Purpose
function animateOnScroll() {
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const animation = entry.target.getAttribute('data-animate');
                entry.target.style.animation = animation;
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

animateOnScroll();

// Smooth scroll behavior fallback
if (!('scrollBehavior' in document.documentElement.style)) {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Console log for animation debug mode
if (window.location.search.includes('debug-animations')) {
    console.log('Animation Debug Mode Enabled');
    document.body.style.border = '2px solid red';
}

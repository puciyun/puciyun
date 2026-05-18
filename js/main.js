// Main JavaScript - Puciyun Technology Website

// DOM Elements
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const body = document.body;

// Menu Toggle Functionality
if (menuToggle) {
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target);
        const isClickInsideToggle = menuToggle.contains(event.target);
        
        if (!isClickInsideNav && !isClickInsideToggle && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
}

// Active Navigation Link
function updateActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(currentPage)) {
            link.classList.add('active');
        }
    });
}

updateActiveNav();

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            company: document.getElementById('company').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        // Validate form
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            alert('Please fill in all required fields');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('Please enter a valid email address');
            return;
        }

        // In a real application, you would send this data to a server
        console.log('Form Data:', formData);
        
        // Show success message
        alert('Thank you for your message! We will contact you soon.');
        
        // Reset form
        contactForm.reset();
    });
}

// Newsletter Form Handling
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input[type="email"]').value;
        
        if (!email) {
            alert('Please enter your email address');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        alert('Thank you for subscribing! Check your email for confirmation.');
        newsletterForm.reset();
    });
}

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe feature cards and other elements
document.querySelectorAll('.feature-card, .news-card, .value-card, .service-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
});

// Counter Animation for Statistics
function animateCounter(element, target, duration = 2000) {
    const isVisible = element.getBoundingClientRect().top < window.innerHeight;
    
    if (isVisible && !element.classList.contains('animated')) {
        element.classList.add('animated');
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }
}

// Watch for statistics section
window.addEventListener('scroll', () => {
    document.querySelectorAll('[data-target]').forEach(el => {
        const target = parseInt(el.getAttribute('data-target'));
        animateCounter(el, target);
    });
});

// Header Scroll Effect
let lastScrollTop = 0;
const header = document.querySelector('.header');

if (header) {
    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.boxShadow = '0 5px 20px rgba(0, 102, 204, 0.15)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 102, 204, 0.08)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Keyboard Accessibility
document.addEventListener('keydown', (e) => {
    // Close menu with Escape key
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});

// Tab Navigation
let tabindex = 0;
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// Service Animations
function initServiceAnimations() {
    const serviceGraphics = document.querySelectorAll('.service-graphic svg');
    serviceGraphics.forEach((svg, index) => {
        svg.style.animationDelay = (index * 0.2) + 's';
    });
}

// Initialize service animations when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initServiceAnimations);
} else {
    initServiceAnimations();
}

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation styles dynamically
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Lazy Loading for Images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Page Load Animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animate elements on page load
    document.querySelectorAll('.hero-content, .hero-graphics').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.animation = 'slideInLeft 0.8s ease-out forwards';
        if (index > 0) {
            el.style.animation = 'slideInRight 0.8s ease-out forwards';
        }
    });
});

// Detect mobile device
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Adjust animations for mobile devices
if (isMobileDevice()) {
    document.querySelectorAll('[style*="animation"]').forEach(el => {
        el.style.animationDuration = '0.6s';
    });
}

// Scroll to top functionality
const scrollTopBtn = document.createElement('button');
scrollTopBtn.id = 'scrollTopBtn';
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: linear-gradient(135deg, #0066cc, #0052a3);
    color: white;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    font-size: 20px;
    cursor: pointer;
    display: none;
    z-index: 999;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(0, 102, 204, 0.3);
`;

document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.style.display = 'flex';
        scrollTopBtn.style.justifyContent = 'center';
        scrollTopBtn.style.alignItems = 'center';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollTopBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1)';
    this.style.boxShadow = '0 6px 16px rgba(0, 102, 204, 0.4)';
});

scrollTopBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
    this.style.boxShadow = '0 4px 12px rgba(0, 102, 204, 0.3)';
});

// Console message
console.log('%cPuciyun Technology', 'font-size: 24px; font-weight: bold; color: #0066cc;');
console.log('%cEnterprise Cloud Solutions and AI Technology', 'font-size: 14px; color: #666;');
console.log('%cVisit: https://puciyun.com', 'font-size: 12px; color: #0066cc;');
console.log('%cSupport: support@puciyun.com', 'font-size: 12px; color: #0066cc;');

// SEO: Add structured data
function addStructuredData() {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Sichuan Puciyun Technology Co., Ltd",
        "url": "https://puciyun.com",
        "logo": "https://puciyun.com/images/logo.svg",
        "description": "Enterprise cloud solutions, AI technology, and software development services",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "1st Floor, No. 10 Cuihu East Road, Tianpeng Street",
            "addressLocality": "Pengzhou",
            "postalCode": "611930",
            "addressRegion": "Sichuan",
            "addressCountry": "CN"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+86-XXXXXXXXXX",
            "contactType": "Customer Service",
            "email": "support@puciyun.com"
        },
        "sameAs": [
            "https://www.google.com/business",
            "https://puciyun.com"
        ]
    });
    document.head.appendChild(script);
}

addStructuredData();

// Console logging for debugging (remove in production)
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('Development mode');
}

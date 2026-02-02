// Sneh Lata Construction - JavaScript
// This file contains any interactive functionality

// Dark mode toggle functionality (if needed in the future)
function toggleDarkMode() {
    const html = document.documentElement;
    html.classList.toggle('dark');
    
    // Save preference to localStorage
    const isDark = html.classList.contains('dark');
    localStorage.setItem('darkMode', isDark);
}

// Initialize dark mode from localStorage on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
        document.documentElement.classList.add('dark');
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile Menu Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.querySelector('.menu-button');
    const closeMenuButton = document.querySelector('.close-menu-button');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuButton && mainNav) {
        menuButton.addEventListener('click', function() {
            mainNav.classList.add('active');
        });
    }
    
    if (closeMenuButton && mainNav) {
        closeMenuButton.addEventListener('click', function() {
            mainNav.classList.remove('active');
        });
    }
});

// Form submission handler (if needed)
const contactForm = document.querySelector('form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Add your form submission logic here
        console.log('Form submitted');
        // You can add AJAX call or form processing here
    });
}

// Project Filter Functionality
function initProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-button');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length > 0 && projectCards.length > 0) {
        // Remove existing event listeners by cloning buttons
        filterButtons.forEach(button => {
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);
        });
        
        // Get fresh references after cloning
        const freshFilterButtons = document.querySelectorAll('.filter-button');
        const freshProjectCards = document.querySelectorAll('.project-card');
        
        // Initialize project cards - ensure they're visible and set transitions
        freshProjectCards.forEach(card => {
            card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
        });
        
        freshFilterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                freshFilterButtons.forEach(btn => btn.classList.remove('filter-button-active'));
                
                // Add active class to clicked button
                this.classList.add('filter-button-active');
                
                // Get the filter value
                const filterValue = this.getAttribute('data-filter');
                
                // Filter projects with smooth animation
                freshProjectCards.forEach((card, index) => {
                    const cardCategory = card.getAttribute('data-category');
                    const shouldShow = filterValue === 'all' || cardCategory === filterValue;
                    
                    if (shouldShow) {
                        // Show the card
                        card.style.display = '';
                        // Fade in with slight delay for staggered effect
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, index * 50);
                    } else {
                        // Hide the card
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.95)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
}

// Initialize filter on page load
document.addEventListener('DOMContentLoaded', function() {
    initProjectFilter();
});

// Testimonials Swiper Initialization
document.addEventListener('DOMContentLoaded', function() {
    const testimonialsSwiper = document.querySelector('.testimonials-swiper');
    if (testimonialsSwiper) {
        new Swiper('.testimonials-swiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.testimonials-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.testimonials-next',
                prevEl: '.testimonials-prev',
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
            },
        });
    }
});

/* ============================================
   BARBA.JS PAGE TRANSITIONS
   Box/Grid Overlay Transition System
   ============================================ */

// Configuration - Easy to customize
const TRANSITION_CONFIG = {
    boxCount: 8,              // Number of vertical boxes
    duration: 600,            // Animation duration in milliseconds
    easing: 'cubic-bezier(0.77, 0, 0.175, 1)', // CSS easing function
    staggerDelay: 50,         // Delay between each box animation (ms)
    boxColor: '#414141'       // Color of transition boxes (industrial-gray)
};

// Create transition overlay HTML structure
function createTransitionOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'barba-transition-overlay';
    
    // Create boxes based on configuration
    for (let i = 0; i < TRANSITION_CONFIG.boxCount; i++) {
        const box = document.createElement('div');
        box.className = 'barba-transition-box';
        box.style.backgroundColor = TRANSITION_CONFIG.boxColor;
        overlay.appendChild(box);
    }
    
    document.body.appendChild(overlay);
    return overlay;
}

// Initialize transition overlay (created once)
let transitionOverlay = null;

// Create overlay on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        transitionOverlay = createTransitionOverlay();
    });
} else {
    transitionOverlay = createTransitionOverlay();
}

// Barba.js Transition Class
class BoxTransition {
    // Page leave transition (boxes slide up from bottom)
    async leave(data) {
        return new Promise((resolve) => {
            if (!transitionOverlay) {
                transitionOverlay = createTransitionOverlay();
            }
            
            // Add leaving class to trigger animation
            transitionOverlay.classList.add('is-leaving');
            
            // Prevent body scroll during transition
            document.body.classList.add('barba-transitioning');
            
            // Wait for animation to complete
            setTimeout(() => {
                resolve();
            }, TRANSITION_CONFIG.duration);
        });
    }

    // Page enter transition (boxes slide up and exit)
    async enter(data) {
        return new Promise((resolve) => {
            if (!transitionOverlay) {
                transitionOverlay = createTransitionOverlay();
            }
            
            // Remove leaving class and add entering class
            transitionOverlay.classList.remove('is-leaving');
            transitionOverlay.classList.add('is-entering');
            
            // Wait for animation to complete
            setTimeout(() => {
                // Clean up classes
                transitionOverlay.classList.remove('is-entering');
                document.body.classList.remove('barba-transitioning');
                
                // Reset boxes to initial state
                const boxes = transitionOverlay.querySelectorAll('.barba-transition-box');
                boxes.forEach(box => {
                    box.style.transform = 'translateY(100%)';
                });
                
                resolve();
            }, TRANSITION_CONFIG.duration);
        });
    }
}

// Initialize Barba.js when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Check if Barba is loaded
    if (typeof barba !== 'undefined') {
        // Initialize Barba with transition
        barba.init({
            transitions: [{
                name: 'box-transition',
                leave(data) {
                    const transition = new BoxTransition();
                    return transition.leave(data);
                },
                enter(data) {
                    const transition = new BoxTransition();
                    return transition.enter(data);
                },
                // Prevent flicker by hiding content during transition
                once(data) {
                    // Handle initial page load
                },
                // Reinitialize scripts after page transition
                afterEnter(data) {
                    // Reinitialize Swiper if needed
                    const testimonialsSwiper = data.next.container.querySelector('.testimonials-swiper');
                    if (testimonialsSwiper && typeof Swiper !== 'undefined') {
                        new Swiper('.testimonials-swiper', {
                            slidesPerView: 1,
                            spaceBetween: 30,
                            loop: true,
                            autoplay: {
                                delay: 5000,
                                disableOnInteraction: false,
                            },
                            pagination: {
                                el: '.testimonials-pagination',
                                clickable: true,
                            },
                            navigation: {
                                nextEl: '.testimonials-next',
                                prevEl: '.testimonials-prev',
                            },
                            breakpoints: {
                                768: {
                                    slidesPerView: 2,
                                    spaceBetween: 30,
                                },
                                1024: {
                                    slidesPerView: 3,
                                    spaceBetween: 30,
                                },
                            },
                        });
                    }
                    
                    // Reinitialize mobile menu
                    const menuButton = data.next.container.querySelector('.menu-button');
                    const closeMenuButton = data.next.container.querySelector('.close-menu-button');
                    const mainNav = data.next.container.querySelector('.main-nav');
                    
                    if (menuButton && mainNav) {
                        menuButton.addEventListener('click', function() {
                            mainNav.classList.add('active');
                        });
                    }
                    
                    if (closeMenuButton && mainNav) {
                        closeMenuButton.addEventListener('click', function() {
                            mainNav.classList.remove('active');
                        });
                    }
                    
                    // Reinitialize project filter
                    initProjectFilter();
                    
                    // Scroll to top on page change
                    window.scrollTo(0, 0);
                }
            }]
        });
    } else {
        console.warn('Barba.js is not loaded. Page transitions will not work.');
    }
});

/* ============================================
   CUSTOM CURSOR WITH GSAP
   ============================================ */

// Initialize custom cursor
function initCustomCursor() {
    // Check if GSAP is loaded
    if (typeof gsap === 'undefined') {
        console.warn('GSAP is not loaded. Custom cursor will not work.');
        document.body.style.cursor = 'auto';
        return;
    }
    
    // Check if device is mobile/tablet
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) {
        document.body.style.cursor = 'auto';
        return;
    }
    
    // Create cursor elements
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    const cursorDot = document.createElement('div');
    cursorDot.className = 'custom-cursor-dot';
    document.body.appendChild(cursorDot);
    
    // Initial mouse position (center of screen)
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;
    let dotX = mouseX;
    let dotY = mouseY;
    
    // Set initial positions
    gsap.set(cursor, {
        x: cursorX,
        y: cursorY,
        opacity: 1
    });
    
    gsap.set(cursorDot, {
        x: dotX,
        y: dotY,
        opacity: 1
    });
    
    // Update mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // GSAP animation loop for smooth cursor movement
    gsap.ticker.add(() => {
        // Smooth follow for main cursor (with lag for trailing effect)
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        
        // Immediate follow for dot (no lag)
        dotX = mouseX;
        dotY = mouseY;
        
        // Update positions
        gsap.set(cursor, {
            x: cursorX,
            y: cursorY
        });
        
        gsap.set(cursorDot, {
            x: dotX,
            y: dotY
        });
    });
    
    // Hover effects on interactive elements
    const hoverElements = document.querySelectorAll('a, button, .nav-link, .service-card, .portfolio-item, .testimonial-card, .btn-primary, .btn-secondary, .form-submit, .cta-button, .menu-button, .close-menu-button');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            gsap.to(cursor, {
                scale: 1.5,
                duration: 0.3,
                mixBlendMode: 'normal',
                ease: 'power2.out'
            });
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            gsap.to(cursor, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
    
    // Click animation
    document.addEventListener('mousedown', () => {
        cursor.classList.add('click');
        gsap.to(cursor, {
            scale: 0.8,
            duration: 0.1,
            ease: 'power2.out'
        });
    });
    
    document.addEventListener('mouseup', () => {
        cursor.classList.remove('click');
        gsap.to(cursor, {
            scale: cursor.classList.contains('hover') ? 1.5 : 1,
            duration: 0.1,
            ease: 'power2.out'
        });
    });
    
    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        gsap.to([cursor, cursorDot], {
            opacity: 0,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    document.addEventListener('mouseenter', () => {
        gsap.to([cursor, cursorDot], {
            opacity: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    // Reinitialize cursor after Barba page transitions
    if (typeof barba !== 'undefined') {
        barba.hooks.afterEnter(() => {
            // Re-attach hover effects to new page elements
            const newHoverElements = document.querySelectorAll('a, button, .nav-link, .service-card, .portfolio-item, .testimonial-card, .btn-primary, .btn-secondary, .form-submit, .cta-button, .menu-button, .close-menu-button');
            
            newHoverElements.forEach(element => {
                element.addEventListener('mouseenter', () => {
                    cursor.classList.add('hover');
                    gsap.to(cursor, {
                        scale: 1.5,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                });
                
                element.addEventListener('mouseleave', () => {
                    cursor.classList.remove('hover');
                    gsap.to(cursor, {
                        scale: 1,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                });
            });
        });
    }
}

// Initialize cursor when DOM and GSAP are ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        // Wait a bit for GSAP to load if it's in head
        setTimeout(initCustomCursor, 100);
    });
} else {
    // DOM already loaded, wait for GSAP
    setTimeout(initCustomCursor, 100);
}
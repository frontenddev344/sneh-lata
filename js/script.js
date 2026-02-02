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
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-button');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length > 0 && projectCards.length > 0) {
        // Initialize project cards - ensure they're visible and set transitions
        projectCards.forEach(card => {
            card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
        });
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('filter-button-active'));
                
                // Add active class to clicked button
                this.classList.add('filter-button-active');
                
                // Get the filter value
                const filterValue = this.getAttribute('data-filter');
                
                // Filter projects with smooth animation
                projectCards.forEach((card, index) => {
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
});
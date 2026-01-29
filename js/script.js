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

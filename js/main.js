/**
 * ADIT Joint - Main JavaScript
 * Author: ADIT Joint
 * Version: 1.0
 */

// Execute when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the mobile menu functionality
    initMobileMenu();
    
    // Initialize tab switching functionality
    initTabs();
    
    // Initialize scroll animation
    initScrollAnimation();
    
    // Initialize service card hover effects
    initServiceCardEffects();
});

/**
 * Initialize the mobile menu
 */
function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    if (mobileMenuToggle && mainNav) {
        // Toggle the menu when the hamburger icon is clicked
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            
            // Change the icon based on the menu state
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close the menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mainNav.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
                mainNav.classList.remove('active');
                
                const icon = mobileMenuToggle.querySelector('i');
                if (icon.classList.contains('fa-times')) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }
    
    // Handle dropdown toggles in mobile view
    if (dropdownToggles.length > 0) {
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', function(e) {
                if (window.innerWidth < 992) {
                    e.preventDefault();
                    const parent = this.parentElement;
                    parent.classList.toggle('active');
                    
                    // Rotate the dropdown icon
                    const icon = this.querySelector('i');
                    if (parent.classList.contains('active')) {
                        icon.style.transform = 'rotate(180deg)';
                    } else {
                        icon.style.transform = 'rotate(0)';
                    }
                }
            });
        });
    }
}

/**
 * Initialize the tab switching functionality
 */
function initTabs() {
    // Service tabs on the home page
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    if (tabBtns.length > 0 && tabPanes.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabId = btn.dataset.tab;
                
                // Remove active class from all buttons and panes
                tabBtns.forEach(b => b.classList.remove('active'));
                tabPanes.forEach(p => p.classList.remove('active'));
                
                // Add active class to current button and corresponding pane
                btn.classList.add('active');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }
}

/**
 * Initialize scroll animation effects
 */
function initScrollAnimation() {
    // Get all elements that should be animated on scroll
    const elements = document.querySelectorAll('.expertise-card, .service-card, .about-image, .value-box');
    
    // Function to check if an element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
        );
    }
    
    // Function to handle scroll animation
    function handleScrollAnimation() {
        elements.forEach(element => {
            if (isInViewport(element)) {
                element.classList.add('animated');
            }
        });
    }
    
    // Add animated class to elements initially in viewport
    handleScrollAnimation();
    
    // Listen for scroll events
    window.addEventListener('scroll', handleScrollAnimation);
}

/**
 * Initialize service card hover effects
 */
function initServiceCardEffects() {
    const serviceCards = document.querySelectorAll('.hero-services .service-card, .expertise-card');
    
    if (serviceCards.length > 0) {
        serviceCards.forEach(card => {
            // Add subtle movement on hover
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        });
    }
}

/**
 * Smooth scroll to anchor links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        // Skip dropdown toggles
        if (this.classList.contains('dropdown-toggle')) return;
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return; // Skip empty anchors
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for header height
                behavior: 'smooth'
            });
        }
    });
});

/**
 * Add active class to navigation links based on current page
 */
(function highlightCurrentPage() {
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        
        // Skip dropdown toggles
        if (link.classList.contains('dropdown-toggle')) return;
        
        // Check if the link href matches the current page
        if (currentPage.endsWith(linkPath) || 
            (currentPage.includes(linkPath) && linkPath !== 'index.html' && linkPath !== '/')) {
            link.classList.add('active');
            
            // If this is a dropdown item, also highlight the parent
            const parentDropdown = link.closest('.dropdown');
            if (parentDropdown) {
                const dropdownToggle = parentDropdown.querySelector('.dropdown-toggle');
                if (dropdownToggle) {
                    dropdownToggle.classList.add('active');
                }
            }
        }
    });
})();

/**
 * Add subtle parallax effect to hero section
 */
if (document.querySelector('.hero')) {
    window.addEventListener('scroll', function() {
        const scroll = window.pageYOffset;
        const heroSection = document.querySelector('.hero');
        
        // Adjust the background position based on scroll
        heroSection.style.backgroundPosition = `center ${scroll * 0.3}px`;
    });
}

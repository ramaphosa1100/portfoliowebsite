// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const hamburger = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu function
    function toggleMobileMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open (mobile only)
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    // Add click event to hamburger button (only works on mobile)
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }

    // Close mobile menu when a nav link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === "#" || targetId === "") return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Update URL without jumping
                history.pushState(null, null, targetId);
            }
        });
    });

    // Handle window resize - if resizing to desktop while menu is open, reset
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Active link highlighting on scroll
    const sections = document.querySelectorAll('section[id]');
    
    function highlightActiveLink() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightActiveLink);
    highlightActiveLink();
});
// Initialize AOS (Animate on Scroll)
AOS.init({
    duration: 800,           // Animation duration in ms
    offset: 100,            // Offset (in px) from the original trigger point
    delay: 0,               // Default delay
    once: true,             // Whether animation should happen only once
    mirror: false,          // Whether elements should animate out while scrolling past them
    easing: 'ease-in-out',  // Easing function
    disable: false,         // Disable on mobile? false = enabled on all devices
});

// Hamburger Menu Toggle
const hamburgerBtn = document.getElementById('hamburgerBtn');
const navMenu = document.getElementById('navMenu');

if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
        hamburgerBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburgerBtn.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        
        // Skip if it's just "#" or empty
        if (targetId === '#' || targetId === '') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Optional: Add scroll spy to highlight active nav link
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');

function updateActiveNavOnScroll() {
    let current = '';
    const scrollPosition = window.scrollY + 100; // Offset for navbar

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href').substring(1);
        if (href === current) {
            link.classList.add('active');
        }
    });
}

// Add scroll event listener if you want active nav highlighting
// window.addEventListener('scroll', updateActiveNavOnScroll);
// updateActiveNavOnScroll(); // Call initially

// Optional: Add a "scroll to top" button functionality (if you add one)
// You can uncomment this if you add a scroll-to-top button in your HTML
/*
const scrollToTopBtn = document.getElementById('scrollToTop');
if (scrollToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
*/

// Log initialization (optional)
console.log('Portfolio website loaded with scroll animations!');

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
    
    // Initialize Typing Animations
    initTypingAnimations();
});

// Initialize AOS (Animate on Scroll)
AOS.init({
    duration: 800,
    offset: 100,
    delay: 0,
    once: true,
    mirror: false,
    easing: 'ease-in-out',
});

// ============ TYPING ANIMATION SYSTEM - FAST ============
function initTypingAnimations() {
    // Typing speed configuration - FAST
    const TYPING_SPEED = 5; // milliseconds per character (very fast)
    
    // Function to type text into an element
    async function typeText(element, text, speed = TYPING_SPEED) {
        if (!element) return;
        
        // Clear the element
        element.textContent = '';
        
        // Add cursor animation
        element.classList.add('typing-cursor');
        
        // Type each character
        for (let i = 0; i <= text.length; i++) {
            element.textContent = text.substring(0, i);
            await new Promise(resolve => setTimeout(resolve, speed));
        }
        
        // Remove cursor when done
        element.classList.remove('typing-cursor');
    }
    
    // Define all text content for typing animation
    const typingContent = {
        // Hero section
        '.typing-title': 'Cybersecurity | Web Dev | Networking',
        '.typing-desc': 'Systems thinker securing high-reliability infrastructures. Passionate about FinTech, critical infrastructure, and emerging tech.',
        '.typing-paragraph': "I'm a systems thinker focused on securing complex, high-reliability infrastructures through cybersecurity. My core expertise spans cybersecurity, web development, and networking, while I actively work to expand my domain into software engineering. I'm developing hands-on experience across the cybersecurity spectrum—penetration testing, web/API security, and cloud architecture security—with an emphasis on adapting security frameworks to high-stakes environments. A past project designing an automated trading system gave me practical insight into real-time data integrity, automation, and operational risk—principles that translate directly to securing FinTech, industrial systems, and critical infrastructure. My approach is straightforward: to secure a system, you must understand how it's built, how it fails, and how it's attacked. I validate concepts through applied projects—cloud security configurations, controlled penetration tests—always identifying transferable architectural and security patterns across domains. Beyond my technical work, I maintain strong interests in financial markets (forex), real estate, AI/ML, and emerging technologies. These domains inform my broader perspective while I continue deepening my core expertise in cybersecurity, networking, web development, and software. I'm building a robust technical foundation, continuously expanded through hands-on experimentation and cross-domain curiosity, preparing for advanced work in protecting the systems that underpin modern industry and society.",
        
        // Philosophy section
        '.typing-philosophy-quote': 'To secure a system, you must understand how it\'s built, how it fails, and how it\'s attacked.',
        '.typing-philosophy-desc': 'I validate concepts through applied projects — cloud security configurations, controlled penetration tests — always identifying transferable architectural and security patterns across domains.',
        
        // Experience descriptions
        '.typing-exp1-desc': 'Leading initiatives in tech excellence, cybersecurity awareness, and hands-on projects bridging development and security.',
        '.typing-exp2-desc': 'Gained exposure to NOC operations, assisted with Google Earth coordinate requests, and focused on self-directed learning to improve networking knowledge.',
        
        // Project descriptions
        '.typing-project1-desc': 'Designed a real-time automated trading system with focus on data integrity, automation, and operational risk management.',
        '.typing-project2-desc': 'A tool to monitor and record fuel purchases, consumption, and costs over time.',
        '.typing-project3-desc': 'Developed a responsive company website for The Lord Publication, focusing on content organization, user-friendly navigation, and brand presentation.',
        
        // Education description
        '.typing-edu1-desc': 'Networking, Security, Web Development & Systems Design.',
        
        // Certifications
        '.typing-cert1': '🔹 Mastercard - Cybersecurity Job Simulation',
        '.typing-cert2': '🔹 Deloitte Australia - Cyber Job Simulation',
        '.typing-cert3': '🔹 Cisco - Networking Basics',
        '.typing-cert4': '🔹 Introduction to Network Routing',
        '.typing-cert5': '🔹 Networking Foundations: Networking basics'
    };
    
    // Titles with even faster speed
    const titleContent = {
        '.typing-exp1-title': 'Founder',
        '.typing-exp2-title': 'Intern',
        '.typing-project1-title': 'Automated Trading System',
        '.typing-project2-title': 'Fuel expense tracker',
        '.typing-project3-title': 'The Lord Publication (Company Website)',
        '.typing-edu1-title': 'University of Cape Coast',
        '.typing-edu2-title': 'Keta Senior High Technical School',
        '.typing-edu3-title': 'Cisco Networking Academy'
    };
    
    // Intersection Observer for typing animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.hasAttribute('data-typed')) {
                entry.target.setAttribute('data-typed', 'true');
                const text = entry.target.getAttribute('data-text');
                if (text) {
                    typeText(entry.target, text);
                }
            }
        });
    }, { threshold: 0.2, rootMargin: '0px 0px -30px 0px' });
    
    // Setup main content typing
    Object.keys(typingContent).forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            element.setAttribute('data-text', typingContent[selector]);
            element.textContent = '';
            observer.observe(element);
        });
    });
    
    // Setup title typing (even faster - speed 3)
    async function typeTitleFast(element, text) {
        if (!element) return;
        element.textContent = '';
        element.classList.add('typing-cursor');
        for (let i = 0; i <= text.length; i++) {
            element.textContent = text.substring(0, i);
            await new Promise(resolve => setTimeout(resolve, 3)); // Super fast for titles
        }
        element.classList.remove('typing-cursor');
    }
    
    const titleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.hasAttribute('data-typed')) {
                entry.target.setAttribute('data-typed', 'true');
                const text = entry.target.getAttribute('data-text');
                if (text) {
                    typeTitleFast(entry.target, text);
                }
            }
        });
    }, { threshold: 0.2 });
    
    Object.keys(titleContent).forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            element.setAttribute('data-text', titleContent[selector]);
            element.textContent = '';
            titleObserver.observe(element);
        });
    });
    
    // Handle skills and languages fade-in
    const skillsContainer = document.querySelector('.typing-skills');
    const languagesContainer = document.querySelector('.typing-languages');
    
    if (skillsContainer) {
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.hasAttribute('data-visible')) {
                    entry.target.setAttribute('data-visible', 'true');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.2 });
        
        fadeObserver.observe(skillsContainer);
        skillsContainer.style.opacity = '0';
        skillsContainer.style.transform = 'translateY(20px)';
        skillsContainer.style.transition = 'all 0.5s ease';
    }
    
    if (languagesContainer) {
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.hasAttribute('data-visible')) {
                    entry.target.setAttribute('data-visible', 'true');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.2 });
        
        fadeObserver.observe(languagesContainer);
        languagesContainer.style.opacity = '0';
        languagesContainer.style.transform = 'translateY(20px)';
        languagesContainer.style.transition = 'all 0.5s ease';
    }
    
    console.log('Typing animations initialized (fast mode)');
}

// Log initialization
console.log('Portfolio website loaded with scroll animations and fast typing!');

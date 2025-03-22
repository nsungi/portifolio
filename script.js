// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Back to Top button functionality
    const backToTopButton = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });
    
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Project filters functionality (for projects.html)
    const projectFilters = document.querySelectorAll('.btn-filter');
    const projectItems = document.querySelectorAll('.project-item');
    
    if (projectFilters.length > 0) {
        projectFilters.forEach(filter => {
            filter.addEventListener('click', function() {
                // Remove active class from all filters
                projectFilters.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked filter
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                projectItems.forEach(item => {
                    if (filterValue === 'all' || item.classList.contains(filterValue)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // Stats counter animation
    const statsSection = document.querySelector('.stats-section');
    const statNumbers = document.querySelectorAll('.stat-number');

    if (statsSection && statNumbers.length > 0) {
        const animateStats = () => {
            statNumbers.forEach(stat => {
                const targetValue = parseInt(stat.getAttribute('data-count'));
                let currentValue = 0;
                const increment = Math.ceil(targetValue / 20); // Adjust speed here
                const timer = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= targetValue) {
                        clearInterval(timer);
                        stat.textContent = targetValue;
                    } else {
                        stat.textContent = currentValue;
                    }
                }, 100);
            });
        };

        if ('IntersectionObserver' in window) {
            const observeStats = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateStats();
                        observeStats.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });

            observeStats.observe(statsSection);
        } else {
            // Fallback for browsers that don't support IntersectionObserver
            animateStats();
        }
    }
    
    // Dark mode toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
    
        if (document.body.classList.contains('dark-theme')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });

    // Contact form handling for production
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    // Client-side validation before the form submits to FormSubmit
    contactForm.addEventListener('submit', function(e) {
        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Validation check
        let isValid = true;
        let errorMessage = '';
        
        // Check required fields
        if (!name || !email || !subject || !message) {
            isValid = false;
            errorMessage = 'Please fill in all fields.';
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (isValid && !emailRegex.test(email)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address.';
        }
        
        // If validation fails, prevent submission and show error
        if (!isValid) {
            e.preventDefault();
            formStatus.innerHTML = `<div class="alert alert-danger">${errorMessage}</div>`;
            
            // Hide the error message after 5 seconds
            setTimeout(() => {
                formStatus.innerHTML = '';
            }, 5000);
        } else {
            // Show sending message (will be briefly visible before the form submits)
            formStatus.innerHTML = '<div class="alert alert-info">Sending message...</div>';
        }
    });
}

    // Add animation to skill bars
    const skillBars = document.querySelectorAll('.skill-progress');
    
    if (skillBars.length > 0) {
        const animateSkills = () => {
            skillBars.forEach(bar => {
                const targetWidth = bar.style.width;
                bar.style.width = '0';
                
                setTimeout(() => {
                    bar.style.width = targetWidth;
                }, 100);
            });
        };
        
        // Run animation when the skills section is in view
        const skillsSection = document.querySelector('.skills-section');
        
        if (skillsSection) {
            const observeSkills = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateSkills();
                        observeSkills.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });
            
            observeSkills.observe(skillsSection);
        } else {
            // If not using IntersectionObserver, animate after page load
            animateSkills();
        }
    }
    
    // Experience timeline animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    if (timelineItems.length > 0) {
        const animateTimeline = () => {
            timelineItems.forEach((item, index) => {
                item.style.opacity = '0';
                item.style.transform = item.classList.contains('left') ? 'translateX(-50px)' : 'translateX(50px)';
                
                setTimeout(() => {
                    item.style.transition = 'all 0.5s ease-in-out';
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0)';
                }, 200 * index);
            });
        };
        
        // Run animation when the experience section is in view
        const experienceSection = document.querySelector('.experience-section');
        
        if (experienceSection) {
            const observeExperience = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateTimeline();
                        observeExperience.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });
            
            observeExperience.observe(experienceSection);
        } else {
            // If not using IntersectionObserver, animate after page load
            animateTimeline();
        }
    }
});
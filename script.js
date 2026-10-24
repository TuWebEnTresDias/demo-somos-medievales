/* ============================================
   SOMOS MEDIEVALES - Landing Page Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    // === Header Scroll Effect ===
    const header = document.getElementById('header');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // === Mobile Menu Toggle ===
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('nav');
    const navLinks = nav.querySelectorAll('.header__nav-link');

    hamburger.addEventListener('click', function() {
        nav.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !nav.contains(e.target)) {
            nav.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    // === Smooth Scroll for Anchor Links ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // === Scroll Animations with Intersection Observer ===
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: unobserve after animation
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));

    // === Contact Form to WhatsApp ===
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const event = document.getElementById('event').value;
            const message = document.getElementById('message').value.trim();
            
            // Build WhatsApp message
            let whatsappMessage = `Hola Somos Medievales! 👋\n\n`;
            whatsappMessage += `Soy *${name}*\n`;
            whatsappMessage += `Mi WhatsApp: ${phone}\n`;
            
            if (event) {
                whatsappMessage += `\nMe interesa el evento: *${event}*\n`;
            }
            
            if (message) {
                whatsappMessage += `\nMensaje: ${message}\n`;
            }
            
            whatsappMessage += `\n📱 Espero su respuesta!`;
            
            // Encode message for WhatsApp URL
            const encodedMessage = encodeURIComponent(whatsappMessage);
            
            // WhatsApp URL with pre-filled message
            const whatsappUrl = `https://wa.me/5491133909869?text=${encodedMessage}`;
            
            // Open WhatsApp
            window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
            
            // Reset form
            contactForm.reset();
        });
    }

    // === Parallax Effect for Hero ===
    const heroBg = document.querySelector('.hero__bg-img');
    
    if (heroBg) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            heroBg.style.transform = `translateY(${rate}px) scale(1.1)`;
        });
    }

    // === Add Staggered Animation Delays ===
    const addStaggeredDelays = (selector) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el, index) => {
            el.style.transitionDelay = `${index * 0.1}s`;
        });
    };

    addStaggeredDelays('.differentials .differential');
    addStaggeredDelays('.experience__item');
    addStaggeredDelays('.testimonials .testimonial');
    addStaggeredDelays('.team-member');
    addStaggeredDelays('.press__item');

    // === Active Navigation Link on Scroll ===
    const sections = document.querySelectorAll('section[id]');
    
    const highlightNav = () => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelectorAll('.header__nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', highlightNav);

    // === WhatsApp Float Button Animation ===
    const whatsappFloat = document.querySelector('.whatsapp-float');
    
    if (whatsappFloat) {
        // Show button after 2 seconds
        whatsappFloat.style.opacity = '0';
        whatsappFloat.style.transform = 'scale(0.5)';
        
        setTimeout(() => {
            whatsappFloat.style.transition = 'all 0.5s ease';
            whatsappFloat.style.opacity = '1';
            whatsappFloat.style.transform = 'scale(1)';
        }, 2000);
    }

    // === Gallery Image Lazy Loading Enhancement ===
    const galleryItems = document.querySelectorAll('.gallery__item img');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.style.opacity = '1';
                    img.style.transform = 'scale(1)';
                    imageObserver.unobserve(img);
                }
            });
        }, { threshold: 0.1 });

        galleryItems.forEach(img => {
            img.style.opacity = '0';
            img.style.transform = 'scale(1.1)';
            img.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            imageObserver.observe(img);
        });
    }

    // === Event Cards Hover Effects ===
    const eventCards = document.querySelectorAll('.event-card');
    
    eventCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.event-card__image img').style.transform = 'scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.event-card__image img').style.transform = 'scale(1)';
        });
    });

    // === Counter Animation for Rating Score ===
    const animateCounter = (element, target) => {
        let current = 0;
        const increment = target / 50;
        const duration = 2000;
        const stepTime = duration / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = current.toFixed(1);
        }, stepTime);
    };

    const ratingScore = document.querySelector('.testimonials__score');
    if (ratingScore) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target, 5.0);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counterObserver.observe(ratingScore);
    }

    // === Cursor Glow Effect on Hero (Desktop Only) ===
    if (window.innerWidth > 768) {
        const hero = document.querySelector('.hero');
        
        if (hero) {
            const glow = document.createElement('div');
            glow.style.cssText = `
                position: absolute;
                width: 300px;
                height: 300px;
                border-radius: 50%;
                background: radial-gradient(circle, rgba(201, 154, 62, 0.15) 0%, transparent 70%);
                pointer-events: none;
                transform: translate(-50%, -50%);
                z-index: 1;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            hero.appendChild(glow);
            
            hero.addEventListener('mousemove', (e) => {
                const rect = hero.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                glow.style.left = `${x}px`;
                glow.style.top = `${y}px`;
                glow.style.opacity = '1';
            });
            
            hero.addEventListener('mouseleave', () => {
                glow.style.opacity = '0';
            });
        }
    }

    // === Print Console Message ===
    console.log('%c⚔️ SOMOS MEDIEVALES ⚔️', 'color: #C99A3E; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 4px #000;');
    console.log('%cUniverse of Medieval Fairs in Buenos Aires', 'color: #B8B0A4; font-size: 14px;');
});
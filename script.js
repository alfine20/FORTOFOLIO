document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id]');
    const contactForm = document.getElementById('contactForm');
    const navbar = document.querySelector('.navbar');
    const heroElements = document.querySelectorAll('.hero-content > *, .hero-image');

    function initScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        document.querySelectorAll('.timeline-item, .edu-card, .skill-category, .project-card, .contact-item, .contact-form').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    function initSmoothScroll() {
        const allLinks = [...navLinks, ...document.querySelectorAll('.sidebar-links a')];
        allLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const target = document.querySelector(targetId);
                if (target) {
                    const offset = navbar.offsetHeight;
                    window.scrollTo({
                        top: target.offsetTop - offset,
                        behavior: 'smooth'
                    });
                }
                if (typeof closeSidebar === 'function') closeSidebar();
            });
        });
    }

    function initScrollSpy() {
        const sidebarLinks = document.querySelectorAll('.sidebar-links a');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                    });
                    sidebarLinks.forEach(link => {
                        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                    });
                }
            });
        }, { rootMargin: '-70px 0px -60% 0px' });

        sections.forEach(section => observer.observe(section));
    }

    function initNavbarScroll() {
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.scrollY;
            if (currentScroll > 100) {
                navbar.style.background = 'rgba(2, 6, 22, 0.95)';
                navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
            } else {
                navbar.style.background = 'rgba(2, 6, 22, 0.9)';
                navbar.style.boxShadow = 'none';
            }
            lastScroll = currentScroll;
        });
    }

    function initHeroAnimation() {
        heroElements.forEach((el, i) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = `opacity 0.8s ease ${i * 0.1}s, transform 0.8s ease ${i * 0.1}s`;
            requestAnimationFrame(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            });
        });
    }

    function initContactForm() {
        if (!contactForm) return;

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;

            btn.textContent = 'Mengirim...';
            btn.disabled = true;

            await new Promise(resolve => setTimeout(resolve, 1500));

            btn.textContent = 'Terkirim! ✓';
            btn.style.background = 'var(--success)';

            setTimeout(() => {
                btn.textContent = originalText;
                btn.disabled = false;
                btn.style.background = '';
                contactForm.reset();
            }, 2000);
        });
    }

    function initParallax() {
        const profileRing = document.querySelector('.profile-ring');
        const floatingCards = document.querySelectorAll('.float-card');

        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            if (profileRing && scrolled < window.innerHeight) {
                profileRing.style.transform = `scale(${1 + scrolled * 0.0002})`;
            }
        });

        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;

            floatingCards.forEach((card, i) => {
                const factor = (i + 1) * 0.5;
                card.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
            });
        });
    }

    function initProjectCards() {
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px)';
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });
    }

    function initTypewriter() {
        const element = document.querySelector('.greeting .nama');
        if (!element) return;

        const text = element.textContent;
        element.textContent = '';
        element.style.borderRight = '2px solid var(--accent)';

        let i = 0;
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, 80);
            } else {
                element.style.borderRight = 'none';
            }
        }
        setTimeout(type, 500);
    }

    function initSidebar() {
        const hamburger = document.querySelector('.hamburger');
        const sidebar = document.querySelector('.sidebar');
        const overlay = document.querySelector('.sidebar-overlay');
        const closeBtn = document.querySelector('.sidebar-close');

        function openSidebar() {
            hamburger.classList.add('active');
            sidebar.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        window.closeSidebar = function() {
            hamburger.classList.remove('active');
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }

        hamburger.addEventListener('click', openSidebar);
        closeBtn.addEventListener('click', closeSidebar);
        overlay.addEventListener('click', closeSidebar);
    }

    initSmoothScroll();
    initScrollSpy();
    initNavbarScroll();
    initHeroAnimation();
    initContactForm();
    initParallax();
    initProjectCards();
    initTypewriter();
    initScrollAnimations();
    initSidebar();
});

document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
});
/**
 * APMR Properties | Main JavaScript Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    // =========================================================================
    // 1. Mobile Menu Toggle Logic
    // =========================================================================
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const mobileIcon = mobileBtn?.querySelector('i');

    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileBtn.classList.toggle('active');

            if (navLinks.classList.contains('active')) {
                mobileIcon?.classList.remove('fa-bars');
                mobileIcon?.classList.add('fa-times');
            } else {
                mobileIcon?.classList.remove('fa-times');
                mobileIcon?.classList.add('fa-bars');
            }
        });

        // Close mobile menu when a nav link is clicked
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileBtn.classList.remove('active');
                mobileIcon?.classList.remove('fa-times');
                mobileIcon?.classList.add('fa-bars');
            });
        });
    }

    // =========================================================================
    // 2. Sticky Navbar & Active Link Update
    // =========================================================================
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a:not(.btn)');

    window.addEventListener('scroll', () => {
        // Add sticky class
        if (window.scrollY > 50) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }

        // Highlight active link based on scroll position
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Add slight offset for better UX
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(a => {
            a.classList.remove('active');
            if (current && a.getAttribute('href') === `#${current}`) {
                a.classList.add('active');
            }
        });
    });

    // Initialize sticky state on page load
    window.dispatchEvent(new Event('scroll'));

    // =========================================================================
    // 3. Intersection Observer for Scroll Animations
    // =========================================================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of element is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: Stop observing once visible if you don't want it to keep animating
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.show-on-scroll');
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // =========================================================================
    // 4. WhatsApp Lead Generation Form Submission
    // =========================================================================
    // =========================================================================
    // 4. WhatsApp Lead Generation Form Submission
    // =========================================================================
    const leadForm = document.getElementById('leadForm');

    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nameInput = document.getElementById('userName');
            const phoneInput = document.getElementById('userPhone');
            const interestSelect = document.getElementById('userInterest');

            if (!nameInput || !phoneInput || !interestSelect) return;

            const name = nameInput.value.trim();
            const phone = phoneInput.value.trim();
            const interest = interestSelect.value;

            if (!name || !phone || !interest) return;

            // Format WhatsApp Message
            const message = `Hello, I'm interested in APMR Properties.\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Interest:* ${interest}\n\nPlease get in touch with me.`;

            // Encode message for URI
            const encodedMessage = encodeURIComponent(message);

            // Build URL (Provided WhatsApp number: 917093410203)
            const whatsappUrl = `https://wa.me/917093410203?text=${encodedMessage}`;

            // Open WhatsApp in new tab
            window.open(whatsappUrl, '_blank');
        });
    }

    // =========================================================================
    // 5. Modal Logic for Google Form (Auto Pop-up)
    // =========================================================================
    const modal = document.getElementById('formModal');
    const closeBtn = document.querySelector('.close-modal');

    if (modal && closeBtn) {
        // Automatically open modal on page load after a slight delay
        setTimeout(() => {
            // Check if it hasn't been shown yet in this session to prevent annoyance
            if (!sessionStorage.getItem('googleFormShown')) {
                modal.classList.add('show');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
                sessionStorage.setItem('googleFormShown', 'true');
            }
        }, 1500); // 1.5 second delay

        // Close modal when clicking X
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show');
            document.body.style.overflow = ''; // Restore background scrolling
        });

        // Close modal when clicking outside of the content
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
                document.body.style.overflow = '';
            }
        });
    }
});

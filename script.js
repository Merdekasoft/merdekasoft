// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
const headerElement = document.querySelector('header');

if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
        const isActive = mainNav.classList.toggle('active');
        menuToggle.innerHTML = isActive 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
}

// Logo (top-left) -> go to home (smooth scroll) and close mobile nav if open
const logoLink = document.getElementById('logoLink');
if (logoLink) {
    logoLink.addEventListener('click', function(e) {
        // Prevent full page reload when clicked; smooth-scroll to top / home section
        e.preventDefault();
        if (mainNav && mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            if (menuToggle) menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // update URL to reflect actual home link without reloading
        try { history.replaceState(null, '', logoLink.getAttribute('href')); } catch (err) {}
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (target) {
            if (mainNav && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                if (menuToggle) menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
            const headerOffset = headerElement ? headerElement.offsetHeight : 60;
            const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
    });
});

// Intersection observer for .animate elements
const animateElements = document.querySelectorAll('.animate');
if (animateElements.length) {
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animateElements.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(15px)'; 
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out'; 
        observer.observe(el);
    });
}

// Load Imgur embed script once (needed for the blockquote to render)
(function loadImgurEmbed(){
    if (!document.getElementById('imgur-embed-script')) {
        const s = document.createElement('script');
        s.id = 'imgur-embed-script';
        s.async = true;
        s.src = 'https://s.imgur.com/min/embed.js';
        s.charset = 'utf-8';
        document.body.appendChild(s);
    }
})();
// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        
        // Change button icon
        if (mobileMenu.classList.contains('active')) {
            this.innerHTML = '&times;'; // Close icon (X)
        } else {
            this.innerHTML = '&#9776;'; // Menu icon (hamburger)
        }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = mobileMenu.contains(event.target);
        const isClickOnMenuButton = event.target === mobileMenuBtn;
        
        if (!isClickInsideMenu && !isClickOnMenuButton) {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.innerHTML = '&#9776;';
        }
    });
});
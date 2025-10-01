        // Heart/favorite toggle - exact functionality
        document.querySelectorAll('.favorite').forEach(heart => {
            heart.addEventListener('click', function(e) {
                e.stopPropagation();
                if (this.innerHTML === '♡') {
                    this.innerHTML = '❤️';
                    this.style.background = 'rgba(220, 20, 60, 0.8)';
                } else {
                    this.innerHTML = '♡';
                    this.style.background = 'rgba(0, 0, 0, 0.6)';
                }
            });
        });

        // Hotel card hover effects - matches image behavior
        document.querySelectorAll('.hotel-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-4px)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });

        // Navigation scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.style.top = "-100px";
            } else {
                navbar.style.top = "20px";
            }
        });

        // Button click handlers
        document.querySelectorAll('.action-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const text = this.textContent.trim();
                if (text.includes('Hotels')) {
                    document.querySelector('.hotels-section').scrollIntoView({ 
                        behavior: 'smooth' 
                    });
                } else {
                    console.log(`${text} feature clicked`);
                }
            });
        });

    // Mobile menu functionality
    function toggleMobileMenu() {
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        
        if (mobileMenu && mobileToggle) {
            mobileMenu.classList.toggle('active');
            
            // Animate hamburger menu
            const spans = mobileToggle.querySelectorAll('span');
            if (mobileMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        }
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        
        if (mobileMenu && mobileToggle && !mobileToggle.contains(event.target) && !mobileMenu.contains(event.target)) {
            mobileMenu.classList.remove('active');
            
            const spans = mobileToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close mobile menu when window is resized to desktop size
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            const mobileMenu = document.getElementById('mobileMenu');
            const mobileToggle = document.querySelector('.mobile-menu-toggle');
            
            if (mobileMenu && mobileToggle) {
                mobileMenu.classList.remove('active');
                
                const spans = mobileToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        }
    });

    // Search functionality
    function initializeSearch() {
        const searchInput = document.querySelector('.search-input');
        const searchBtn = document.querySelector('.search-btn');
        
        if (searchInput && searchBtn) {
            searchBtn.addEventListener('click', performSearch);
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    performSearch();
                }
            });
        }
    }

    function performSearch() {
        const searchInput = document.querySelector('.search-input');
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        if (searchTerm) {
            // Redirect to appropriate page based on search term
            if (searchTerm.includes('diving') || searchTerm.includes('dive') || searchTerm.includes('anilao')) {
                window.location.href = 'things-to-do.html#diving';
            } else if (searchTerm.includes('hiking') || searchTerm.includes('hike') || searchTerm.includes('gulugod')) {
                window.location.href = 'things-to-do.html#hiking';
            } else if (searchTerm.includes('island') || searchTerm.includes('hopping')) {
                window.location.href = 'things-to-do.html#island-hopping';
            } else if (searchTerm.includes('resort') || searchTerm.includes('hotel') || searchTerm.includes('accommodation')) {
                window.location.href = 'landing-page.html#resorts';
            } else if (searchTerm.includes('overview') || searchTerm.includes('about') || searchTerm.includes('info')) {
                window.location.href = 'destination-overview.html';
            } else {
                // Default to places to visit
                window.location.href = 'places_to_visit.html';
            }
        }
    }

    // Initialize
    document.addEventListener('DOMContentLoaded', () => {
        createSlides();
        startAutoPlay();
        initializeSearch();
    });
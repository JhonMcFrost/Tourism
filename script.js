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

    // Mabini Destinations Data
    const destinations = [
        {
            name: "Altamare Dive & Leisure Resort",
            image: "images/altamare1.png",
            description: "Escape to the stunning coastal town of Mabini, Batangas and experience the beauty of Altamare Dive and Leisure Resort. Perfect for diving enthusiasts and beach lovers.",
            highlights: ["Diving Spots", "Beach Resort", "Marine Life", "Relaxation"]
        },
        {
            name: "Camp Netanya Resort & Spa",
            image: "images/camp1.png", 
            description: "Experience luxury and relaxation at Camp Netanya Resort and Spa in the beautiful coastal town of Mabini, Batangas. Mediterranean-inspired architecture awaits.",
            highlights: ["Luxury Spa", "Infinity Pool", "Mediterranean Views", "Fine Dining"]
        },
        {
            name: "The Philip Ann Resort",
            image: "images/philip1.png",
            description: "Escape to the stunning coastal town of Mabini, Batangas and experience luxury at The Philip Ann Resort. Enjoy breathtaking views and modern amenities.",
            highlights: ["Modern Amenities", "Breathtaking Views", "Luxury Accommodation", "Beach Access"]
        },
        {
            name: "Eagle Point Beach & Dive Resort",
            image: "images/eagle1.png",
            description: "Escape to Eagle Point Beach and Dive Resort in Mabini, Batangas. This charming coastal town offers pristine white sand beaches and excellent diving conditions.",
            highlights: ["White Sand Beaches", "Diving Resort", "Marine Sanctuary", "Water Sports"]
        },
        {
            name: "Mt. Gulugod Baboy",
            image: "images/gulugod.jpeg",
            description: "Hike to the summit of Mt. Gulugod Baboy in Mabini, Batangas for panoramic views of the surrounding Batangas Bay. A must-visit for nature lovers.",
            highlights: ["Hiking Trails", "Panoramic Views", "Nature Spot", "Island Views"]
        }
    ];

    let currentSlide = 0;
    let autoPlay = true;
    let autoPlayInterval;
    const SLIDE_DURATION = 6000; // 6 seconds per slide

    function createSlides() {
        const container = document.getElementById('carouselContainer');
        const navigation = container.querySelector('.navigation');
        
        destinations.forEach((dest, index) => {
            // Create slide
            const slide = document.createElement('div');
            slide.className = `carousel-slide ${index === 0 ? 'active' : ''}`;
            slide.style.backgroundImage = `linear-gradient(135deg, rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url('${dest.image}')`;
            slide.style.backgroundSize = 'cover';
            slide.style.backgroundPosition = 'center';
            
            slide.innerHTML = `
                <div class="slide-overlay">
                    <div class="slide-content">
                        <h1 class="slide-title">${dest.name}</h1>
                        <p class="slide-description">${dest.description}</p>
                        <div class="slide-highlights">
                            ${dest.highlights.map(highlight => 
                                `<span class="highlight-tag">${highlight}</span>`
                            ).join('')}
                        </div>
                    </div>
                    <div class="slide-image" style="background-image: url('${dest.image}')"></div>
                </div>
            `;
            
            container.insertBefore(slide, navigation);
            
            // Create dot
            const dot = document.createElement('div');
            dot.className = `dot ${index === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => goToSlide(index));
            document.getElementById('dotsContainer').appendChild(dot);
        });
    }

    function goToSlide(index) {
        const slides = document.querySelectorAll('.carousel-slide');
        const dots = document.querySelectorAll('.dot');
        
        // Remove active class from current slide and dot
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        
        // Add active class to new slide and dot
        currentSlide = index;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
        
        
    }

    function nextSlide() {
        const nextIndex = (currentSlide + 1) % destinations.length;
        goToSlide(nextIndex);
    }

    function prevSlide() {
        const prevIndex = (currentSlide - 1 + destinations.length) % destinations.length;
        goToSlide(prevIndex);
    }

    function startAutoPlay() {
        if (autoPlayInterval) clearInterval(autoPlayInterval);
        autoPlayInterval = setInterval(nextSlide, SLIDE_DURATION);
    }

    function stopAutoPlay() {
        if (autoPlayInterval) clearInterval(autoPlayInterval);
    }

    // Event listeners
    document.getElementById('nextBtn').addEventListener('click', () => {
        nextSlide();
        if (autoPlay) startAutoPlay(); // Restart autoplay timer
    });

    document.getElementById('prevBtn').addEventListener('click', () => {
        prevSlide();
        if (autoPlay) startAutoPlay(); // Restart autoplay timer
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'ArrowLeft':
                prevSlide();
                if (autoPlay) startAutoPlay();
                break;
            case 'ArrowRight':
                nextSlide();
                if (autoPlay) startAutoPlay();
                break;
        }
    });

    // Touch/swipe support
    let startX = 0;
    let endX = 0;

    document.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    document.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });

    function handleSwipe() {
        const threshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
            if (autoPlay) startAutoPlay();
        }
    }

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
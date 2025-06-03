const carousel = document.querySelector('.testimonials-carousel-track');
const dotsContainer = document.querySelector('.dots');
const cards = document.querySelectorAll('.testimonial-card');
let isDragging = false, startX, startScrollLeft, timeoutId;
let currentIndex = 0;
let cardsPerView = getCardsPerView();

// Create dots based on number of cards and cards per view
function createDots() {
    dotsContainer.innerHTML = '';
    const dotCount = Math.ceil(cards.length / cardsPerView);
    
    for (let i = 0; i < dotCount; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot w-12 h-12 border-none border-radius-50 bg-black-4 cursor-pointer relative';
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => moveToSlide(i));
        dotsContainer.appendChild(dot);
    }
}

// Get number of cards to show based on screen size
function getCardsPerView() {
    if (window.innerWidth < 576) return 1;
    if (window.innerWidth < 992) return 2;
    return 3;
}

// Update carousel and dots when screen size changes
function updateCarousel() {
    cardsPerView = getCardsPerView();
    const gap = (cardsPerView - 1) * 30;
    carousel.style.gridAutoColumns = `calc((100% - ${gap}px) / ${cardsPerView})`;
    createDots();
    moveToSlide(currentIndex);
}

// Move carousel to specific slide
function moveToSlide(index) {
    currentIndex = index;
    const card = carousel.querySelector('.testimonial-card');
    if (!card) return;
    
    const cardWidth = card.offsetWidth;
    const gap = 30;
    const scrollAmount = index * (cardWidth + gap) * cardsPerView;
    
    carousel.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
    });
    
    updateDots();
}

// Update active dot
function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

// Initialize drag functionality
const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add('dragging');
    startX = e.pageX || e.touches?.[0].pageX;
    startScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
    if (!isDragging) return;
    carousel.scrollLeft = startScrollLeft - ((e.pageX || e.touches?.[0].pageX) - startX);
};

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove('dragging');
    
    // Calculate the closest slide
    const card = carousel.querySelector('.testimonial-card');
    if (!card) return;
    
    const cardWidth = card.offsetWidth;
    const gap = 30;
    const scrollPosition = carousel.scrollLeft;
    const newIndex = Math.round(scrollPosition / ((cardWidth + gap) * cardsPerView));
    
    currentIndex = Math.max(0, Math.min(newIndex, Math.ceil(cards.length / cardsPerView) - 1));
    moveToSlide(currentIndex);
};

// Handle scroll events to update dots
const handleScroll = () => {
    if (isDragging) return;
    
    const card = carousel.querySelector('.testimonial-card');
    if (!card) return;
    
    const cardWidth = card.offsetWidth;
    const gap = 30;
    const scrollPosition = carousel.scrollLeft;
    const newIndex = Math.round(scrollPosition / ((cardWidth + gap) * cardsPerView));
    
    if (newIndex !== currentIndex) {
        currentIndex = newIndex;
        updateDots();
    }
};

// Event listeners
carousel.addEventListener('mousedown', dragStart);
carousel.addEventListener('touchstart', dragStart, { passive: true });

document.addEventListener('mousemove', dragging);
document.addEventListener('touchmove', dragging, { passive: false });

document.addEventListener('mouseup', dragStop);
document.addEventListener('touchend', dragStop);

carousel.addEventListener('scroll', handleScroll);

window.addEventListener('resize', () => {
    const prevCardsPerView = cardsPerView;
    updateCarousel();
    
    // Adjust currentIndex when cards per view changes
    if (prevCardsPerView !== cardsPerView) {
        currentIndex = Math.floor(currentIndex * prevCardsPerView / cardsPerView);
        moveToSlide(currentIndex);
    }
});

// Initialize
updateCarousel();
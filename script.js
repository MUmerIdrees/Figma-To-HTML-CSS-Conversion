document.querySelectorAll(".dropdown").forEach((dropdown) => {
    const button = dropdown.querySelector("span");
    const contentId = dropdown.getAttribute("data-target");
    const content = document.getElementById(contentId);

    if (!button || !content) return;

    dropdown.addEventListener("click", () => {
        content.classList.toggle("show");
    });

    content.querySelectorAll(".language").forEach((lang) => {
        lang.addEventListener("click", (e) => {
            button.innerText = e.target.innerText;
            content.classList.remove("show");
        });
    });
});

document.querySelectorAll(".profile-dropdown-btn").forEach((profileDropdown) => {
    const profileContent = document.getElementById(profileDropdown.getAttribute("data-target"));
    if (profileContent) {
        profileDropdown.addEventListener("click", (e) => {
            e.preventDefault();
            if (profileContent.classList.contains("d-none")) {
                profileContent.classList.remove("d-none");
                profileContent.classList.add("flex");
            } else {
                profileContent.classList.add("d-none");
                profileContent.classList.remove("flex");
            }
        });

        // Optional: Close profile dropdown on item click
        profileContent.querySelectorAll("#profile-dropdown-content a").forEach((item) => {
            item.addEventListener("click", () => {
                profileContent.classList.add("d-none");
            });
        });
    }
});


const sidebarBtn = document.getElementById("sidebar_dropdownBtn");
const sidebarContent = document.getElementById(sidebarBtn.getAttribute("data-target"));

if (sidebarBtn && sidebarContent) {
    sidebarBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (sidebarContent.classList.contains("d-none")) {
            sidebarContent.classList.remove("d-none");
            sidebarContent.classList.add("flex");
        } else {
            sidebarContent.classList.add("d-none");
            sidebarContent.classList.remove("flex");
        }
    });

    // Optional: Close sidebar dropdown on item click
    sidebarContent.querySelectorAll(".sidebar-item a").forEach((item) => {
        item.addEventListener("click", () => {
            sidebarContent.classList.add("d-none");
        });
    });
}

const toggleBtn = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

toggleBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('d-none');
});

const currentPage = window.location.pathname.split('/').pop();
const navLinks = document.querySelectorAll('.nav-links ul li a');
navLinks.forEach((link) => {
    // link.addEventListener('click', () => {
        // navLinks.forEach((l) => {
        //     l.classList.remove('nav-active');
        // });
        // link.classList.add('nav-active');
        const linkPage = link.getAttribute('href');

        // Check if this link's href matches the current page
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('nav-active');
        } else {
            link.classList.remove('nav-active');
        }
    // });
});

const slides = document.querySelectorAll('.slider-item');
const length = slides.length;
const sliderButtons = document.querySelector('.slider-buttons');

for(let i = 0; i < length; i++) {
    const div = document.createElement('div');
    div.className = 'slider-btn w-12 h-12 border-none border-radius-50 bg-white cursor-pointer relative';
    sliderButtons.appendChild(div);
};

const sliderBtns = document.querySelectorAll('.slider-btn');
sliderBtns[0].classList.add('slider-btn-active');
const slider = document.querySelector('.slider');

sliderBtns.forEach((button, i) => {
    button.addEventListener('click', () => {
        sliderBtns.forEach((btn) => {
            btn.classList.remove('slider-btn-active');
        });
        slider.style.transform = `translateX(-${i*100}%)`;
        button.classList.add('slider-btn-active');
    });
});

const initCarousel = () => {
    const carouselButtons = document.querySelectorAll(".carousel-button");
    const carouselTrack = document.querySelector(".carousel-track");

    carouselButtons.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.id === "prev-btn" ? -1 : 1;
            const scrollAmount = carouselTrack.clientWidth * direction;
            carouselTrack.scrollBy({ left: scrollAmount, behavior: "smooth" });
        });
    });
};

window.addEventListener("load", initCarousel);

document.querySelectorAll(".carousel1-container").forEach(container => {
    const carouselTrack1 = container.querySelector(".carousel1-track");
    const arrowBtns = document.querySelectorAll(".carousel-button-1");
    const firstCardWidth = carouselTrack1.querySelector(".carousel1-card").offsetWidth;

    let isDragging = false, startX, startScrollLeft;

    // Add event listener for arrow buttons to scroll the carousel left and right
    arrowBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            carouselTrack1.scrollLeft += btn.classList.contains("prev-btn-1") ? -firstCardWidth : firstCardWidth;
        })
    });

    const dragStart = (e) => {
        isDragging = true;
        carouselTrack1.classList.add("dragging");
        // Records the initial cursor and scroll position of the carousel
        startX = e.pageX;
        startScrollLeft = carouselTrack1.scrollLeft;
    }

    const dragging = (e) => {
        if(!isDragging) return; // If isDragging is false return from here
        // Updates the scroll position of the carousel based on the cursor movement
        carouselTrack1.scrollLeft = startScrollLeft - (e.pageX - startX);
    }

    const dragStop = () => {
        isDragging = false;
        carouselTrack1.classList.remove("dragging");
    }

    carouselTrack1.addEventListener("mousedown", dragStart);
    carouselTrack1.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);
});

const scrollBtn = document.getElementById("scrollBtn");
let isAtTop = true; // Start assuming you're at the top
let isScrolling = false;

// Function to update arrow direction
function updateArrowDirection() {
    if (isAtTop) {
        scrollBtn.classList.remove('rotate-up');
        scrollBtn.classList.add('rotate-down');
    } else {
        scrollBtn.classList.remove('rotate-down');
        scrollBtn.classList.add('rotate-up');
    }
}

// Scroll button click event
scrollBtn.addEventListener("click", () => {
    isScrolling = true;

    if (isAtTop) {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth"
        });
        scrollBtn.classList.remove('bottom-50');
        scrollBtn.classList.add('bottom-450');
    } else {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        scrollBtn.classList.remove('bottom-450');
        scrollBtn.classList.add('bottom-50');
    }
});

// Listen for scroll to detect when it stops
let scrollTimeout;
window.addEventListener("scroll", () => {
    if (scrollTimeout) clearTimeout(scrollTimeout);

    scrollTimeout = setTimeout(() => {
        const scrollY = window.scrollY;
        const nearTop = scrollY <= 5;
        const nearBottom = window.innerHeight + scrollY >= document.body.scrollHeight - 5;

        if (isScrolling) {
            if (nearTop) {
                isAtTop = true;
                updateArrowDirection();
                isScrolling = false;
            } else if (nearBottom) {
                isAtTop = false;
                updateArrowDirection();
                isScrolling = false;
            }
        }
    }, 100); // Fires 100ms after scroll ends
});
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

const toggleBtn = document.getElementById('hamburger1');
const mobileMenu = document.getElementById('mobileMenu1');

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

document.getElementById('googleSignUpBtn').addEventListener('click', function() {
    // Redirect to Google's sign-in page
    window.location.href = 'https://accounts.google.com/signin';
});
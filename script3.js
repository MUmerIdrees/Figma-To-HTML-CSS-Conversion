const sidebarLinks = document.querySelectorAll(".col-1 a");

sidebarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        sidebarLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        const sectionId = link.getAttribute('data-target');
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionId).classList.add('active');
    });
});

const sidebarSection = document.getElementById('account-sidebar');
const sidebarMenu = document.getElementById('sidebar-toggle-btn');

sidebarMenu.addEventListener('click', () => {
    sidebarSection.classList.toggle('active');
    sidebarMenu.classList.remove('sm-block');
});

sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            sidebarSection.classList.remove('active');
            sidebarMenu.classList.add('sm-block');
        }
    });
});

document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && 
        !sidebarSection.contains(e.target) && 
        e.target !== sidebarMenu &&
        !sidebarMenu.contains(e.target) &&
        sidebarSection.classList.contains('active')) {
        sidebarSection.classList.remove('active');
        sidebarMenu.classList.add('sm-block');
    }
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
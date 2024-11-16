// Function to toggle the side menu
function toggleMenu() {
    const sideMenu = document.querySelector('.side-menu');
    sideMenu.classList.toggle('active');
}

// Function to close the side menu
function closeMenu() {
    const sideMenu = document.querySelector('.side-menu');
    sideMenu.classList.remove('active');
}

// Function to open the side menu (if using burger menu)
document.querySelector('.burger-menu').addEventListener('click', toggleMenu);

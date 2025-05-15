let lastScrollPosition = 0;

function toggleMenu() {
    const sideMenu = document.getElementById('sideMenu');
    const menuToggle = document.querySelector('.menu-toggle');
    sideMenu.classList.toggle('active');
    menuToggle.classList.toggle('hidden');
}
    
// Закрытие меню при клике вне его
document.addEventListener('click', function(event) {
    const sideMenu = document.getElementById('sideMenu');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (!sideMenu.contains(event.target) && !menuToggle.contains(event.target) && sideMenu.classList.contains('active')) {
        sideMenu.classList.remove('active');
        menuToggle.classList.remove('hidden');
    }
});





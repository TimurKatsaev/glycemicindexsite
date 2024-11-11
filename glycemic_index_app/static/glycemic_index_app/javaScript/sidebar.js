const menuButton = document.querySelector('.menu-button');
const sideBar = document.querySelector('.sidebar');
const body = document.querySelector('body');
let activeMode = localStorage.getItem('activeMode');
let mobileMode = localStorage.getItem('mobileMode');

menuButton.addEventListener('click', () => {
    activeMode = localStorage.getItem('activeMode');
    if(activeMode !== 'active'){
        enableNavActive();
    } else{
        disableNavActive();
    }
});

// Active

const enableNavActive = () => {
    sideBar.classList.add('active');
    body.classList.add('active');
    localStorage.setItem('activeMode', 'active');
}

const disableNavActive = () => {
    sideBar.classList.remove('active');
    body.classList.remove('active');
    localStorage.setItem('activeMode', 'nonactive');
}

// Mobile

const enableNavMobile = () => {
    body.classList.add('mobile');
    localStorage.setItem('activeMode', 'active');
}

const disableNavMobile = () => {
    body.classList.remove('mobile');
    localStorage.setItem('activeMode', 'nonactive');
}

function checkWidth() {
    if (window.innerWidth <= 768) { // Здесь указываем нужную ширину экрана в пикселях
        enableNavActive();
        enableNavMobile();
    }
    else {
        disableNavActive();
        disableNavMobile();
    }
}

// Проверяем ширину экрана при загрузке страницы
window.addEventListener('load', checkWidth);

// Проверяем ширину экрана при изменении размера окна
window.addEventListener('resize', checkWidth);
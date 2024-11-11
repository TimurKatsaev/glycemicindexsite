const showBtn = document.querySelector('.list-button.show');
const hideBtn = document.querySelector('.list-button.hide');
const list = document.querySelector('.list');

function checkScreenWidth() {
    if (window.innerWidth <= 768) {
        hideBtn.classList.add('active');
    }
    if (window.innerWidth > 768) {
        hideBtn.classList.remove('active');
    }
}

// Проверяем ширину экрана при загрузке страницы
checkScreenWidth();

// Добавляем событие для отслеживания изменения ширины экрана
window.addEventListener("resize", checkScreenWidth);

showBtn.addEventListener('click', () => {
    hideBtn.classList.add('active');
    list.classList.add('active');
    showBtn.classList.remove('active');
});

hideBtn.addEventListener('click', () => {
    showBtn.classList.add('active');
    list.classList.remove('active');
    hideBtn.classList.remove('active');
});
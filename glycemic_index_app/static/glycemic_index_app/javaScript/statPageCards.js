const statItems = document.getElementsByClassName('main-item');
function itemClick(item) {
    for (let i = 0; i < statItems.length; i++) {
        statItems[i].classList.remove('active');
    }
    item.classList.add('active');
}
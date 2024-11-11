function addFn() {
    const divEle = document.getElementById("note-GI-list");
    const wrapper = document.createElement("div");
    wrapper.classList.add("form-GI-wrapper");
    const iFeild = document.createElement("input");
    const button = document.createElement("button");
    iFeild.setAttribute("type", "number");
    iFeild.setAttribute("min", "0");
    iFeild.setAttribute("max", "150");
    iFeild.setAttribute("placeholder", "Число от 1 до 100");
    iFeild.classList.add("form-GI");
    iFeild.setAttribute("name", "form-GI");
    iFeild.setAttribute("required", "");

    button.classList.add("minus-button");
    button.setAttribute("onclick", "delNode(this)");

    wrapper.appendChild(iFeild);
    wrapper.appendChild(button);
    divEle.appendChild(wrapper);
}

function delNode(el) { el.parentNode.remove() }

// Получаем элемент textarea
const textarea = document.querySelector('textarea');

textarea.addEventListener('input', function() {
    this.style.height = 'auto'; // Сбрасывает высоту на "auto" для корректного расчета
    this.style.height = this.scrollHeight + 'px'; // Устанавливает высоту равной scrollHeight
});

// Инициализация начальной высоты, если есть предустановленный текст
textarea.style.height = textarea.scrollHeight + 'px';

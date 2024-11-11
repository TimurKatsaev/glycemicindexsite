const form = document.getElementById('personal-data-form');

form.addEventListener('submit', function (event) {
    event.preventDefault(); // Предотвращаем стандартное действие отправки формы

    const rcgInputs = document.getElementsByClassName('glycemic-index-input');
    const timeInInputs = document.getElementsByClassName('time-in-input');
    const generalRcg = document.getElementById('general-rcg');
    const generalTimeIn = document.getElementById('general-timein');

    let rcgInputList = []
    let timeInInputList = []

    let rcgString = ''
    let timeInString = ''

    // Добавляем СИГ с инпутов в список
    Array.prototype.forEach.call(rcgInputs, el => {
        rcgInputList.push(el.value); 
    })

    // Добавляем врямя всасывания с инпутов в список
    Array.prototype.forEach.call(timeInInputs, el => {
        timeInInputList.push(el.value);
    })

    rcgString = rcgInputList.join('|')
    timeInString = timeInInputList.join('|')

    generalRcg.value = rcgString
    generalTimeIn.value = timeInString
    
    form.submit(); // Отправляем форму
});
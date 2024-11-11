const form = document.getElementById('add-form');

form.addEventListener('submit', function (event) {
    event.preventDefault(); // Предотвращаем стандартное действие отправки формы

    // Глобальные переменные
    let giInputList = []
    let graph = ''
    // Данные с формы
    const giInputs = document.getElementsByClassName("form-GI");
    const glycemia = document.getElementById("form-glycemia").value;
    const bread_units = document.getElementById("form-XE").value;
    
    // Данные пользователя
    let user_rcg = document.getElementById("user_rcg").value.split('|');
    let user_timeIn = document.getElementById("user_timeIn").value.split('|');
    const bu_index = document.getElementById("user_buIndex").value;
    
    // Добавляем ГИ с инпутов в список
    Array.prototype.forEach.call(giInputs, el => {
        giInputList.push(el.value);
    })

    // Делает перерасчёт ГИ на СИГ и ГИ на время всасывания на основе пользовательских данных. 
    // El - пользовательские данные СИГ или время всасывания 
    function UserDataCalc(avgGlycemicIndex, el){
        avgGlycemicIndex = Math.round(avgGlycemicIndex/10);
        if (avgGlycemicIndex >= 1){
            return parseFloat(el[avgGlycemicIndex-1])
        } else{
            return parseFloat(el[0])
        }
    }
    
    // Выполняем вычисления
    const sum = giInputList.reduce((a, b) => parseInt(a) + parseInt(b), 0);
    const avgGi = (sum / giInputList.length) || 0;
    const avgRsg = UserDataCalc(avgGi, user_rcg);
    const time_in = UserDataCalc(avgGi, user_timeIn);
    const absorption_time = (bread_units*bu_index*1000)/avgGi
    
    // Заполняем результат в отдельное поле
    document.getElementById('avg-gi').value = avgGi;
    document.getElementById('avg-rcg').value = avgRsg; // На самом деле это должно определяться по БД пользователя
    document.getElementById('actual-gi').value = giInputList;

    // Вычисляем график

    let minutes = parseFloat(time_in)

    for (let i = 1; i <= time_in; i++) {
        graph += (`${i},${glycemia}|`)
    }

    for (let i = 1; i <= absorption_time; i++) {
        graph += (`${minutes+i},${parseFloat(glycemia)+parseFloat(avgRsg)*i}|`)
    }

    for (let i = 1; i <= 5; i++) {
        graph +=(`${minutes+parseInt(absorption_time)+i},${parseFloat(glycemia)+parseFloat(avgRsg)*absorption_time}|`);
        if (i == 5){
            graph +=(`${minutes+parseInt(absorption_time)+i},${parseFloat(glycemia)+parseFloat(avgRsg)*absorption_time}`);
        }
    }

    // Заполняем результат графика в отдельное поле
    document.getElementById('graph').value = graph;

    // После вычислений отправляем форму вручную
    form.submit(); // Отправляем форму
});
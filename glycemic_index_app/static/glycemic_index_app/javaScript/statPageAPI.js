google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawChart);

let avgGlycemia = []
let avgBU = [['Days', 'Bread units']]
let avgGI = [['Days', 'Glycemic index']]
let avgRCG = [['Days', 'RCG']]
const statItems = document.getElementsByClassName('main-item');
const glycemiaCard = document.getElementById('glycemia');

fetch('/api/get-table-data/')
.then(response => response.json())
.then(data => {
    data = data.reverse();
    data.forEach((item, i, data) => {
        avgGlycemia.push([i + 1, data[i].glycemia])
        avgBU.push([i + 1, data[i].bread_units])
        avgGI.push([i + 1, data[i].general_gi])
        avgRCG.push([i + 1, data[i].general_rcg])
    });
})
.catch(error => console.error('Ошибка:', error));

console.log(avgGlycemia)

function drawChart() {
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'Days');
    data.addColumn('number', 'Glycemia');
    data.addRows(avgGlycemia);
    var options = getOptions(styleMode);
    var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
    chart.draw(data, options);
}

function drawChartClick(elName) {
    var data = google.visualization.arrayToDataTable(elName);
    var options = getOptions(styleMode);
    var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
    chart.draw(data, options);
}

function getOptions(styleMode) {
    if (styleMode === 'dark') {
        return {
            title: 'Company Performance',
            titleTextStyle: {
                color: '#FFFFFF'
            },
            backgroundColor: '#2B2A2F',
            hAxis: {
                textStyle: {
                    color: '#FFFFFF'
                },
                gridlines: {
                    color: '#555555'
                }
            },
            vAxis: {
                textStyle: {
                    color: '#FFFFFF'
                },
                gridlines: {
                    color: '#555555'
                }
            },
            legend: {
                textStyle: {
                    color: '#FFFFFF'
                }
            },
            colors: ['#ffab00', '#0f9d58', '#4285f4', '#db4437']
        };
    } else {
        return {
            title: 'Company Performance',
            titleTextStyle: {
                color: '#000000'
            },
            backgroundColor: '#FFFFFF',
            hAxis: {
                textStyle: {
                    color: '#000000'
                },
                gridlines: {
                    color: '#CCCCCC'
                }
            },
            vAxis: {
                textStyle: {
                    color: '#000000'
                },
                gridlines: {
                    color: '#CCCCCC'
                }
            },
            legend: {
                textStyle: {
                    color: '#000000'
                }
            },
            colors: ['#3366CC', '#DC3912', '#FF9900', '#109618']
        };
    }
}

function itemClick(item) {
    for (let i = 0; i < statItems.length; i++) {
        statItems[i].classList.remove('active');
    }
    item.classList.add('active');
    const elName = item.getAttribute('name')
    if (elName == 'glycemia') {
        drawChartClick(avgGlycemia)
    } else if (elName == 'bread_units') {
        drawChartClick(avgBU)
    } else if (elName == 'glycemic_index') {
        drawChartClick(avgGI)
    } else if (elName == 'rsg') {
        drawChartClick(avgRCG)
    }
}
google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart);

let goalGI = 56;
let leftGI = 100-goalGI;

function drawChart() {
    var data = google.visualization.arrayToDataTable([
        ['Task', 'Hours per Day'],
        ['Осталось', leftGI],
        ['Достигнуто', goalGI],
    ]);

    var options = getOptions(styleMode);

    var chart = new google.visualization.PieChart(document.getElementById('glycemic-index-chart'));
    chart.draw(data, options);
}

function getOptions(styleMode) {
    if (styleMode === 'dark') {
        return {
            title: 'Достижение среднего ГИ: 50',
            pieHole: 0.7,
            titleTextStyle: {
                color: '#FFFFFF'
            },
            backgroundColor: '#1d2024',
            pieSliceBorderColor: 'none',
            hAxis: {
                textStyle: {
                    color: '#FFFFFF',
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
            colors: ['#6A6D70', '#00B6F3', '#4285f4', '#db4437']
        };
    } else {
        return {
            title: 'Достижение среднего ГИ: 50',
            pieHole: 0.7,
            titleTextStyle: {
                color: '#000000'
            },
            backgroundColor: '#EDEDED',
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
            colors: ['#6A6D70', '#1ECB39', '#4285f4', '#db4437']
        };
    }
}
google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart);

let goal_glycemia = 96;
let left_glycemia = 100-goal_glycemia;

function drawChart() {
    var data = google.visualization.arrayToDataTable([
        ['Task', 'Hours per Day'],
        ['Осталось', left_glycemia],
        ['Достигнуто', goal_glycemia],
    ]);

    var options = getOptions(styleMode);

    var chart = new google.visualization.PieChart(document.getElementById('glycemia-chart'));
    chart.draw(data, options);
}
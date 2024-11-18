const wheel = document.getElementById("wheel");
const spingBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");

const roatationValues = [
    {minDegree: 0, maxDegree: 30 , value : 2},
    {minDegree: 31, maxDegree: 90 , value : 1},
    {minDegree: 91, maxDegree: 150 , value : 6},
    {minDegree: 151, maxDegree: 210 , value : 5},
    {minDegree: 211, maxDegree: 270 , value : 4},
    {minDegree: 271, maxDegree: 330 , value : 3},
    {minDegree: 331, maxDegree: 360 , value : 2}
] ;

const data = [16, 16, 16, 16, 16, 16];

var pieColors = [
    "#88D1F2",
    "#F8F074",
    "#B1E577",
    "#D1B9D9",
    "#EB987A",
    "#D53E4F"
];

let myChart = new Chart(wheel, {
        plugins: [ChartDataLabels],
        type: "pie",
        data: {
            labels: [1, 2, 3, 4, 5, 6],
            datasets: [
                {
                    backgroundColor : pieColors,
                    data: data,                 
                },
            ], 
        },
        options: {
            responsive: true,
            animation: {duration: 0},
            plugins:{
                tooltip: false,
                legend:{
                    display : false,
                },
                datalabels: {
                    color: "#ffffff",
                    formatter: (_,context) => 
                        context.chart.data.labels[context.dataIndex],
                    font: {size: 24}
                },
            },
        },  
});
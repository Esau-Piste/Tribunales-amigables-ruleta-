const wheel = document.getElementById("wheel");
const spingBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("result");

const roatationValues = [
    {minDegree: 0, maxDegree: 30 , value : 2},
    {minDegree: 31, maxDegree: 90 , value : 1},
    {minDegree: 91, maxDegree: 150 , value : 6},
    {minDegree: 151, maxDegree: 210 , value : 5},
    {minDegree: 211, maxDegree: 270 , value : 4},
    {minDegree: 271, maxDegree: 330 , value : 3},
    {minDegree: 331, maxDegree: 360 , value : 2}
];

const data = [16, 16, 16, 16, 16, 16];
const pieColors = [
    "#88D1F2",
    "#F8F074",
    "#B1E577",
    "#D1B9D9",
    "#EB987A",
    "#D53E4F"
];

const segmentImages = [
    "IMG/Group 268.png",
    "IMG/head_sad-1.png",
    "IMG/head_sad.png",
    "IMG/head.png",
    "IMG/head_sad.png",
    "IMG/head.png"
];

// Precarga las imágenes
const loadedImages = segmentImages.map(src => {
    const img = new Image();
    img.src = src;
    return img;
});

let myChart = new Chart(wheel, {
    plugins: [{
        id: 'customPlugin',
        afterDraw: (chart) => {
            const ctx = chart.ctx;
            const meta = chart.getDatasetMeta(0);
            
            meta.data.forEach((element, index) => {
                // Obtén el centro y el radio del gráfico
                const centerX = chart.chartArea.left + (chart.chartArea.right - chart.chartArea.left) / 2;
                const centerY = chart.chartArea.top + (chart.chartArea.bottom - chart.chartArea.top) / 2;
                
                // Calcula la posición para cada imagen
                const angle = element.startAngle + (element.endAngle - element.startAngle) / 2;
                const radius = element.outerRadius * 0.7; // Ajusta este valor para cambiar la distancia desde el centro
                
                const x = centerX + Math.cos(angle) * radius;
                const y = centerY + Math.sin(angle) * radius;
                
                // Dibuja la imagen
                const imageSize = 80; // Tamaño de la imagen
                if (loadedImages[index].complete) {
                    ctx.save();
                    ctx.translate(x, y);
                    ctx.rotate(angle + Math.PI/2); // Rota la imagen para que mire hacia afuera
                    ctx.drawImage(
                        loadedImages[index],
                        -imageSize/2,
                        -imageSize/2,
                        imageSize,
                        imageSize
                    );
                    ctx.restore();
                }
            });
        }
    }],
    type: "pie",
    data: {
        labels: [1, 2, 3, 4, 5, 6],
        datasets: [{
            backgroundColor: pieColors,
            data: data,
        }],
    },
    options: {
        responsive: true,
        animation: { duration: 0 },
        plugins: {
            tooltip: false,
            legend: {
                display: false,
            },
            // Removemos datalabels ya que ahora usamos un plugin personalizado
            datalabels: {
                display: false
            }
        },
    },
});
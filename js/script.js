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

// Crea el gráfico de la ruleta
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
                let imageSize = 0; // Tamaño de la imagen
                if(screen.width <= 480){
                    imageSize = 40;
                }else if(screen.width<= 768 ){
                    imageSize = 75;
                } else{
                    imageSize=80;
                }
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

/*const valueGenerator = (angleValue) =>{
    for (let index of rotations) {
       if(angleValue >= index.minDegree && angleValue <= index.maxDegree){
        finalValue.innerHTML = 
        '<p>Value: ${index.value}</p>';
        spingBtn.disabled = false;
        break;
       }
        
    }
}*/

let rotationAngle = 0; // Ángulo inicial de rotación
let selectedValue = null; // Valor seleccionado después del giro

const spinWheel = () => {
    spingBtn.disabled = true; // Deshabilita el botón mientras gira

    // Seleccionar un segmento aleatorio
    const randomSegment = roatationValues[Math.floor(Math.random() * roatationValues.length)];
    const randomDegree = (randomSegment.minDegree + randomSegment.maxDegree) / 2; // Ángulo central del segmento seleccionado

    // Ajustar para que el segmento quede en la posición de 180°
    const offset = 250; // La flecha está fija a los 180°
    const targetAngle = offset - randomDegree; // Ángulo necesario para alinear el segmento con la flecha
    const totalRotation = 360 * 5 + targetAngle + 360; // Rotaciones completas + ajuste

    // Animación de la ruleta
    const rotationAnimation = setInterval(() => {
        rotationAngle += 10; // Incrementa el ángulo
        wheel.style.transform = `rotate(${rotationAngle}deg)`; // Aplica la rotación

        if (rotationAngle >= totalRotation) {
            clearInterval(rotationAnimation); // Detén la animación
            rotationAngle %= 360; // Mantén el ángulo dentro de 0-360
            determineValue((360 + offset - rotationAngle) % 360); // Determina el valor seleccionado basado en el ángulo real
        }
    }, 10);
};


// Función para determinar el valor basado en el ángulo
const determineValue = (angle) => {
    for (let segment of roatationValues) {
        if (angle >= segment.minDegree && angle <= segment.maxDegree) {
            selectedValue = segment.value; // Almacena el valor seleccionado
            /*finalValue.innerHTML = `
            <p>Valor: ${selectedValue}</p>
            <p>Ángulo: ${angle}°</p> 
            `;*/
            break;
        }
    }
    spingBtn.disabled = false; // Habilita el botón para otro giro
};

// Agregar el evento al botón para girar la ruleta
spingBtn.addEventListener("click", spinWheel);
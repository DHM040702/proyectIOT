async function fetchData() {
    const response = await fetch('http://localhost:1880/getData');
    const data = await response.json();
    return data;
}

async function createCharts() {
    const chartData = await fetchData();

    const ctx1 = document.getElementById('ventasChart1').getContext('2d');
    const chart1 = new Chart(ctx1, {
        type: 'line',
        data: {
            labels: chartData.chart/*coloca los datos que se tengan o no en el chart*/.labels,
            datasets: [{
                label: 'Ventas Chart 1',
                data: chartData.chart.data,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    const ctx2 = document.getElementById('ventasChart2').getContext('2d');
    const chart2 = new Chart(ctx2, {
        type: 'line',
        data: {
            labels: chartData.chart2.labels,
            datasets: [{
                label: 'Ventas Chart 2',
                data: chartData.chart2.data,
                fill: false,
                borderColor: 'rgb(255, 99, 132)',
                tension: 0.1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Función para agregar un valor a la gráfica cada cierto tiempo
    function startIncrementingValues() {
        setInterval(async () => {
            const newData = await fetchData();/*Esto cambia los datos nuevos*/

            // Actualizar Chart 1
            chart1.data.datasets[0].data.push(newData.chart.data[0]);
            chart1.data.labels.push(newData.chart/*Este dato es el buscado en los datos nuevos*/.labels[0/*Solicita el valor del array enviado de node-red*/]);
            if (chart1.data.datasets[0].data.length > 7) {
                chart1.data.datasets[0].data.shift();
                chart1.data.labels.shift();
            }
            chart1.update();

            // Actualizar Chart 2
            chart2.data.datasets[0].data.push(newData.chart2.data[0]);
            chart2.data.labels.push(newData.chart2.labels[0]);
            if (chart2.data.datasets[0].data.length > 7) {
                chart2.data.datasets[0].data.shift();
                chart2.data.labels.shift();/*Estos renueva los valores, ya insertados en la tabla*/
            }
            chart2.update();
        }, 35000); // Intervalo de 2000 milisegundos (2 segundos)
    }

    // Llamar a la función para comenzar a incrementar valores automáticamente
    startIncrementingValues();
}

// Crear las gráficas al cargar la página
createCharts();
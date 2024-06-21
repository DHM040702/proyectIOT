async function fetchData() {
    const response = await fetch('http://localhost:1880/getData');
    const data = await response.json();
    return data;
}

async function createChart() {
    const chartData = await fetchData();

    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: chartData.labels,
            datasets: [{
                label: 'Ventas',
                data: chartData.data,
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

    // Función para agregar un valor a la gráfica cada cierto tiempo
    function startIncrementingValues() {
        setInterval(async () => {
            const newData = await fetchData();

            // Añadir nuevo valor al dataset
            myChart.data.datasets[0].data.push(newData.data[newData.data.length - 1]);
            myChart.data.labels.push(newData.labels[newData.labels.length - 1]);

            // Limitar el número de puntos a 7
            if (myChart.data.datasets[0].data.length > 7) {
                myChart.data.datasets[0].data.shift();
                myChart.data.labels.shift();
            }

            // Actualizar la gráfica
            myChart.update();
        }, 2000); // Intervalo de 2000 milisegundos (2 segundos)
    }

    // Llamar a la función para comenzar a incrementar valores automáticamente
    startIncrementingValues();
}

// Crear la gráfica al cargar la página
createChart();
// Inicialización de la gráfica
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['nul', 'nul', 'nul', 'nul', 'nul', 'nul', 'nul'],
        datasets: [{
            label: 'Humedad de Ambiente',
            data: [0, 0, 0, 0, 0, 0, 0],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.4
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
    setInterval(() => {
        // Generar un valor aleatorio para agregar
        const newValue = Math.floor(Math.random() * 100);

        // Añadir nuevo valor al dataset
        myChart.data.datasets[0].data.push(newValue);
        myChart.data.labels.push('Nuevo ' + (myChart.data.labels.length + 1));

        // Limitar el número de puntos a 7
        if (myChart.data.datasets[0].data.length > 7) {
            myChart.data.datasets[0].data.shift();
            myChart.data.labels.shift();
        }

        // Actualizar la gráfica
        myChart.update();
    }, 3000); // Intervalo de 2000 milisegundos (2 segundos)
}

// Llamar a la función para comenzar a incrementar valores automáticamente
startIncrementingValues();
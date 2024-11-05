import Chart from 'chart.js/auto';

const jsRootData = [
    { year: 1935, count: 0 }, 
    { year: 2035, count: 100 }
];

const moreData = [
    { year: 1975, count: 10 }, 
    { year: 2055, count: 110 }
];

function getByValue(map, searchValue) {
    for (let [key, value] of map.entries()) {
        if (value === searchValue)
            return key;
    }
}
document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('lifeMapGraph').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: jsRootData.map(row => row.year),
            datasets: [{
                label: 'Life Map',
                data: jsRootData.map(row => row.count)
            }, 
                {
                    label: 'Another Person',
                data: moreData.map(row => row.count)
                }
            ]
        },
        options: {
            scales: {
                y: {
                    min: 0,
                    max: 100
                },
                x: {
                    min: getByValue(jsRootData, 0),
                    max: getByValue(jsRootData, 100)
                }
            }
        }
    });

    const chartGraph = document.getElementById('lifeMapGraph');
    if (chartGraph) {
        console.log('lifeMapGraph is defined and found in the HTML.');
    } else {
        console.log('lifeMapGraph is NOT found in the HTML.');
    }
});
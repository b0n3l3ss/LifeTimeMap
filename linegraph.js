import Chart from 'chart.js/auto';

let rootName = localStorage.getItem("rootName");
let rootYoB = Number(localStorage.getItem("rootYoB"));

console.log(rootName);
console.log(rootYoB);


const jsRootData = [
    { year: rootYoB, count: 0 }, 
    { year: rootYoB + 100, count: 100 }
];

const moreData = [
    { year: rootYoB, count: -1 }, 
    { year: 2000, count: -1 },
    { year: 2000, count: 0 }, 
    { year: 2000, count: 110 }, 
    { year: rootYoB + 100, count: 110}
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
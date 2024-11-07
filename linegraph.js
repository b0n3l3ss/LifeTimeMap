import Plotly from 'plotly.js-dist';

const lifeGraph = document.getElementById("lifeMapGraph");

//Retrieving Root data for graph
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

    var trace1 = {
        x: [1,1,1,1],
        y: [10,15,13,17],
        type: 'scatter'
    };

    var trace2 = {
        x: [1, 2, 3, 4],
        y: [16, 5, 11, 9],
        type: 'scatter'
    };

    var data = [trace1, trace2];
  
    const chartGraph = document.getElementById('lifeMapGraph');
    Plotly.newPlot(lifeGraph, data);

    if (chartGraph) {
        console.log('lifeMapGraph is defined and found in the HTML.');
    } else {
        console.log('lifeMapGraph is NOT found in the HTML.');
    }
});
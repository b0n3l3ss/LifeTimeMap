import Plotly from 'plotly.js-dist';

const lifeGraph = document.getElementById("lifeMapGraph");

//Retrieving Root data for graph
let rootName = localStorage.getItem("rootName");
let rootYoB = Number(localStorage.getItem("rootYoB"));
let numAddPpl = Number(localStorage.getItem("numPeople"));
let numEvents = Number(localStorage.getItem("numLifeEvents"));

console.log(rootName);
console.log(rootYoB);


var newData = [];

function retrieveDataFromStorage() {
    for(let i = 0; i < numAddPpl; i++) {
        let age = Number(localStorage.getItem(`${i}Age`));
        var added = {
            x: [age, age + 100],
            y: [0,100],
            type: 'scatter',
            text:[localStorage.getItem(`${i}Name`), localStorage.getItem(`${i}Name`)]
        };
        newData.push(added);
    }
    for(let i = 0; i < numEvents; i++) {
        let age = Number(localStorage.getItem(`${i}eventAge`));
        var added = {
            x: [0, rootYoB + age, 3000],
            y: [age, age, age],
            type: 'scatter',
            text:[localStorage.getItem(`${i}eventName`), localStorage.getItem(`${i}eventName`)]
        };
        newData.push(added);
    }
}

document.addEventListener('DOMContentLoaded', function() {

    var layout = {
        xaxis: {
            range: [rootYoB, rootYoB + 100],
            ticks: 'outside',
            tick0: rootYoB,
            dtick: 10,
            ticklen: 0,
            tickcolor: '#000'

        },
        yaxis: {
            ticks: 'outside',
            tick0: 0,
            dtick: 10,
            ticklen: 0,
            tickcolor: '#000'
        }
    };
    
    var root = {
        x: [rootYoB, rootYoB + 100],
        y: [0, 100],
        type: 'scatter',
        text: [localStorage.getItem('rootName'), localStorage.getItem('rootName')]
    };

    var trace2 = {
        x: [rootYoB, rootYoB + 100],
        y: [0, 100],
        type: 'scatter'
    };
    newData.push(root);
    retrieveDataFromStorage();
  
    const chartGraph = document.getElementById('lifeMapGraph');
    let plot = Plotly.newPlot(lifeGraph, newData, layout);

    if (chartGraph) {
        console.log('lifeMapGraph is defined and found in the HTML.');
    } else {
        console.log('lifeMapGraph is NOT found in the HTML.');
    }
    console.log(newData);
});
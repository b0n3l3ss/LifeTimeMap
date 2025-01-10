import Plotly from 'plotly.js-dist';

//Display Elements for index1
const lifeGraph = document.getElementById("lifeMapGraph");
const headLine = document.getElementById("graphHeadline");

//Retrieving Root data for graph
let rootName = localStorage.getItem("rootName");
let rootYoB = Number(localStorage.getItem("rootYoB"));
let numAddPpl = Number(localStorage.getItem("numPeople"));
let numEvents = Number(localStorage.getItem("numLifeEvents"));


//Button
let invButton = document.getElementById("invertButton");

//Flags
let isInverted = false;

//Data Arrays
var unsortedNormalData = [];
var sortedNormalData = [];
var unsortedInvertedData = [];
var sortedInvertedData = [];


function retrieveLivesDataFromStorage() {
    // This loop creates the data array for both normal and inverted graph lives.
    for(let i = 0; i < numAddPpl; i++) {
        let age = Number(localStorage.getItem(`${i}Age`));

        // Normal Data
        var added = {
            x: [age, age + 50, age + 100],
            y: [0,50, 100],
            type: 'scatter',
            mode: "lines+text",
            text:["", localStorage.getItem(`${i}Name`), ""],
            textposition: 'auto',
            name: localStorage.getItem(`${i}Name`),
            line: {
                width: 4
            }
        };
        unsortedNormalData.push(added);

        // Inverted Data
        var added = {
            y: [age, age + 50, age + 100],
            x: [0,50,100],
            type: 'scatter',
            mode: "lines+text",
            text:[localStorage.getItem(`${i}Name`), localStorage.getItem(`${i}Name`), ""],
            textposition: 'auto',
            name: localStorage.getItem(`${i}Name`),
            line: {
                width: 4
            }
        };
        unsortedInvertedData.push(added);
    }
}

function sortData() {
    //This function is going to sort the data we have so that we can properly graph the labels
    while (0 < unsortedNormalData.length) {
        let largest = 0;
        let {x:largestAge} = unsortedNormalData[largest];
        for (let j = 0; j < unsortedNormalData.length; j++){
            let {x:checkingAge} = unsortedNormalData[j];
            if (largestAge[0] < checkingAge[0]) {
                largest = j;
                largestAge = unsortedNormalData[largest].x;
            }
        }
        
        sortedNormalData.push(unsortedNormalData[largest]);
        sortedInvertedData.push(unsortedInvertedData[largest]);

        unsortedNormalData.splice(largest, 1);
        unsortedInvertedData.splice(largest, 1);
    }
};
function placeLabelsOnLives() {

    //The number o
    let numLives = sortedNormalData.length;

    //Find index of youngest person older than root
    let firstOlderPerson = 1;
    while (sortedNormalData[0].x[0] < sortedNormalData[firstOlderPerson].x[0]) {
        firstOlderPerson++;
    }
    let lastYoungerPerson = firstOlderPerson - 1;
    console.log(firstOlderPerson);

    //Find scale to space people
    let youngPeopleAgeDiff = rootYoB - sortedNormalData[1].x[0];
    let youngAgeDiffMax = 90 - youngPeopleAgeDiff;
    let youngAgeDiffMin = 10;
    let youngRate = (youngAgeDiffMax - youngAgeDiffMin) / lastYoungerPerson;

    let olderPeopleAgeDiff = sortedNormalData[numLives - 1].x[0] - rootYoB;
    let olderAgeDiffMax = 90;
    let olderAgeMin = 10 + olderPeopleAgeDiff;
    let olderRate = (olderAgeDiffMax - olderAgeMin) / (numLives - lastYoungerPerson);
    
    //Label the Younger People
    for (let i = 1; i <= lastYoungerPerson; i++) {
        let aYoBOfCurrentPerson = sortedNormalData[i].x[0];

        sortedNormalData[i].x[1] = aYoBOfCurrentPerson + youngAgeDiffMin + ((i - 1) * youngRate);
        sortedNormalData[i].y[1] = youngAgeDiffMin + ((i - 1) * youngRate);

        sortedInvertedData[i].y[1] = aYoBOfCurrentPerson + youngAgeDiffMin + ((i - 1) * youngRate);
        sortedInvertedData[i].x[1] = youngAgeDiffMin + ((i - 1) * youngRate);
    }

    //Label the Older People
    for (let i = numLives - 1; i >= firstOlderPerson; i--) {
        let aYoBOfCurrentPerson = sortedNormalData[i].x[0];

        sortedNormalData[i].x[1] = aYoBOfCurrentPerson + olderAgeDiffMax - ((numLives - i - 1) * olderRate);
        sortedNormalData[i].y[1] = olderAgeDiffMax - ((numLives - i - 1) * olderRate);

        sortedInvertedData[i].y[1] = aYoBOfCurrentPerson + olderAgeDiffMax - ((numLives - i - 1) * olderRate);
        sortedInvertedData[i].x[1] = olderAgeDiffMax - ((numLives - i - 1) * olderRate);
    }

    
}

    function retrieveEventsDataFromStorage() {
    // This loop creates the data array for both nomral and inverted graph events.
    for(let i = 0; i < numEvents; i++) {
        let age = Number(localStorage.getItem(`${i}eventAge`));
        
        // Normal Data
        var added = {
            x: [0, rootYoB + age, 3000],
            y: [age, age, age],
            type: 'scatter',
            text:[localStorage.getItem(`${i}eventName`), localStorage.getItem(`${i}eventName`)],
            line: {
                dash: 'dot',
                width: 4
            },
            name: localStorage.getItem(`${i}eventName`)
        };
        sortedNormalData.push(added);

        // Inverted Data
        var added = {
            y: [0, rootYoB + age, 3000],
            x: [age, age, age],
            type: 'scatter',
            text:[localStorage.getItem(`${i}eventName`), localStorage.getItem(`${i}eventName`)],
            line: {
                dash: 'dot',
                width: 4
            },
            name: localStorage.getItem(`${i}eventName`)
        };
        sortedInvertedData.push(added);
    }
}

document.addEventListener('DOMContentLoaded', function() {

    //The two different graph layouts for 
    var normalLayout = {
        xaxis: {
            title: "Year",
            range: [rootYoB, rootYoB + 100],
            ticks: 'outside',
            tick0: rootYoB,
            dtick: 10,
            ticklen: 0,
            tickcolor: '#000',
            textposition: "top"

        },
        yaxis: {
            title: "Age",
            range: [0,100],
            ticks: 'outside',
            tick0: 0,
            dtick: 10,
            ticklen: 0,
            tickcolor: '#000'
        },
    };

    var invertedLayout = {
        yaxis: {
            title: "Year",
            range: [rootYoB, rootYoB + 100],
            ticks: 'outside',
            tick0: rootYoB,
            dtick: 10,
            ticklen: 0,
            tickcolor: '#000'

        },
        xaxis: {
            title: "Age",
            range: [0,100],
            ticks: 'outside',
            tick0: 0,
            dtick: 10,
            ticklen: 0,
            tickcolor: '#000'
        }
    };
    
    //The two different root data points. Used for the different maps.
    var normalRoot = {
        x: [rootYoB, rootYoB + 100],
        y: [0, 100],
        type: 'scatter',
        //mode: 'lines+text',
        text: [localStorage.getItem('rootName'), localStorage.getItem('rootName')],
        name: localStorage.getItem('rootName'),
        line: {
            width: 4
        }
    };

    var invertedRoot = {
        y: [rootYoB, rootYoB + 100],
        x: [0, 100],
        type: 'scatter',
        text: [localStorage.getItem('rootName'), localStorage.getItem('rootName')],
        name: localStorage.getItem('rootName'),
        line: {
            width: 4
        }
    }

    //Creates the two different arrays for graphing the map.
    sortedNormalData.push(normalRoot);
    sortedInvertedData.push(invertedRoot);
    retrieveLivesDataFromStorage();
    sortData();
    placeLabelsOnLives();
    retrieveEventsDataFromStorage();
    console.log(sortedNormalData);
  
    const chartGraph = document.getElementById('lifeMapGraph');
    Plotly.newPlot(lifeGraph, sortedNormalData, normalLayout);


    //Button handler that inverts the data given.
    invButton.addEventListener('click', function() {
        if (isInverted) {
            Plotly.newPlot(lifeGraph, sortedNormalData, normalLayout);
            isInverted = false;
            headLine.innerHTML = "Life Time Map";
        } else {
            Plotly.newPlot(lifeGraph, sortedInvertedData, invertedLayout);
            isInverted = true;
            headLine.innerHTML = "Inverted Life Time Map";
        }
    });

    if (chartGraph) {
        console.log('lifeMapGraph is defined and found in the HTML.');
    } else {
        console.log('lifeMapGraph is NOT found in the HTML.');
    }
});

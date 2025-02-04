// Code for downloading data entered to CSV

// Buttons
const downloadBtn = document.getElementById("downloadCSV");

// Elementary Data
const rootName = document.getElementById("rName");
const rootYoB = document.getElementById("rAge");
const numAddPpl = document.getElementById("sNumPeople");
const numLifeEvents = document.getElementById("numLifeEvents");

let csvArray = [];


const csvString = function () {
    csvArray.push(`${numAddPpl.value},${numLifeEvents.value}`);
    csvArray.push(`${rootName.value},${rootYoB.value}`);

    for (let i = 0; i < numAddPpl.value; i++) {
        const newName = document.getElementById(`${i}Name`).value;
        const newYoB = document.getElementById(`${i}Age`).value;
        csvArray.push(`${newName},${newYoB}`);
    }

    for (let i = 0; i < numLifeEvents.value; i++) {
        const newEvent = document.getElementById(`${i}Event`).value;
        const newYoE = document.getElementById(`${i}YoE`).value;
        csvArray.push(`${newEvent},${newYoE}`);
    }
    return csvArray.join('\n');
}

const download = (data) => {
    // Create a Blob with the CSV data and type
    const blob = new Blob([data], { type: 'text/csv' });
    
    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);
    
    // Create an anchor tag for downloading
    const a = document.createElement('a');
    
    // Set the URL and download attribute of the anchor tag
    a.href = url;
    a.download = 'LifeTimeMapData.csv';
    
    // Trigger the download by clicking the anchor tag
    a.click();
}

downloadBtn.addEventListener('click', function() {
    csvArray = [];
    csvArray.push("Name,time");
    const data = csvString();
    download(data);
});
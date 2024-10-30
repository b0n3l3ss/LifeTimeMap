import Chart from 'chart.js/auto';
document.addEventListener('DOMContentLoaded', function() {
    const data = [
        { year: 2010, count: 10 }, 
        { year: 2011, count: 20 }, 
        { year: 2012, count: 15 }, 
        { year: 2013, count: 25 }, 
        { year: 2014, count: 22 }, 
        { year: 2015, count: 30 }, 
        { year: 2016, count: 28 }
    ];

    const ctx = document.getElementById('lifeMapGraph').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.map(row => row.year),
            datasets: [{
                label: 'Acquisitions by Year',
                data: data.map(row => row.count)
            }]
        }
    });

    const chartGraph = document.getElementById('lifeMapGraph');
    if (chartGraph) {
        console.log('lifeMapGraph is defined and found in the HTML.');
    } else {
        console.log('lifeMapGraph is NOT found in the HTML.');
    }
});


//const config = {
//    type: 'line',
//    data: data,
//  };

//const labels = Utils.months({count: 7});
//const data = {
//  labels: labels,
//  datasets: [{
//    label: 'My First Dataset',
//    data: [65, 59, 80, 81, 56, 55, 40],
//    fill: false,
//    borderColor: 'rgb(75, 192, 192)',
//    tension: 0.1
//  }]
//};
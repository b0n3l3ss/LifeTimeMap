//import {Line} from 'react-chartjs-2' 
import {Chart as ChartJS} from './node_modules/chart.js/auto'

(async function() {
    const data = [
        {year: 2010, count: 10}, 
        {year: 2011, count: 20},
        {year: 2012, count: 15},
        {year: 2013, count: 25},
        {year: 2014, count: 22},
        {year: 2015, count: 30},
        {year: 2016, count: 28},
    ];
    new ChartJS(
        document.getElementById('lifeMapGraph'), 
        {
            type: 'bar',
            data: {
                labels: data.map(row => row.year),
                datasets: [

                    {
                        label: 'Aquisitions by Year',
                        data: data.map(row => row.count) 
                    }
                ]
            }
        }
    )
})();

document.addEventListener('DOMContentLoaded', function() {
    const chartGraph = document.getElementById('lifeMapGraph');

    if (chartGraph) {
        console.log('btn1 is defined and found in the HTML.');
    } else {
        console.log('btn1 is NOT found in the HTML.');
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
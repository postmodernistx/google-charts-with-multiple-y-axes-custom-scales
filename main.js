import './style.css'

const values = {
  axis1min: -10,
  axis1max: 40,
  axis2min: 0,
  axis2max: 24,
};

document.querySelector('#axis1-min').value = values.axis1min;
document.querySelector('#axis1-max').value = values.axis1max;
document.querySelector('#axis2-min').value = values.axis2min;
document.querySelector('#axis2-max').value = values.axis2max;

// Update chart scales on input value change
Array.from(document.querySelectorAll('input')).forEach(input => {
  input.addEventListener('change', updateAxisValue);
});

google.charts.load('current', {'packages':['line', 'corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  // Create the data table.
  var data = new google.visualization.DataTable();
  data.addColumn('date', 'Month');
  data.addColumn('number', "Average Temperature");
  data.addColumn('number', "Average Hours of Daylight");

  data.addRows([
    [new Date(2014, 0),  -.5,  5.7],
    [new Date(2014, 1),   .4,  8.7],
    [new Date(2014, 2),   .5,   12],
    [new Date(2014, 3),  2.9, 15.3],
    [new Date(2014, 4),  6.3, 18.6],
    [new Date(2014, 5),    9, 20.9],
    [new Date(2014, 6), 10.6, 19.8],
    [new Date(2014, 7), 10.3, 16.6],
    [new Date(2014, 8),  7.4, 13.3],
    [new Date(2014, 9),  4.4,  9.9],
    [new Date(2014, 10), 1.1,  6.6],
    [new Date(2014, 11), -.2,  4.5]
  ]);

  // Set chart options
  var options = {
    title: 'Average Temperatures and Daylight in Iceland Throughout the Year',
    width: '100%',
    height: '100%',
    // Gives each series an axis that matches the vAxes number below.
    series: {
      0: { targetAxisIndex: 0 },
      1: { targetAxisIndex: 1 }
    },
    vAxes: {
      0: {
        title: 'Temps (Celsius)',
        viewWindow: {
          min: values.axis1min,
          max: values.axis1max,
        },
      },
      1: {
        title: 'Daylight',
        viewWindow: {
          min: values.axis2min,
          max: values.axis2max,
        }
      }
    },
  };

  // Instantiate and draw our chart, passing in some options.
  var chart = new google.visualization.LineChart(document.querySelector('#chart'));
  chart.draw(data, options);
}

function updateAxisValue(e) {
  const id = e.currentTarget.id.replace('-', '');
  values[id] = Number(e.currentTarget.value);
  drawChart();
}

window.onresize = () => {
  drawChart();
}

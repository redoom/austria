import React from 'react';
import { Chart } from 'react-google-charts';

const BarChartComponent = ({ originalValue, actualValue }) => {
  // Define the chart data
  const data = [
    ['Value', 'Amount', { role: 'style' }],
    ['Original', originalValue, 'color: #5C9BA0'], // Original value color
    ['Actual', actualValue, 'color: #BE6B7D'], // Actual value color
  ];

  // Define the chart options
  const options = {
    chartArea: { width: '50%' },
    legend: { position: 'none' },
    hAxis: {    
      textStyle: { color: '#EFEFEF' },
      gridlines: { color: '#444' }
    },
    vAxis: {
      minValue: 0,
      textStyle: { color: '#EFEFEF' },
      gridlines: { color: '#444' }
    },
    backgroundColor: 'transparent',
    
  };

  return (
    <div>
      <Chart
        chartType="ColumnChart"
        width="100%"
        height="300px"
        data={data}
        options={options}
      />
    </div>
  );
};

export default BarChartComponent;

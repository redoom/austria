import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';

const IncreasingChart = ( increasePercentage ) => {
    const [data, setData] = useState([['Point', 'Value']]);

    useEffect(() => {
        if (increasePercentage) {
            const newdata =[['Point', 'Value']]
            for (let i = 0; i < 10; i++) {
                const value = 100 * Math.pow((1 + 0.1), i);
                // @ts-ignore
                newdata.push([`${i + 1}`, value]);
                setData(newdata)
            }
        }

    }, [increasePercentage]);


    const options = {
        // title: 'Decreasing Line Chart',
        titleTextStyle: { color: '#EFEFEF' },
        hAxis: {
            title: 'Point',
            textStyle: { color: '#EFEFEF' },
            gridlines: { color: '#444' }
        },
        vAxis: {
            title: 'Value',
            minValue: 0,
            maxValue: 110,
            textStyle: { color: '#EFEFEF' },
            gridlines: { color: '#444' }
        },
        legend: 'none',
        colors: ['#5C9BA0'],
        backgroundColor: 'transparent',
    };

    return (
        <Chart
            chartType="LineChart"
            width="100%"
            height="300px"
            data={data}
            options={options}
        />
    );
};

export default IncreasingChart;

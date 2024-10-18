// CircularProgressChart.js
import React, { useRef, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const CircularProgressChart = ({ score, isLoading }) => {
  const scoreData = score
  const chartRef = useRef(null);

  const data = {
    datasets: [
      {
        data: [scoreData, 100 - scoreData],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    rotation: 180, // Start from the bottom
    circumference: 360, // Complete circle
    cutout: '85%',
    plugins: {
      tooltip: {
        enabled: false,
      },
    },
  };

  useEffect(() => {
    const chart = chartRef.current;

    if (chart) {
      const ctx = chart.ctx;
      const gradient = ctx.createLinearGradient(0, 0, 0, 200);
      gradient.addColorStop(0, isLoading ? "#c2c2c2" : '#C7FF81'); // starting color
      gradient.addColorStop(0.80, isLoading ? "#c2c2c2" : '#A3C543'); // second color stop
      gradient.addColorStop(0.90, isLoading ? "#c2c2c2" : '#F6A03B'); // third color stop
      gradient.addColorStop(1, isLoading ? "#c2c2c2" : '#FF5A5A'); // ending color

      chart.data.datasets[0].backgroundColor = [
        gradient,
        '#e0e0e0',
      ];
      chart.update();
    }
  }, [scoreData, isLoading]);

  return (
    <div className='relative max-w-[25rem] max-h-[25rem] lg:w-full w-52 h-52 lg:h-auto' >
      <Doughnut data={data} options={options} ref={chartRef} />
      <div className='absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2'>
        {isLoading ?
          <div className='h-12 w-20 rounded-md bg-gray-300'></div>
          :
          <h2 className="font-bold text-4xl">{`${scoreData}%`}</h2>
        }
      </div>
    </div>
  );
};

export default CircularProgressChart;

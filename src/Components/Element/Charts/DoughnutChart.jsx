import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  datasets: [
    {
      label: 'Score',
      data: [12, 2, 1,],
      backgroundColor: [
        '#0D99FF',
        '#E9ECF0',
        '#E9ECF0',
      ],
      borderColor: [
        '#fff',
        '#fff',
      ],
      borderWidth: 1,
      // cutout:'60%',
      // circumference: 180,
      rotation : 270
    },

  ],
};

function DoughnutChart() {

  

  return (
    <>
    <div className="w-full h-full flex items-center justify-center ">
         <Doughnut className='!h-[200px] !p-[0px] !m-[0px] ' data={data} />
    </div>
    </>
  )
}

export default DoughnutChart
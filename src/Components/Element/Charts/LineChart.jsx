import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const LineChart = ({ isLoading }) => {
  const data = {
    labels: [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ],
    datasets: [
      {
        label: 'My Dataset',
        data: isLoading ? [0, 10, 4, 44, 60, 70, 60, 50, 60, 81, 60, 55] : [0, 10, 4, 44, 60, 70, 60, 50, 60, 81, 60, 55],
        fill: true,
        backgroundColor: isLoading ? '#e0e0e0' : 'rgba(255, 99, 132, 0.2)',
        borderColor: isLoading ? '#c2c2c2' : 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 8,
        pointHoverBorderColor: ["#fff"],
        pointHoverBorderWidth: 2,
      },
    ],
  };

  const options = {

    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        intersect: false,
        mode: 'index',
        usePointStyle: true,
        bodyAlign: "center",
        yAlign: "bottom",
        xAlign: "center",
        footerAlign: "center",
        titleAlign: "center",
        displayColors: false,
        pointStyle: false,
        padding: 10,
        caretPadding: 10,
        bodyFont: {
          size: 15,
        },
        callbacks: {
          title: function () {
            return "";
          },
        },
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;

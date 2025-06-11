import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import { TrendingUp } from 'lucide-react';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
  datasets: [
    {
      label: 'Revenue',
      data: [5000, 6000, 7200, 7800, 8000],
      fill: false,
      borderColor: '#f54033',
      tension: 0.4,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      display: true,
    },
    y: {
      display: false,
    },
  },
};
function Payouts() {
    const latestMonthIndex = data.labels.length - 1;
  const latestMonthPayout = data.datasets[0].data[latestMonthIndex];
  const previousMonthPayout = data.datasets[0].data[latestMonthIndex - 1];
  const increasePercentage = ((latestMonthPayout - previousMonthPayout) / previousMonthPayout) * 100;


  return (
    <div className="bg-white shadow-sm rounded-lg p-4">
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h2 className="text-2xl font-bold">${latestMonthPayout}</h2>
          <p className="text-[#6c7293]">Payouts</p>
        </div>
        <div className="text-red-500 font-semibold flex items-center gap-1 mt-2 md:mt-0">
        {increasePercentage.toFixed(2)}%
        <TrendingUp/>
        </div>
      </div>
      <div className="mt-4">
        <Line data={data} options={options} />
      </div>
      <div className="bg-red-500 text-white mx-2 my-3 py-2 px-4 rounded-md border-none">
        Payouts this month ${latestMonthPayout}
      </div>
    </div>
  );
}

export default Payouts;
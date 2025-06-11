import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale);

const options = {
  responsive: true,
  plugins: {
    legend: false,
  },
};
const PayoutsAnalytics = () => {
    const payoutsData = {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [
        {
          label: 'Payouts',
          data: [],
          backgroundColor: '#22C55E',
        },
      ],
    };
  
    return (
      <div className="bg-white shadow-sm rounded-lg p-4 w-full">
        <h2 className="text-xl font-bold mb-2">Payouts Analytics</h2>
        <Bar data={payoutsData} options={options} />
      </div>
    );
  };
export default PayoutsAnalytics
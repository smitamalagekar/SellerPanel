import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const PayoutsByCategory = () => {
  const data = {
    labels: ["Seller Payout", "Product Refund", "Delivery Boy"],
    datasets: [
      {
        data: [40, 15, 25],
        backgroundColor: ["#3b82f6", "#10b981", "#f59e0b"],
      },
    ],
  };

  const options = {
    responsive: true,
    indexAxis: 'y', // Switch the x and y axes
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <div>
          <h2 className="text-xl font-bold">Payouts</h2>
          <p className="text-[#6c7293]">By Expense Category</p>
        </div>
        <div className="flex space-x-4 mt-2 md:mt-0">
          <button className="text-sm text-gray-600 hover:text-blue-500">
            All
          </button>
          <button className="text-sm text-gray-600 hover:text-blue-500">
            Today
          </button>
          <button className="text-sm text-gray-600 hover:text-blue-500">
            Week
          </button>
          <button className="text-sm text-gray-600 hover:text-blue-500">
            Month
          </button>
        </div>
      </div>
      <div className="mt-4">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default PayoutsByCategory;
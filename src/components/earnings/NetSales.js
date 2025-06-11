import React, { useMemo } from "react";
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

// Register ChartJS once globally
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CHART_DATA = {
  labels: ["Product Sales", "Commission", "Seller Subscription", "Customer Subscription", "Delivery"],
  datasets: [{
    data: [5000, 3000, 2000, 1500, 1000],
    backgroundColor: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"],
  }]
};

const TIME_FILTERS = ["All", "Today", "Week", "Month"];

const NetSales = () => {
  const chartOptions = useMemo(() => ({
    responsive: true,
    indexAxis: 'y',
    plugins: {
      legend: { display: false },
      title: { display: false } // Disabled since no title is needed
    },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { display: false } }
    }
  }), []);

  const chartData = useMemo(() => CHART_DATA, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h2 className="text-xl font-bold">Net Sales</h2>
          <p className="text-[#6c7293]">By Sales Category</p>
        </div>
        <div className="flex space-x-4">
          {TIME_FILTERS.map((filter) => (
            <button 
              key={filter}
              className="text-sm text-gray-600 hover:text-blue-500 transition-colors"
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default NetSales;
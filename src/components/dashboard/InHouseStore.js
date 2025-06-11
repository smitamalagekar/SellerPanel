import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const InHouseStore = () => {
  const [data, setData] = useState({
    labels: ['Cash On Delivery', 'Others', 'Wallet'],
    datasets: [
      {
        data: [0, 0, 0],
        backgroundColor: ['#ef4444', '#3b82f6', '#fbbf24'],
        hoverBackgroundColor: ['#dc2626', '#2563eb', '#f59e0b'],
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = [830.03, 755.75, 550.81];
      setData((prevData) => ({
        ...prevData,
        datasets: [
          {
            ...prevData.datasets[0],
            data: fetchedData,
          },
        ],
      }));
    };
    fetchData();
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => `$${context.raw.toFixed(2)}`,
        },
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full mx-auto max-w-4xl">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">In-house Store</h2>
      <div className="text-2xl font-bold text-gray-800 mb-1">$62,117.160</div>
      <div className="text-gray-500 text-sm mb-3">Total Sales</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="flex flex-col items-center">
          <div className="relative h-40 w-40">
            <Doughnut data={data} options={options} />
          </div>
          <div className="flex flex-col space-y-2 text-sm text-gray-700 mt-4">
            <div className="flex items-center">
              <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
              Cash On Delivery
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
              Others
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
              Wallet
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <button className="bg-purple-100 text-purple-600 text-sm py-1 px-3 rounded-full">
              All In-house Orders
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <div className="text-lg font-bold text-gray-800">60</div>
            <div className="text-blue-500 text-sm">Inhouse product</div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <div className="text-lg font-bold text-gray-800">4.92</div>
            <div className="text-yellow-500 text-sm">Ratings</div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <div className="text-lg font-bold text-gray-800">97</div>
            <div className="text-purple-500 text-sm">Total orders</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InHouseStore;
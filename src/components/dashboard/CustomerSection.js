"use client";
import { TrendingUp } from "lucide-react";
import StatCard from "./StatCard";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useMemo } from "react";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function CustomerSection() {
  // Customer growth data for the chart
  const customerGrowthData = useMemo(() => [50, 150, 200, 300, 350, 450, 520, 550, 600, 660, 690, 800], []);

  // Calculate derived data using useMemo
  const { totalCustomers, increasePercentage } = useMemo(() => {
    const totalCustomers = customerGrowthData[customerGrowthData.length - 1];
    const previousTotalCustomers = customerGrowthData[customerGrowthData.length - 2];
    const increasePercentage = ((totalCustomers - previousTotalCustomers) / previousTotalCustomers) * 100;

    return { totalCustomers, increasePercentage };
  }, [customerGrowthData]); 

  // Chart data configuration
  const chartData = useMemo(() => ({
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        data: customerGrowthData,
        borderColor: "#ffb433",
        backgroundColor: "rgba(255, 180, 51, 0.2)",
        tension: 0.4,
        fill: true,
        pointRadius: 0, // Remove data point dots
        pointHoverRadius: 0, // Remove hover effect on data point dots
      },
    ],
  }), [customerGrowthData]);

  // Chart options configuration
  const options = useMemo(() => ({
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => `Customers: ${context.raw}`,
        },
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
  }), []);

  return (
    <div className="bg-white rounded-lg shadow-sm p-5">
      {/* Section Header */}
      <div className="flex justify-between items-center mb-3">
        <StatCard title="Total Customers" value={totalCustomers} />
        <div className="text-green-500 font-semibold flex items-center gap-1">
          {increasePercentage.toFixed(2)}%
          <TrendingUp />
        </div>
      </div>

      {/* Customer Growth Chart */}
      <div className="mt-4">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}

export default CustomerSection;
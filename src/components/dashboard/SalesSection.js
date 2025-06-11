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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Reusable SalesBreakdownItem component
function SalesBreakdownItem({ color, label, value }) {
  return (
    <div className="flex items-center mb-3">
      <div className={`w-2.5 h-2.5 bg-${color}-500 rounded-full mr-2.5`}></div>
      <span className="flex-1 text-[#6c7293]">{label}</span>
      <span className="font-bold">{value}</span>
    </div>
  );
}

function SalesSection() {
  const salesData = [500, 1000, 700, 1900, 1000, 1200, 1500, 1100, 2000, 2000, 2500];
  const totalSales = salesData.reduce((acc, value) => acc + value, 0);

  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        data: salesData,
        borderColor: "#1a237e",
        backgroundColor: "rgba(26, 35, 126, 0.1)",
        tension: 0.4,
        fill: true, // Fill the area under the line
        pointRadius: 0, // Remove data point dots
        pointHoverRadius: 0, // Remove hover effect on data point dots
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Remove vertical grid lines
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false, // Remove horizontal grid lines
        },
      },
    },
  };

  return (
    <div className="bg-cyan-50 rounded-lg shadow-sm p-5">
      {/* Total Sales StatCard */}
      <StatCard
        title="Total Sales"
        value={`${(totalSales / 1000).toFixed(1)}K`}
        color="#0095ff"
      />

      {/* Sales This Month */}
      <div className="text-cyan-400 rounded-md p-4 mb-5">
        <h3 className="text-lg font-semibold">Sales this month</h3>
        <div className="text-2xl font-bold">${salesData[salesData.length - 1].toFixed(3)}</div>
      </div>

      {/* Sales Stat */}
      <div className="mb-5">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Sales Stat</h3>
        </div>
        <div>
          <Line data={chartData} options={options} aria-label="Sales Chart" />
        </div>
      </div>

      {/* Sales Breakdown */}
      <div>
        <SalesBreakdownItem color="purple" label="In-house Sales" value="$0.000" />
        <SalesBreakdownItem color="red" label="Sellers Sales" value="$0.000" />
      </div>
    </div>
  );
}

export default SalesSection;
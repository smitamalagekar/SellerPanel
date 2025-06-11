import React, { useState } from "react";
import {
  ClockIcon,
  CheckCircleIcon,
  TruckIcon,
  PackageIcon,
} from "lucide-react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Reusable OrderStatusCard component
function OrderStatusCard({
  icon,
  label,
  value,
  bgColor,
  textColor,
  iconColor,
}) {
  return (
    <div
      className={`${bgColor} ${textColor} p-4 rounded-xl shadow-md text-center`}
    >
      {React.cloneElement(icon, {
        className: `w-6 h-6 ${iconColor} mr-2`,
        "aria-label": label,
      })}
      <p className="text-xl font-semibold">{label}</p>
      <h2 className="text-3xl font-bold">{value}</h2>
    </div>
  );
}

const Orders = () => {
  
  const [orderData /*, setOrderData*/] = useState({
    placed: 50,
    confirmed: 50,
    processed: 35,
    pending: 15,
    shipped: 25,
  });

  const totalOrders = Object.values(orderData).reduce(
    (acc, value) => acc + value,
    0
  );

  const pieChartData = {
    labels: ["Placed", "Confirmed", "Processed", "Pending", "Shipped"],
    datasets: [
      {
        data: Object.values(orderData),
        backgroundColor: [
          "#0095ff",
          "#00c853",
          "#ffab00",
          "#ff5252",
          "#7c4dff",
        ],
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
      title: { display: true, text: "Order Status Distribution" },
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 bg-white rounded-lg shadow-sm ml-5">
      {/* Total Orders and Pie Chart */}
      <div className="flex flex-col gap-4">
        <div className="bg-purple-100 text-purple-700 p-6 rounded-2xl shadow-md text-center">
          <h1 className="text-5xl font-bold">{totalOrders}</h1>
          <p className="mt-2 text-gray-600">Total Order</p>
          <button className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-full">
            All Orders
          </button>
        </div>
        <Pie
          data={pieChartData}
          options={pieChartOptions}
          aria-label="Order Status Distribution"
        />
      </div>

      {/* Order Status Cards */}
      <div className="flex flex-col gap-4">
        <OrderStatusCard
          icon={<ClockIcon />}
          label="Pending Order"
          value={orderData.pending}
          bgColor="bg-red-100"
          textColor="text-red-700"
          iconColor="text-red-600"
        />
        <OrderStatusCard
          icon={<CheckCircleIcon />}
          label="Confirmed Order"
          value={orderData.confirmed}
          bgColor="bg-green-100"
          textColor="text-green-700"
          iconColor="text-green-600"
        />
        <OrderStatusCard
          icon={<PackageIcon />}
          label="Processed Order"
          value={orderData.processed}
          bgColor="bg-pink-100"
          textColor="text-pink-700"
          iconColor="text-pink-600"
        />
        <OrderStatusCard
          icon={<TruckIcon />}
          label="Order Shipped"
          value={orderData.shipped}
          bgColor="bg-yellow-100"
          textColor="text-yellow-700"
          iconColor="text-yellow-600"
        />
      </div>
    </div>
  );
};

export default Orders;

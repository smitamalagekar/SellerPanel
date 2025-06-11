import { useState } from 'react';
import { FaBox, FaClock, FaCheck, FaTruck, FaCheckDouble, FaBan, FaUndo, FaTimesCircle } from 'react-icons/fa';

const StatCard = ({ icon: Icon, title, value, color }) => (
  <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
    <div className="flex items-center gap-4">
      <div className={`p-3 rounded-full ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  </div>
);

const OrderStatistics = () => {

  // eslint-disable-next-line no-unused-vars
  const [stats, setStats] = useState([
    { icon: FaBox, title: 'Total Orders', value: 175, color: 'bg-red-400' },
    { icon: FaClock, title: 'Pending', value: 15, color: 'bg-yellow-400' },
    { icon: FaCheck, title: 'Confirmed', value: 50, color: 'bg-green-400' },
    { icon: FaTruck, title: 'Ongoing', value: 35, color: 'bg-blue-400' },
    { icon: FaCheckDouble, title: 'Delivered', value: 25, color: 'bg-purple-400' },
    { icon: FaBan, title: 'Canceled', value: 7, color: 'bg-red-400' },
    { icon: FaUndo, title: 'Returned', value: 0, color: 'bg-blue-300' },
    { icon: FaTimesCircle, title: 'Rejected', value: 0, color: 'bg-red-500' }
  ]);

  const [dateRange, setDateRange] = useState('');

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`/api/order-stats?range=${dateRange}`);
//         const data = await response.json();
        
//         setStats([
//           { icon: FaBox, title: 'Total Orders', value: data.totalOrders, color: 'bg-red-400' },
//           { icon: FaClock, title: 'Pending', value: data.pending, color: 'bg-yellow-400' },
//           { icon: FaCheck, title: 'Confirmed', value: data.confirmed, color: 'bg-green-400' },
//           { icon: FaTruck, title: 'Ongoing', value: data.ongoing, color: 'bg-blue-400' },
//           { icon: FaCheckDouble, title: 'Delivered', value: data.delivered, color: 'bg-purple-400' },
//           { icon: FaBan, title: 'Canceled', value: data.canceled, color: 'bg-red-400' },
//           { icon: FaUndo, title: 'Returned', value: data.returned, color: 'bg-blue-300' },
//           { icon: FaTimesCircle, title: 'Rejected', value: data.rejected, color: 'bg-red-500' }
//         ]);
//       } catch (error) {
//         console.error('Failed to fetch order statistics:', error);
//       }
//     };

//     fetchData();
//   }, [dateRange]);

  const handleDateRangeChange = (event) => {
    setDateRange(event.target.value);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Order Statistics</h2>
        <select 
          className="px-4 py-2 border rounded-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={dateRange}
          onChange={handleDateRangeChange}
        >
          <option value="">Select Date Range</option>
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
        </select>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            icon={stat.icon}
            title={stat.title}
            value={stat.value}
            color={stat.color}
          />
        ))}
      </div>
    </div>
  );
};

export default OrderStatistics;
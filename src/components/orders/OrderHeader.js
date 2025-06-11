import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import Dropdown from '../Dropdown';

const OrderHeader = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const dropdowns = {
    bulk: {
      label: 'Bulk Action',
      options: ['Mark as Delivered', 'Mark as Pending', 'Delete Selected']
    },
    // delivery: {
      
    //   label: 'Filter by Delivery',
    //   options: ['All', 'Pending', 'Processing', 'Delivered', 'Cancelled']
    // },
    // payment: {
    //   label: 'Filter by Payment',
    //   options: ['All', 'Paid', 'Unpaid', 'Refunded']
    // },
    date: {
      label: 'Filter by Date',
      options: ['Today', 'Last 7 Days', 'This Month', 'Last Month', 'Custom Range']
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">All Preorders</h1>
        
        <div className="flex flex-wrap gap-4 items-center">
          {Object.entries(dropdowns).map(([key, { label, options }]) => (
            <Dropdown
              key={key}
              label={label}
              options={options}
              isOpen={openDropdown === key}
              onToggle={() => toggleDropdown(key)}
            />
          ))}
          
          <div className="flex gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Type Order code & hit Enter"
                className="pl-10 pr-4 py-2 border rounded-md w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
            <button className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Filter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHeader;
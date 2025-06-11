import React, { useState } from "react";
import ProductTable from "./ProductTable";
import Dropdown from "../Dropdown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CommissionHistory() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null); // Track selected option
  
  const itemsPerPage = 10;

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    setOpenDropdown(null); // Close dropdown after selection
  };
  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const dropdowns = {
    bulk: {
      label: selectedOption || "Choose seller",
      options: ["Mark as Delivered", "Mark as Pending", "Delete Selected"],
    },
  };

  const commissionHistory = [
    {
      id: 1,
      orderCode: 11,
      adminCommission: 32,
      sellerEarning: 22,
      createdAt: new Date(),
    },
    {
      id: 2,
      orderCode: 12,
      adminCommission: 29,
      sellerEarning: 19,
      createdAt: new Date(),
    },
    {
      id: 3,
      orderCode: 13,
      adminCommission: 26,
      sellerEarning: 16,
      createdAt: new Date(),
    },
    {
      id: 4,
      orderCode: 14,
      adminCommission: 21,
      sellerEarning: 11,
      createdAt: new Date(),
    },
    {
      id: 5,
      orderCode: 15,
      adminCommission: 15,
      sellerEarning: 10,
      createdAt: new Date(),
    },
    {
      id: 6,
      orderCode: 16,
      adminCommission: 11,
      sellerEarning: 8,
      createdAt: new Date(),
    },
  ];

  const columns = [
    {
      header: "#",
      accessor: (_, index) => index + 1,
    },
    {
      header: "Order Code",
      accessor: (item) => item.orderCode,
    },
    {
      header: "Admin Commission",
      accessor: (item) => `$${item.adminCommission}`,
    },
    {
      header: "Seller Earning",
      accessor: (item) => `$${item.sellerEarning}`,
    },
    {
      header: "Created At",
      accessor: (item) => item.createdAt.toLocaleDateString(),
    },
  ];


  const filteredData = commissionHistory.filter((item) => {
    if (!startDate || !endDate) return true;
    const itemDate = new Date(item.createdAt);
    return itemDate >= startDate && itemDate <= endDate;
  });

  return (
    <>
      <h1 className="text-xl font-bold text-gray-800 m-5">
        Commission History Report
      </h1>
      <div className="bg-white p-3 shadow-lg rounded-lg mb-6 mx-4 md:mx-10 lg:mx-20 xl:mx-40">
        <div className="flex flex-col mb-3 md:flex-row md:items-center md:justify-between border-b">
          <h1 className="text-base text-gray-800 m-5">Commission History</h1>{" "}
          <div className="flex flex-wrap gap-4 items-center">
            {Object.entries(dropdowns).map(([key, { label, options }]) => (
              <Dropdown
                key={key}
                label={label}
                options={options}
                isOpen={openDropdown === key}
                onToggle={() => toggleDropdown(key)}
                onSelect={handleSelectOption} // Pass the select handler
              />
            ))}

            <div className="flex items-center space-x-2">
              <DatePicker
                selectsRange
                startDate={startDate}
                endDate={endDate}
                onChange={handleDateChange}
                isClearable
                placeholderText="Select date range"
                className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button className="px-6 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600">
              Filter
            </button>
          </div>
        </div>
        <ProductTable
          columns={columns}
          data={filteredData}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
}

export default CommissionHistory;

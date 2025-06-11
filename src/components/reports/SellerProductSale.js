import React, { useState } from 'react';
import ProductTable from './ProductTable';
import Dropdown from '../Dropdown';

function SellerProductSale() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
    const [selectedOption, setSelectedOption] = useState(null); // Track selected option
  
  const itemsPerPage = 10;

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };
  const handleSelectOption = (option) => {
    setSelectedOption(option);
    setOpenDropdown(null); // Close dropdown after selection
  };
  const dropdowns = {
    bulk: {
      label: selectedOption ||"Choose status",
      options: ["Approved", "Not Approved"],
    },
  };

  const sellerProductSales = [
    { sellerName: "B", shopName: "--", productSale: 32, orderAmount: 30 },
    { sellerName: "A", shopName: "--", productSale: 32, orderAmount: 30 },
    { sellerName: "B", shopName: "--", productSale: 32, orderAmount: 30 },
    { sellerName: "A", shopName: "--", productSale: 32, orderAmount: 30 },
    { sellerName: "B", shopName: "--", productSale: 32, orderAmount: 30 },
    { sellerName: "A", shopName: "--", productSale: 32, orderAmount: 30 },
    { sellerName: "B", shopName: "--", productSale: 32, orderAmount: 30 },
    { sellerName: "A", shopName: "--", productSale: 32, orderAmount: 30 },
    { sellerName: "B", shopName: "--", productSale: 32, orderAmount: 30 },
    { sellerName: "A", shopName: "--", productSale: 32, orderAmount: 30 },
    { sellerName: "B", shopName: "--", productSale: 32, orderAmount: 30 },
    { sellerName: "A", shopName: "--", productSale: 32, orderAmount: 30 },
  ];

  const columns = [
    {
      header: "Seller Name",
      accessor: (item) => item.sellerName,
    },
    {
      header: "Shop Name",
      accessor: (item) => item.shopName,
    },
    {
      header: "Number of Product Sale",
      accessor: (item) => item.productSale,
    },
    {
      header: "Order Amount",
      accessor: (item) => item.orderAmount,
    },
  ];

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <h1 className="text-xl font-bold text-gray-800 m-5">
        Seller Based Selling Report
      </h1>
      <div className="bg-white p-3 shadow-lg rounded-lg mb-6 mx-4 md:mx-10 lg:mx-20 xl:mx-40">
        <div className="flex flex-col mb-3 md:flex-row md:items-center border-b">
          <h1 className="text-base text-gray-800 m-5">Sort by verification status:</h1>
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
            <div className="flex">
              <button className="px-6 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600">
                Filter
              </button>
            </div>
          </div>
        </div>

        <ProductTable
          columns={columns}
          data={sellerProductSales}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
}

export default SellerProductSale;
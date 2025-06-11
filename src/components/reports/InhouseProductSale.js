import React, { useState } from "react";
import Dropdown from "../Dropdown";
import ProductTable from "./ProductTable";

function InhouseProductSale() {
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
      label: selectedOption || "Choose a category",
      options: ["Mark as Delivered", "Mark as Pending", "Delete Selected"],
    },
  };

  const inhouseProductSales = [
    { id: 1, name: "Disney Men's Mickey and Friends Button Down Shirt", sales: 32 },
    { id: 2, name: "Women's Plain Dress One Piece for Girls", sales: 29 },
    { id: 3, name: "Like Dreams Large Sherpa Tote Bag, Inner Pocket Vegan Leather, Large Tote Hand bags for Women", sales: 26 },
    { id: 4, name: "Insight Cosmetics 3D Highlighter", sales: 21 },
    { id: 5, name: "Nescafé Clasico, Dark Roast Instant Coffee Jar, 10.5 oz", sales: 15 },
    { id: 6, name: "Microsoft - Xbox Series X 1TB Console", sales: 11 },
    // Add more products as needed
  ];

  // Define table columns
  const columns = [
    {
      header: "#",
      accessor: (_, index) => index + 1,
    },
    {
      header: "Product Name",
      accessor: (item) => item.name,
    },
    {
      header: "Num of Sale",
      accessor: (item) => item.sales,
    },
  ];

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <h1 className="text-xl font-bold text-gray-800 m-5">
        Inhouse Product Sale Report
      </h1>
      <div className="bg-white p-3 shadow-lg rounded-lg mb-6 mx-4 md:mx-10 lg:mx-20 xl:mx-40">
        <div className="flex flex-col mb-3 md:flex-row md:items-center border-b">
          <h1 className="text-base text-gray-800 m-5">Sort by category:</h1>
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
                  data={inhouseProductSales}
                  currentPage={currentPage}
                  itemsPerPage={itemsPerPage}
                  onPageChange={handlePageChange}
                />

      
      </div>
    </>
  );
}

export default InhouseProductSale;
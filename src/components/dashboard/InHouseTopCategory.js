import React, { useState } from "react";
import FilterButton from "./FilterButton";
const filterOptions = ["All", "Today", "Week", "Month"];


const InHouseTopCategory = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const categories = [
    { name: "Cellphones & Tabs", sales: "$1,494.000", image: "/images/category/cellphone.webp" },
    { name: "Men Clothing", sales: "$530.000", image: "/images/category/menclothing.webp" },
    { name: "Computer & Accessories", sales: "$400.000", image: "/images/category/computer.webp" },
    { name: "Jewelry & Watches", sales: "$380.000", image: "/images/category/jewellery.webp" },
    { name: "Cellphones & Tabs", sales: "$1,494.000", image: "/images/category/cellphone.webp" },
    { name: "Men Clothing", sales: "$530.000", image: "/images/category/menclothing.webp" },
    { name: "Computer & Accessories", sales: "$400.000", image: "/images/category/computer.webp" },
    { name: "Jewelry & Watches", sales: "$380.000", image: "/images/category/jewellery.webp" },
  ];

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      {/* Section Header */}
      <h2 className="text-xl font-semibold text-blue-600 py-3">In-house Top Category</h2>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 my-2">
        {filterOptions.map((option) => (
          <FilterButton
            key={option}
            option={option}
            activeFilter={activeFilter}
            onClick={setActiveFilter}
          />
        ))}
      </div>

      {/* Category List */}
      <ul className="mt-4 py-3 space-y-2">
        {categories.slice(0, 5).map((category, index) => (
          <li key={index} className="flex justify-between items-center py-3 border-b">
            {/* Category Info */}
            <div className="flex items-center">
              <img
                src={category.image}
                alt={category.name}
                className="w-10 h-10 mr-3 rounded-lg"
              />
              <span className="text-gray-700 font-medium">{category.name}</span>
            </div>

            {/* Sales Info */}
            <span className="text-red-500 font-semibold">{category.sales}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InHouseTopCategory;
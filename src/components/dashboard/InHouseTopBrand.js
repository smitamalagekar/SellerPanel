import React, { useState } from "react";
import FilterButton from "./FilterButton";
const filterOptions = ["All", "Today", "Week", "Month"];

const InHouseTopBrand = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const brands = [
    { name: "Samsung", sales: "$1,993.000", image: "/images/brand/samsung.webp" },
    { name: "Polo", sales: "$496.550", image: "/images/brand/polo.webp" },
    { name: "Dell", sales: "$448.450", image: "/images/brand/dell.webp" },
    { name: "Rolex", sales: "$380.000", image: "/images/brand/rolex.webp" },
    { name: "Flormar", sales: "$235.200", image: "/images/brand/flormar.webp" },
  ];

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      {/* Section Header */}
      <h2 className="text-xl font-semibold text-red-600 py-3">In-house Top Brands</h2>

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

      {/* Brand List */}
      <ul className="mt-4 py-3 space-y-2">
        {brands.slice(0, 5).map((brand, index) => (
          <li key={index} className="flex justify-between items-center py-3 border-b">
            {/* Brand Info */}
            <div className="flex items-center">
              <img
                src={brand.image}
                alt={brand.name}
                className="w-10 h-10 mr-3 rounded-lg"
              />
              <span className="text-gray-700 font-medium">{brand.name}</span>
            </div>

            {/* Sales Info */}
            <span className="text-red-500 font-semibold">{brand.sales}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InHouseTopBrand;
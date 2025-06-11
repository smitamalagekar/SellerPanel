import React, { useState } from "react";
import FilterButton from "./FilterButton";
import ProductItem from "./ProductItem";

const filterOptions = ["All", "Today", "Week", "Month"];

const TopSellersAndProducts = () => {
  const [activeSellerFilter, setActiveSellerFilter] = useState("All");
  const [selectedSeller, setSelectedSeller] = useState(null);

  const topSellers = [
    {
      name: "Filon Asset",
      image: "/images/seller/filon.webp",
      products: [
        {
          name: "Lenovo V30a Business All-in-One Desktop",
          price: "$1,158.000",
          image: "/images/products/lenovo.webp",
        },
        {
          name: "Acer Nitro 50 N50-620-UA91 Gaming Desktop",
          price: "$559.990",
          image: "/images/products/acer.webp",
        },
        {
          name: "Xbox Wireless Headset",
          price: "$339.160",
          image: "/images/products/xbox.webp",
        },
      ],
    },
    {
      name: "LOUIS VUITTON",
      image: "/images/seller/lv.webp",
      products: [
        {
          name: "Xbox Wireless Headset",
          price: "$339.160",
          image: "/images/products/xbox.webp",
        },
      ],
    },
    {
      name: "PHILIPS",
      image: "/images/seller/philips.webp",
      products: [],
    },
    {
      name: "Adidas",
      image: "/images/seller/adidas.webp",
      products: [],
    },
    {
      name: "Pink Horizon",
      image: "/images/seller/pinkhorizon.webp",
      products: [],
    },
    {
      name: "Nike",
      image: "/images/seller/nike.webp",
      products: [],
    },
  ];

  const handleSellerClick = (seller) => {
    setSelectedSeller(seller);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm overflow-y-auto">
      <h2 className="text-lg font-semibold text-gray-800 py-2">Top Seller & Products</h2>
      <div className="text-gray-500 text-sm mb-2">By Sales</div>
      <div className="flex flex-wrap gap-2 my-2">
        {filterOptions.map((option) => (
          <FilterButton
            key={option}
            option={option}
            activeFilter={activeSellerFilter}
            onClick={setActiveSellerFilter}
          />
        ))}
      </div>
      <div className="flex gap-4 overflow-x-auto py-2">
        {topSellers.slice(0, 5).map((seller, index) => (
          <div
            key={index}
            className={`flex flex-col items-center cursor-pointer ${
              selectedSeller === seller ? "border border-yellow-400" : ""
            }`}
            onClick={() => handleSellerClick(seller)}
          >
            <img
              src={seller.image}
              alt={seller.name}
              className="w-12 h-12 rounded-lg mb-2"
            />
            <span className="text-gray-700 font-medium text-center">{seller.name}</span>
          </div>
        ))}
      </div>

      {selectedSeller && (
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <div className="text-gray-500 text-sm">Item</div>
            <div className="text-gray-500 text-sm">Total Price</div>
          </div>
          <ul className="space-y-2 max-h-60 overflow-y-auto">
            {selectedSeller.products.slice(0, 3).map((product, index) => (
              <ProductItem key={index} product={product} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TopSellersAndProducts;
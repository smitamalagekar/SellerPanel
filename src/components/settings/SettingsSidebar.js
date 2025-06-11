import React from "react";
import { Link } from "react-router-dom";

const SettingsSidebar = () => {
  const menuItems = [
    { label: "Home Slider", path: "/settings/home-slider" },
    { label: "Todays Deal", path: "/settings/todays-deal" },
    { label: "Banner Level 1", path: "/settings/banner-level-1" },
    { label: "Preorder Banner 1", path: "/settings/preorder-banner-1" },
    { label: "Banner Level 2", path: "/settings/banner-level-2" },
    { label: "Banner Level 3", path: "/settings/banner-level-3" },
    { label: "Auction Products", path: "/settings/auction-products" },
    { label: "Category Wise Products", path: "/settings/category-wise-products" },
    { label: "Classifieds", path: "/settings/classifieds" },
    { label: "Newest Preorder Products", path: "/settings/newest-preorder-products" },
    { label: "Top Brands", path: "/settings/top-brands" },
  ];

  return (
    <div>
      {/* Sidebar for larger screens */}
      <div className="hidden absolute md:block w-60 bg-[#f5f6fa] text-black">
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-6">Settings</h2>
        </div>
        <nav className="space-y-2">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="block px-3 py-2 text-sm hover:bg-sky-100 rounded-md"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Topbar for mobile screens */}
      <div className="md:hidden bg-gray-800 text-white p-4">
        <h2 className="text-xl font-semibold mb-4">Settings</h2>
        <nav className="flex flex-wrap">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="m-1 px-3 py-2 text-sm bg-gray-700 rounded-md hover:bg-gray-600"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default SettingsSidebar;
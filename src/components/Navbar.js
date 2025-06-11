// "use client";
// import { Bell, Menu, Plus, User } from "lucide-react";
// import { Link } from "react-router-dom";
// import { useState } from "react";
// import { useAdminContext } from "../adminContext";

// // Reusable Dropdown Component
// const Dropdown = ({ isOpen, onClose, items, className }) => {
//   if (!isOpen) return null;

//   return (
//     <div
//       className={`absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10 ${className}`}
//     >
//       {items.map((item, index) => (
//         <Link
//           key={index}
//           to={item.path}
//           className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
//           onClick={onClose}
//         >
//           {item.label}
//         </Link>
//       ))}
//     </div>
//   );
// };

// // Reusable Tab Component
// const Tab = ({ tab, activeTab, setActiveTab }) => {
//   const isActive = activeTab === tab.name;

//   return (
//     <Link
//       to={tab.path}
//       className={`flex items-center h-full px-5 font-bold cursor-pointer text-[#6c7293] relative transition-colors duration-150 ${
//         isActive
//           ? "text-slate-900 font-medium after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-slate-900"
//           : "hover:text-slate-700"
//       }`}
//       onClick={() => setActiveTab(tab.name)}
//     >
//       {tab.name}
//     </Link>
//   );
// };

// function Navbar({ activeTab, setActiveTab, toggleSidebar }) {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

//   const { admin, adminData } = useAdminContext();

//   const tabs = [
//     { name: "Dashboard", path: "/" },
//     { name: "Orders", path: "/orders" },
//     { name: "Preorders", path: "/preorders" },
//     { name: "Earnings", path: "/earnings" },
//     { name: "Settings", path: "/settings" },
//   ];

//   const dropdownItems = [
//     { label: "+ New Product", path: "/new-product" },
//     { label: "+ New Category", path: "/new-category" },
//     { label: "+ New Brand", path: "/new-brand" },
//   ];

//   const userDropdownItems = [
//     { label: "Profile", path: "/profile" },
//     { label: "Logout", path: "/logout" },
//   ];

//   const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
//   const toggleUserDropdown = () => setIsUserDropdownOpen((prev) => !prev);

//   return (
//     <div className="flex justify-between items-center px-5 h-[60px] bg-white border-b border-slate-100">
//       {/* Sidebar Toggle Button */}
//       <button
//         onClick={toggleSidebar}
//         className="text-gray-400 hover:text-gray-600"
//         aria-label="Toggle Sidebar"
//       >
//         <Menu size={24} />
//       </button>

//       {/* Tabs */}
//       <div className="hidden lg:flex h-full">
//         {tabs.map((tab) => (
//           <Tab
//             key={tab.name}
//             tab={tab}
//             activeTab={activeTab}
//             setActiveTab={setActiveTab}
//           />
//         ))}
//       </div>

//       {/* Right Side Actions */}
//       <div className="flex items-center gap-4 relative">
//         {/* Add New Dropdown */}
//         <div className="relative">
//           <button
//             className="hidden lg:flex items-center gap-1.5 bg-slate-500 text-white rounded-md py-2 px-3.5 cursor-pointer hover:bg-slate-800 transition-colors duration-150"
//             aria-label="Add New Item"
//             onClick={toggleDropdown}
//           >
//             <Plus size={16} />
//             <span>Add New</span>
//           </button>
//           <Dropdown
//             isOpen={isDropdownOpen}
//             onClose={() => setIsDropdownOpen(false)}
//             items={dropdownItems}
//           />
//         </div>

//         {/* Notifications */}
//         <div
//           className="hidden lg:flex text-[#6c7293] cursor-pointer hover:text-slate-700 transition-colors duration-150"
//           aria-label="Notifications"
//         >
//           <Bell size={20} />
//         </div>

//         {/* User Profile and Dropdown */}
//         <div className="flex items-center gap-2.5">
//           <div className="text-right">
//             <div className="font-medium">
//               {admin ? adminData.firstName : "Login"}
//             </div>
//             <div className="text-[#6c7293] text-xs">admin</div>
//           </div>
//           <div className="relative">
//             <button
//               className="w-9 h-9 rounded-full overflow-hidden"
//               onClick={toggleUserDropdown}
//               aria-label="User Menu"
//             >
//               <User
//                 src="../avatar.png"
//                 alt="User"
//                 className="w-full h-full object-cover"
//               />
//             </button>
//             <Dropdown
//               isOpen={isUserDropdownOpen}
//               onClose={() => setIsUserDropdownOpen(false)}
//               items={userDropdownItems}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Navbar;


"use client";
import { Bell, Menu, Plus, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAdminContext } from "../adminContext";

// Reusable Dropdown Component
const Dropdown = ({ isOpen, onClose, items, className }) => {
  if (!isOpen) return null;

  return (
    <div
      className={`absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10 ${className}`}
    >
      {items.map((item, index) => (
        <Link
          key={index}
          to={item.path}
          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          onClick={onClose}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
};

//  Updated Tab Component with Modern Hover + Click Animation
//  Tab Component with Gradient Hover + Active Style
const Tab = ({ tab, activeTab, setActiveTab }) => {
  const isActive = activeTab === tab.name;

  return (
    <Link
      to={tab.path}
      className={`group relative flex items-center h-full px-5 font-semibold cursor-pointer transition-all duration-300 ease-in-out rounded-md
        ${isActive
          ? "text-slate-900 bg-gradient-to-r from-purple-200 via-pink-100 to-red-100 shadow"
          : "text-[#6c7293] hover:text-slate-800 hover:bg-gradient-to-r from-purple-200 via-pink-100 to-red-100"}
      `}
      onClick={() => setActiveTab(tab.name)}
    >
      <span className="relative z-10">{tab.name}</span>

      {/* Underline Animation */}
      <div
        className={`absolute bottom-0 left-0 h-[3px] bg-slate-900 rounded-full transition-all duration-300 ${
          isActive
            ? "w-full"
            : "w-0 group-hover:w-full group-hover:bg-slate-400"
        }`}
      ></div>
    </Link>
  );
};


function Navbar({ activeTab, setActiveTab, toggleSidebar }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const { admin, adminData } = useAdminContext();

  const tabs = [
    { name: "Dashboard", path: "/" },
    { name: "Orders", path: "/orders" },
    { name: "Preorders", path: "/preorders" },
    { name: "Earnings", path: "/earnings" },
    { name: "Settings", path: "/settings" },
  ];

  const dropdownItems = [
    { label: "+ New Product", path: "/new-product" },
    { label: "+ New Category", path: "/new-category" },
    { label: "+ New Brand", path: "/new-brand" },
  ];

  const userDropdownItems = [
    { label: "Profile", path: "/profile" },
    { label: "Logout", path: "/logout" },
  ];

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const toggleUserDropdown = () => setIsUserDropdownOpen((prev) => !prev);

  return (
    <div className="flex justify-between items-center px-5 h-[60px] bg-white border-b border-slate-100">
      {/* Sidebar Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="text-gray-400 hover:text-gray-600"
        aria-label="Toggle Sidebar"
      >
        <Menu size={24} />
      </button>

      {/* Tabs with gap between each item */}
      <div className="hidden lg:flex h-full space-x-5"> {/* Added space-x-5 to give gap */}
        {tabs.map((tab) => (
          <Tab
            key={tab.name}
            tab={tab}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        ))}
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-4 relative">
        {/* Add New Dropdown */}
        <div className="relative">
          <button
            className="hidden lg:flex items-center gap-1.5 bg-slate-500 text-white rounded-md py-2 px-3.5 cursor-pointer hover:bg-slate-800 transition-colors duration-150"
            aria-label="Add New Item"
            onClick={toggleDropdown}
          >
            <Plus size={16} />
            <span>Add New</span>
          </button>
          <Dropdown
            isOpen={isDropdownOpen}
            onClose={() => setIsDropdownOpen(false)}
            items={dropdownItems}
          />
        </div>

        {/* Notifications */}
        <div
          className="hidden lg:flex text-[#6c7293] cursor-pointer hover:text-slate-700 transition-colors duration-150"
          aria-label="Notifications"
        >
          <Bell size={20} />
        </div>

        {/* User Profile and Dropdown */}
        <div className="flex items-center gap-2.5">
          <div className="text-right">
            <div className="font-medium">
              {admin ? adminData.firstName : "Login"}
            </div>
            <div className="text-[#6c7293] text-xs">admin</div>
          </div>
          <div className="relative">
            <button
              className="w-9 h-9 rounded-full overflow-hidden"
              onClick={toggleUserDropdown}
              aria-label="User Menu"
            >
              <User
                src="../avatar.png"
                alt="User"
                className="w-full h-full object-cover"
              />
            </button>
            <Dropdown
              isOpen={isUserDropdownOpen}
              onClose={() => setIsUserDropdownOpen(false)}
              items={userDropdownItems}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

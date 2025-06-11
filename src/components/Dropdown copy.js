import { FaChevronDown } from 'react-icons/fa';

const Dropdown = ({ label, options, isOpen, onToggle, onSelect =()=>{}}) => (
  <div className="relative">
    <button
      onClick={onToggle}
      className="px-4 py-2 bg-white border rounded-md text-gray-700 flex items-center gap-2 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {label}
      <FaChevronDown className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
    </button>
    {isOpen && (
      <div className="absolute z-10 mt-2 w-48 bg-white rounded-md shadow-lg border">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => onSelect(option)}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 first:rounded-t-md last:rounded-b-md"
          >
            {option}
          </button>
        ))}
      </div>
    )}
  </div>
);

export default Dropdown;


// "use client";
// import { Bell, Menu } from "lucide-react";
// import { Link } from "react-router-dom";
// import { useState } from "react";
// import { useAdminContext } from "../adminContext";
// // import userAvatar from "./your-image-filename.png";

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
//         {/* ... (Your tabs if needed) */}
//       </div>

//       {/* Right Side Actions */}
//       <div className="flex items-center gap-4 relative">
//         {/* Add New Dropdown */}
//         <div className="relative">
//           <Dropdown
//             isOpen={isDropdownOpen}
//             onClose={() => setIsDropdownOpen(false)}
//             items={dropdownItems}
//           />
//         </div>

//         {/* Notifications */}
//         <div
//           className="hidden lg:flex text-[#6c7293] cursor-pointer hover:text-slate-700 transition-colors duration-150 mr-9"
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
//             <div className="text-[#6c7293] text-xs">seller</div>
//           </div>
//           <div className="relative">
//             <button
//               className="w-9 h-9 rounded-full overflow-hidden"
//               onClick={toggleUserDropdown}
//               aria-label="User Menu"
//             >
//               <img
//                 src="" // Use the imported image here
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
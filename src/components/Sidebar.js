


import React, { useState } from "react";
// import {
//   Search,
//   Clock,
//   FileText,
//   Package,
//   Users,
//   ChevronDown,
//   ChevronUp,
//   Circle,
//   House,
//   NotebookPen,
//   Files,
//   ShoppingCart,
//   BaggageClaim,
//   Gavel,
//   ListChecks,
//   Banknote,
//   ChevronsLeft,
//   Settings,
//   History,
// } from "lucide-react";
import {
  Search,
  Clock,
  FileText,
  Package,
 
  ChevronDown,
  ChevronUp,
  Circle,
  House,
  
  Files,
  
  BaggageClaim,
  
 
  Banknote,
  ChevronsLeft,
  Settings,
  History,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LiaMoneyBillWaveAltSolid, LiaComment, LiaAtomSolid } from "react-icons/lia";
import { BsQuestionCircle } from "react-icons/bs";
// import { MdOutlineQueryBuilder, MdSupport } from "react-icons/md";
// import { GiConversation } from "react-icons/gi";

const menuItems = [
  {
    name: "Dashboard", path: "/", icon: <House size={20} />, subItems: [],
  },
  {
    name: "Products",
    icon: <Package size={20} />,
    subItems: [
      { name: "Products", path: "/products/product" },
      { name: "Product Bulk import", path: "/products/bulk-import" },
      { name: "Category-Wise discount", path: "/products/category-discount" },
      { name: "Digital Products", path: "/products/digitalproducts" },
      { name: "Product Review", path: "/products/review" },
    ],
    path: "/products",
  },
  {
    name: "Preorder",
    icon: <Clock size={20} />,
    subItems: [
      { name: "Dashboard", path: "/preorder/dashboard" },
      { name: "Preorder product", path: "/preorder/product" },
      { name: "Add Preorder", path: "/preorder/addpreorder" },
      {
        name: "Order",
        subItems: [
          { name: "All Orders", path: "/preorder/all-orders" },
          { name: "Delayed Prepayment Orders", path: "/preorder/delayed-prepayment-orders" },
          { name: "Delayed Final Orders", path: "/preorder/delayed-final-orders" },
        ],
      },
      { name: "Preorder setting", path: "/preorder/setting" },
      { name: "Preorder Product Queries", path: "/preorder/queries" },
      { name: "Preorder Product Reviews", path: "/preorder/reviews" },
      { name: "PreOrder Commission History", path: "/preorder/preorder-commision" },
      { name: "Conversations", path: "/preorder/preorder-conversion" },
    ],
    path: "/preorder",
  },
  // {
  //   name: "Notes",
  //   icon: <NotebookPen size={20} />,
  //   subItems: [
  //     { name: "Add New Note", path: "/wholesale/addnote" },
  //     { name: "Note List", path: "/wholesale/list" },
  //   ],
  //   path: "/notes",
  // },
  {
    name: "Uploads Files", path: "/upload", icon: <Files size={20} />, subItems: [],
  },
  // {
  //   name: "Package",
  //   icon: <ShoppingCart size={20} />,
  //   subItems: [
  //     { name: "Packages", path: "/package/packages" },
  //     { name: "Purchase Packages", path: "/package/purchase" },
  //   ],
  //   path: "/package",
  // },
  {
    name: "Wholesale Products", path: "/wholesale", icon: <BaggageClaim size={20} />, subItems: [],
  },
  // {
  //   name: "Auction",
  //   icon: <Gavel size={20} />,
  //   subItems: [
  //     { name: "All Auction Products", path: "/auction/all" },
  //     { name: "Auction Product Orders", path: "/auction/auction" },
  //   ],
  //   path: "/auction",
  // },
  // {
  //   name: "POS System",
  //   icon: <ListChecks size={20} />,
  //   subItems: [
  //     { name: "POS manager", path: "/pos" },
  //     { name: "POS Configuration", path: "/pos/configuration" },
  //   ],
  //   path: "/pos",
  // },
  { name: "Orders", path: "/orders", icon: <Banknote size={20} />, subItems: [] },
  { name: "Received Refund Request", path: "/refund-request", icon: <ChevronsLeft size={20} />, subItems: [] },
  { name: "Shop Setting", path: "/shop", icon: <Settings size={20} />, subItems: [] },
  { name: "Payment History", path: "/payment", icon: <History size={20} />, subItems: [] },
  { name: "Money Withdraw", path: "/money", icon: <LiaMoneyBillWaveAltSolid size={20} />, subItems: [] },
  
  // { name: "Commision History", icon: <Users size={20} />, subItems: [], path: "/commisionhistory/commisionhistory" },
  // { name: "Product Queries", icon: <MdOutlineQueryBuilder size={20} />, subItems: [], path: "/query/query" },
  // { name: "Support Ticket", icon: <MdSupport size={20} />, subItems: [], path: "/Supportticket/supportticket" },
  // { name: "Conversation", icon: <GiConversation size={20} />, subItems: [], path: "/conversation/conversation" },
  { name: "Commission History", path: "/commissionhistory", icon: <FileText size={20} />, subItems: [] },
  { name: "Conversations", path: "/conversation", icon: <LiaComment size={20} />, subItems: [] },
  { name: "Product Queries", path: "/product-queries", icon: <BsQuestionCircle size={20} />, subItems: [] },
  { name: "Support Ticket", path: "/support-ticket", icon: <LiaAtomSolid size={20} />, subItems: [] },
  // { name: "Commision History", icon: <Users size={20} />, subItems: [], path: "/commisionhistory/commisionhistory" },
  // { name: "Product Queries", icon: <MdOutlineQueryBuilder size={20} />, subItems: [], path: "/query/query" },
  // { name: "Support Ticket", icon: <MdSupport size={20} />, subItems: [], path: "/Supportticket/supportticket" },
  // { name: "Conversation", icon: <GiConversation size={20} />, subItems: [], path: "/conversation/conversation" },
];



function Sidebar({ isSidebarVisible }) {
  const [openItems, setOpenItems] = useState({});
  const navigate = useNavigate();

  const toggleItem = (index) => {
    setOpenItems((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleItemClick = (path) => navigate(path);
  const handleSubItemClick = (path) => navigate(path);

  const renderSubItems = (subItems) => (
    <ul className="pl-6 py-2 space-y-1">
      {subItems.map((subItem, subIndex) => (
        <li
          key={subIndex}
          className="group flex flex-col text-[#2E294E] font-[400] items-start py-1 cursor-pointer transition duration-200 hover:bg-gradient-to-r from-purple-100 via-pink-100 to-red-100 hover:rounded-md px-3"
        >
          {subItem.subItems ? (
            <>
              <div
                className="flex items-center justify-between w-full cursor-pointer"
                onClick={() => toggleItem(subItem.name)}
              >
                <span>{subItem.name}</span>
                {openItems[subItem.name] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </div>
              {openItems[subItem.name] && (
                <ul className="flex flex-col ml-3 border-l border-gray-200 pl-2">
                  {renderSubItems(subItem.subItems)}
                </ul>
              )}
            </>
          ) : (
            <span
              onClick={() => handleSubItemClick(subItem.path)}
              className="flex items-center gap-2 group-hover:text-[#4a148c] transition"
            >
              <Circle
                size={8}
                strokeWidth={3.5}
                className="text-[#2E294E] font-bold group-hover:scale-125 transition-transform"
              />
              {subItem.name}
            </span>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className={`${isSidebarVisible ? "w-[280px]" : "w-[70px]"} bg-[#F9F9FF] text-[#1B1B28] shadow-md flex flex-col overflow-y-auto py-5 transition-all duration-300 border-r border-gray-200`}
    >
      {isSidebarVisible && (
        <>
          <div className="flex items-center px-5 mb-5">
            <div className="flex flex-row leading-5 text-xl font-semibold text-[#4a148c]">
              <span>Seller</span>
              <span className="ml-1 text-[#1B1B28]">Panel</span>
            </div>
          </div>
          <div className="relative px-5 mb-5">
            <input
              type="text"
              placeholder="Search in menu"
              className="w-full bg-[#fff] border border-gray-300 rounded-md py-2.5 px-3.5 pr-10 text-[#898B92] placeholder-[#6c7293] focus:outline-none focus:ring-2 focus:ring-[#7e57c2]"
            />
            <Search
              size={18}
              className="absolute right-14 lg:right-7 top-1/2 transform -translate-y-1/2 text-[#6c7293]"
            />
          </div>
        </>
      )}

      <div className="flex flex-col">
        {menuItems.map((item, index) => (
          <div key={index} className="flex flex-col">
            <div
              className="flex items-center justify-between font-[500] py-2.5 px-5 cursor-pointer transition duration-200 hover:bg-gradient-to-r from-purple-200 via-pink-100 to-red-100 hover:text-[#4a148c] rounded-md"
              onClick={() => item.subItems.length ? toggleItem(item.name) : handleItemClick(item.path)}
            >
              <div className="flex items-center gap-3">
                <span className="transition-transform group-hover:scale-110">{item.icon}</span>
                {isSidebarVisible && <span>{item.name}</span>}
              </div>
              {isSidebarVisible && item.subItems.length > 0 && (
                openItems[item.name] ? <ChevronUp size={18} /> : <ChevronDown size={18} />
              )}
            </div>
            {isSidebarVisible && openItems[item.name] && renderSubItems(item.subItems)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;



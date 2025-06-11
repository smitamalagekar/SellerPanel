import React, { useState, useEffect } from "react";
import "./CategoryBased.css";
// import { GiLargeDress, GiClothes } from "react-icons/gi";
// import { FaTools } from "react-icons/fa";
import { useCategoryContext } from "../../categoryContext"; // Adjust import path as needed
// import api from "../../utils/axios"
// import apiInstance from "../../utils/axios";
import axios from "axios";
import Switch from "../../components/Switch";
// import { FaPlus, FaMinus } from "react-icons/fa"; // Import plus and minus icons



const CategoryDiscountTable = () => {
  const { categoryData, setCategoryData } = useCategoryContext();

  const [expandedRows, setExpandedRows] = useState({});
  const changeDiscount = (id, e) => {
    setCategoryData(prevData =>
      prevData.map(category =>
        category._id === id
          ? { ...category, discount: e.target.value }
          : category
      )
    );
  };


  // *** Add useEffect to fetch data on component mount ***
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://e-commerce-backend-1-0.onrender.com/api/sellercategories/get-all-categories" // Adjust this API endpoint if needed
        );
        // Assuming your API returns an array of category objects
        setCategoryData(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        // Handle error, e.g., show an error message to the user
      }
    };

    fetchCategories();
  }, [setCategoryData]); // Empty dependency array means this effect runs once after the initial render






  const changeStartDate = (id, e) => {
    setCategoryData(prevData =>
      prevData.map(category =>
        category._id === id
          ? {
            ...category, discountDateRange: {
              ...category.discountDateRange,
              from: e.target.value
            }
          }
          : category
      )
    );
  }

  const changeEndDate = (id, e) => {
    setCategoryData(prevData =>
      prevData.map(category =>
        category._id === id
          ? {
            ...category, discountDateRange: {
              ...category.discountDateRange,
              to: e.target.value
            }
          }
          : category
      )
    );
  }

  const changeSellerData = (id, val) => {
    setCategoryData(prevData =>
      prevData.map(category =>
        category._id === id
          ? { ...category, sallerProduct: val }
          : category
      )
    );
  };
  // await api.put(`/sellercategories/category-based-discount/${id}`
  const handleSetDiscount = async (id) => {
    categoryData.map(async (c) => {
      if (c._id === id) {
        await axios.put(`https://e-commerce-backend-1-0.onrender.com/api/sellercategories/category-based-discount/${id}`, {
          discount: c.discount,
          discountDateRange: c.discountDateRange,
          sallerProduct: c.sallerProduct

        })
        alert("Category discount updated")
      }


    })
  }

  // Toggle row expansion
  const toggleRow = (id) => {
    setExpandedRows((prevExpandedRows) => ({
      ...prevExpandedRows,
      [id]: !prevExpandedRows[id],
    }));
  };

  return (
    // <div className="container-category">
    //   <h2 className="category-title">Set Category Wise Product Discount</h2>
    //   <div className="divider"></div>

    //   {
    //     categoryData.length > 0 ?
    //       <div className="search-bar">
    //         <h5>Category</h5>
    //         <input type="text" placeholder="Type name & Enter" />
    //       </div>
    //       : null
    //   }
    //   <div className="table-container">
    //     {
    //       categoryData.length > 0
    //         ? <table className="discount-table">
    //           <thead>
    //             <tr>
    //               <th>#</th>
    //               <th>Icon</th>
    //               <th>Name</th>
    //               <th>Parent Category</th>
    //               <th>Discount</th>
    //               <th>Discount Date Range</th>
    //               <th>Seller Products</th>
    //               <th className="action">Action</th>
    //             </tr>
    //           </thead>
    //           <tbody>


    //             {
    //               categoryData && categoryData.map((c, i) => (
    //                 <tr key={i + 1}>
    //                   <td>{i + 1} </td>
    //                   <td>
    //                     <img className="w-[1.5cm] " src={c.icon} alt="" />
    //                   </td>
    //                   <td>
    //                     {c.name}
    //                   </td>
    //                   <td>
    //                     {c.parentCategory}
    //                   </td>
    //                   <td>
    //                     <div className="discount-input-container">
    //                       <input
    //                         type="number"
    //                         min="0"
    //                         max="100"
    //                         value={c.discount}
    //                         // onChange={(e) => handleDiscountChange(category.id, e.target.value)}
    //                         onChange={(e) => { changeDiscount(c._id, e) }}
    //                         className="discount-input"
    //                       />
    //                     </div>
    //                   </td>
    //                   <td>
    //                     <div className="date-range-container">
    //                       <input
    //                         type="date"
    //                         value={
    //                           new Date(c.discountDateRange.from).toISOString().slice(0, 10)
    //                           || ""
    //                         }
    //                         // onChange={(e) => handleStartDateChange(category.id, e.target.value)}
    //                         onChange={(e) => { changeStartDate(c._id, e) }}
    //                         className="date-input"
    //                         placeholder="Start date"
    //                       />
    //                       <span className="date-range-separator">to</span>
    //                       <input
    //                         type="date"
    //                         value={
    //                           new Date(c.discountDateRange.to).toISOString().slice(0, 10)
    //                           || ""
    //                         }
    //                         // onChange={(e) => handleEndDateChange(category.id, e.target.value)}
    //                         onChange={(e) => { changeEndDate(c._id, e) }}
    //                         className="date-input"
    //                         placeholder="End date"
    //                       // min={discounts[category.id]?.startDate}
    //                       />
    //                     </div>
    //                   </td>
    //                   <td>
    //                     <label className="switch">
    //                       <input
    //                         type="checkbox"
    //                         checked={c.sallerProduct}
    //                         // onChange={() => handleToggle(category.id)}
    //                         onChange={() => {
    //                           changeSellerData(c._id, !c.sallerProduct)
    //                         }}
    //                       />
    //                       <span className="slider round"></span>
    //                     </label>
    //                   </td>
    //                   <td>
    //                     <button
    //                       className="set-button"
    //                       // onClick={() => handleSetDiscount(category.id)}

    //                       onClick={() => { handleSetDiscount(c._id) }}
    //                     >
    //                       Set
    //                     </button>
    //                   </td>

    //                 </tr>
    //               ))
    //             }

    //           </tbody>
    //         </table>
    //         : <div>
    //           <p className="p-[1cm] text-center " >
    //             No category to display!!
    //           </p>
    //         </div>
    //     }
    //   </div>
    // </div>


    <div className="container-category">
      <h2 className="category-title">Set Category Wise Product Discount</h2>
      <div className="divider"></div>

      {categoryData.length > 0 ? (
        // <div className="search-bar">
        //   <h5>Category</h5>
        //   <input type="text" placeholder="Type name & Enter" />
        // </div>
        <div className="search-bar">
          <h5>Category</h5>
          <input type="text" placeholder="Type name & Enter" className="category-search-input" />
        </div>
      ) : null}
      {/* <div className="table-container"> */}
      <div className="table-container p-[0px] m-[0px] border border-gray-300 rounded-lg">
        {categoryData.length > 0 ? (
          <table className="discount-table text-sm ">
            <thead>
              {/* Table headers for larger screens */}
              <tr className="hidden md:table-row">
                <th>#</th>
                <th>Icon</th>
                <th>Name</th>
                <th>Parent Category</th>
                <th>Discount</th>
                <th>Discount Date Range</th>
                <th>Seller Products</th>
                <th className="action">Action</th>
              </tr>
              {/* Table headers for smaller screens (only #, Icon, Name, Parent Category) */}
              <tr className="md:hidden">
                <th></th> {/* For the plus/minus icon */}
                <th>#</th>
                <th>Icon</th>
                <th>Name</th>
                <th>Parent Category</th>
              </tr>
            </thead>
            <tbody>
              {categoryData &&
                categoryData.map((c, i) => (
                  <React.Fragment key={i + 1}>
                    {/* Table row for larger screens */}
                    <tr className="hidden md:table-row">
                      <td>{i + 1}</td>
                      <td>
                        <img className="w-[1.5cm]" src={c.icon} alt="" />
                      </td>
                      <td>{c.name}</td>
                      <td>{c.parentCategory}</td>
                      <td>
                        <div className="discount-input-container">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={c.discount}
                            onChange={(e) => changeDiscount(c._id, e)}
                            className="discount-input"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="date-range-container">
                          <input
                            type="date"
                            value={
                              new Date(c.discountDateRange.from)
                                .toISOString()
                                .slice(0, 10) || ""
                            }
                            onChange={(e) => changeStartDate(c._id, e)}
                            className="date-input"
                            placeholder="Start date"
                          />
                          <span className="date-range-separator">to</span>
                          <input
                            type="date"
                            value={
                              new Date(c.discountDateRange.to)
                                .toISOString()
                                .slice(0, 10) || ""
                            }
                            onChange={(e) => changeEndDate(c._id, e)}
                            className="date-input"
                            placeholder="End date"
                          />
                        </div>
                      </td>
                      <td>
                        {/* <label className="switch">
                          <input
                            type="checkbox"
                            checked={c.sallerProduct}
                            onChange={() => {
                              changeSellerData(c._id, !c.sallerProduct);
                            }}
                          />
                          <span className="slider round"></span>
                        </label> */}
                        {/* <td>
                        
                        <Switch
                          enabled={c.sallerProduct}
                          onToggle={() => changeSellerData(c._id, !c.sallerProduct)}
                          className="text-center"
                        />
                      </td> */}
                        <td className="flex justify-center items-center h-full "> {/* यहाँ क्लासेस जोड़ी गई हैं */}
                          <Switch
                            enabled={c.sallerProduct}
                            onToggle={() => changeSellerData(c._id, !c.sallerProduct)}
                          />
                        </td>
                      </td>
                      <td>
                        <button
                          className="set-button"
                          onClick={() => handleSetDiscount(c._id)}
                        >
                          Set
                        </button>
                      </td>
                    </tr>

                    {/* Table row for smaller screens (collapsed by default) */}
                    <tr className="md:hidden">
                      <td>
                        <button
                          className="toggle-button"
                          onClick={() => toggleRow(c._id)}
                        >
                          {expandedRows[c._id] ? "-" : "+"}
                        </button>
                      </td>
                      <td>{i + 1}</td>
                      <td>
                        <img className="w-[1.5cm]" src={c.icon} alt="" />
                      </td>
                      <td>{c.name}</td>
                      <td>{c.parentCategory}</td>
                    </tr>
                    {/* Expanded content for smaller screens */}
                    {expandedRows[c._id] && (
                      <tr className="md:hidden ">
                        <td colSpan="8" className="p-4 bg-gray-50 rounded-b-md">
                          {/* Ensure grid stacks items vertically on small screens */}
                          <div className="grid grid-cols-1 gap-3 text-sm"> {/* Added grid-cols-1 */}
                            {/* Discount */}
                            <div>
                              <strong className="block text-gray-700 mb-1">Discount:</strong>
                              <input
                                type="number"
                                min="0"
                                max="100"
                                value={c.discount}
                                onChange={(e) => changeDiscount(c._id, e)}
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>

                            {/* Date Range - Apply the same flex/stacking here if not already handled by w-full */}
                            <div>
                              <strong className="block text-gray-700 mb-1">Discount Date Range:</strong>
                              <div className="flex gap-2 flex-col"> {/* Ensure date inputs stack even in expanded view */}
                                <input
                                  type="date"
                                  value={new Date(c.discountDateRange.from).toISOString().slice(0, 10)}
                                  onChange={(e) => changeStartDate(c._id, e)}
                                  className="w-full border border-gray-300 rounded px-3 py-2"
                                />
                                <input
                                  type="date"
                                  value={new Date(c.discountDateRange.to).toISOString().slice(0, 10)}
                                  onChange={(e) => changeEndDate(c._id, e)}
                                  className="w-full border border-gray-300 rounded px-3 py-2"
                                />
                              </div>
                            </div>

                            {/* Seller Product Toggle */}
                            <div className="flex items-center justify-between">
                              <strong className="text-gray-700">Seller Products:</strong>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  className="sr-only peer"
                                  checked={c.sallerProduct}
                                  onChange={() => changeSellerData(c._id, !c.sallerProduct)}
                                />
                                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-500 transition-all"></div>
                                <div className="absolute w-5 h-5 bg-white rounded-full left-1 top-0.5 peer-checked:translate-x-full transition-transform"></div>
                              </label>
                            </div>

                            {/* Set Button */}
                            <div className="pt-2">
                              <button
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-sm"
                                onClick={() => handleSetDiscount(c._id)}
                              >
                                Set
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
            </tbody>
          </table>
        ) : (
          <div>
            <p className="p-[1cm] text-center">No category to display!!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryDiscountTable;
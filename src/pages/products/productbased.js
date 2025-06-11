// import React, { useState } from "react";
// import "./CategoryBased.css";
// import { GiLargeDress, GiClothes } from "react-icons/gi";
// import { FaTools } from "react-icons/fa";
// import { useCategoryContext } from "../../categoryContext"; 
// import api from "../../utils/axios"



// const Productbased = () => {
//   const { categoryData, setCategoryData } = useCategoryContext();


//   const changeDiscount = (id, e) => {
//     setCategoryData(prevData =>
//       prevData.map(category =>
//         category._id === id
//           ? { ...category, discount: e.target.value }
//           : category
//       )
//     );
//   };

//   const changeStartDate = (id, e) => {
//     setCategoryData(prevData =>
//       prevData.map(category =>
//         category._id === id
//           ? {
//             ...category, discountDateRange: {
//               ...category.discountDateRange,
//               from: e.target.value
//             }
//           }
//           : category
//       )
//     );
//   }

//   const changeEndDate = (id, e) => {
//     setCategoryData(prevData =>
//       prevData.map(category =>
//         category._id === id
//           ? {
//             ...category, discountDateRange: {
//               ...category.discountDateRange,
//               to: e.target.value
//             }
//           }
//           : category
//       )
//     );
//   }

//   const changeSellerData = (id, val) => {
//     setCategoryData(prevData =>
//       prevData.map(category =>
//         category._id === id
//           ? { ...category, sallerProduct: val }
//           : category
//       )
//     );
//   };

//   const handleSetDiscount = async (id) => {
//     categoryData.map(async (c) => {
//       if (c._id == id) {
//         await api.put(`categories/category-based-discount/${id}`, {
//           discount: c.discount,
//           discountDateRange: c.discountDateRange,
//           sallerProduct: c.sallerProduct

//         })
//         alert("Category discount updated")
//       }


//     })
//   }




//   return (
//     <div className="container-category">
//       <h2 className="category-title">Set Product Wise Discount</h2>
//       <div className="divider"></div>

//       {
//         categoryData.length > 0 ?
//           <div className="search-bar">
//             <h5>Product</h5>
//             <input type="text" placeholder="Type name & Enter" />
//           </div>
//           : null
//       }
//       <div className="table-container">
//         {
//           categoryData.length > 0
//             ? <table className="discount-table">
//               <thead>
//                 <tr>
//                   <th>#</th>
//                   <th>Icon</th>
//                   <th>Name</th>
//                   <th>Parent Category</th>
//                   <th>Discount</th>
//                   <th>Discount Date Range</th>
//                   <th>Seller Products</th>
//                   <th className="action">Action</th>
//                 </tr>
//               </thead>
//               <tbody>


//                 {
//                   categoryData && categoryData.map((c, i) => (
//                     <tr key={i + 1}>
//                       <td>{i + 1} </td>
//                       <td>
//                         <img className="w-[1.5cm] " src={c.icon} alt="" />
//                       </td>
//                       <td>
//                         {c.name}
//                       </td>
//                       <td>
//                         {c.parentCategory}
//                       </td>
//                       <td>
//                         <div className="discount-input-container">
//                           <input
//                             type="number"
//                             min="0"
//                             max="100"
//                             value={c.discount}
//                             // onChange={(e) => handleDiscountChange(category.id, e.target.value)}
//                             onChange={(e) => { changeDiscount(c._id, e) }}
//                             className="discount-input"
//                           />
//                         </div>
//                       </td>
//                       <td>
//                         <div className="date-range-container">
//                           <input
//                             type="date"
//                             value={
//                               new Date(c.discountDateRange.from).toISOString().slice(0, 10)
//                               || ""
//                             }
//                             // onChange={(e) => handleStartDateChange(category.id, e.target.value)}
//                             onChange={(e) => { changeStartDate(c._id, e) }}
//                             className="date-input"
//                             placeholder="Start date"
//                           />
//                           <span className="date-range-separator">to</span>
//                           <input
//                             type="date"
//                             value={
//                               new Date(c.discountDateRange.to).toISOString().slice(0, 10)
//                               || ""
//                             }
//                             // onChange={(e) => handleEndDateChange(category.id, e.target.value)}
//                             onChange={(e) => { changeEndDate(c._id, e) }}
//                             className="date-input"
//                             placeholder="End date"
//                           // min={discounts[category.id]?.startDate}
//                           />
//                         </div>
//                       </td>
//                       <td>
//                         <label className="switch">
//                           <input
//                             type="checkbox"
//                             checked={c.sallerProduct}
//                             // onChange={() => handleToggle(category.id)}
//                             onChange={() => {
//                               changeSellerData(c._id, !c.sallerProduct)
//                             }}
//                           />
//                           <span className="slider round"></span>
//                         </label>
//                       </td>
//                       <td>
//                         <button
//                           className="set-button"
//                           // onClick={() => handleSetDiscount(category.id)}

//                           onClick={() => { handleSetDiscount(c._id) }}
//                         >
//                           Set
//                         </button>
//                       </td>

//                     </tr>
//                   ))
//                 }

//               </tbody>
//             </table>
//             : <div>
//               <p className="p-[1cm] text-center " >
//                 No category to display!!
//               </p>
//             </div>
//         }
//       </div>
//     </div>
//   );
// };

// export default Productbased;



import React, { useState } from "react";
import "./CategoryBased.css";
import { useCategoryContext } from "../../categoryContext";
import api from "../../utils/axios";
import { FaPlus, FaMinus } from "react-icons/fa";

const Productbased = () => {
  const { categoryData, setCategoryData } = useCategoryContext();
  const [expandedRow, setExpandedRow] = useState(null);

  const changeDiscount = (id, e) => {
    setCategoryData((prevData) =>
      prevData.map((category) =>
        category._id === id
          ? { ...category, discount: e.target.value }
          : category
      )
    );
  };

  const changeStartDate = (id, e) => {
    setCategoryData((prevData) =>
      prevData.map((category) =>
        category._id === id
          ? {
            ...category,
            discountDateRange: {
              ...category.discountDateRange,
              from: e.target.value,
            },
          }
          : category
      )
    );
  };

  const changeEndDate = (id, e) => {
    setCategoryData((prevData) =>
      prevData.map((category) =>
        category._id === id
          ? {
            ...category,
            discountDateRange: {
              ...category.discountDateRange,
              to: e.target.value,
            },
          }
          : category
      )
    );
  };

  const changeSellerData = (id, val) => {
    setCategoryData((prevData) =>
      prevData.map((category) =>
        category._id === id ? { ...category, sallerProduct: val } : category
      )
    );
  };

  const handleSetDiscount = async (id) => {
    categoryData.map(async (c) => {
      if (c._id === id) {
        await api.put(`categories/category-based-discount/${id}`, {
          discount: c.discount,
          discountDateRange: c.discountDateRange,
          sallerProduct: c.sallerProduct,
        });
        alert("Category discount updated");
      }
    });
  };

  const toggleRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <div className="container-category">
      <h2 className="category-title">Set Product Wise Discount</h2>
      <div className="divider mt-2"></div>
      <div className="search-bar">
            <h5>Product</h5>
            <input type="text" placeholder="Type name & Enter" />
          </div>
      <div className="divider"></div>
      <div className="table-container">
        {categoryData.length > 0 ? (
          <table className="discount-table">
            <thead>
              <tr>
                <th className="hide-on-mobile">#</th>
                <th className="hide-on-mobile">Icon</th>
                <th>Name</th>
                <th className="hide-on-mobile">Parent Category</th>
                <th className="hide-on-mobile">Discount</th>
                <th className="hide-on-mobile">Discount Date Range</th>
                <th className="hide-on-mobile">Seller Products</th>
                <th className="hide-on-mobile action">Action</th>
              </tr>
            </thead>
            <tbody>
              {categoryData.map((c, i) => (
                <>
                  <tr key={i + 1}>
                    <td className="hide-on-mobile">{i + 1} </td>
                    <td onClick={() => toggleRow(c._id)} className="plus-icon">
                      {expandedRow === c._id ? <FaMinus /> : <FaPlus />}
                    </td>
                    <td className="hide-on-mobile">
                      <img className="w-[1.5cm]" src={c.icon} alt="" />
                    </td>
                    <td>{c.name}</td>
                    <td className="hide-on-mobile">{c.parentCategory}</td>
                    <td className="hide-on-mobile">
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
                    <td className="hide-on-mobile">
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
                        />
                      </div>
                    </td>
                    <td className="hide-on-mobile">
                      <label className="switch">
                        <input
                          type="checkbox"
                          checked={c.sallerProduct}
                          onChange={() => changeSellerData(c._id, !c.sallerProduct)}
                        />
                        <span className="slider round"></span>
                      </label>
                    </td>
                    <td className="hide-on-mobile">
                      <button
                        className="set-button"
                        onClick={() => handleSetDiscount(c._id)}
                      >
                        Set
                      </button>
                    </td>
                  </tr>
                  {/* {expandedRow === c._id && (
                    <tr className="expand-row">
                      <td colSpan="8">
                        <div className="expanded-content">
                          <div>
                            <strong>Parent Category:</strong> {c.parentCategory}
                          </div>
                          <div>
                            <strong>Discount:</strong> {c.discount}%
                          </div>
                          <div>
                            <strong>Discount Date Range:</strong> {c.discountDateRange.from} to {c.discountDateRange.to}
                          </div>
                          <div>
                            <strong>Seller Products:</strong> {c.sallerProduct ? "Enabled" : "Disabled"}
                          </div>
                          <button
                            className="set-button mt-2"
                            onClick={() => handleSetDiscount(c._id)}
                          >
                            Set Discount
                          </button>
                        </div>
                      </td>
                    </tr>
                  )} */}
                  {expandedRow === c._id && (
                    <tr className="expand-row">
                      <td colSpan="8">
                        <table className="nested-table">
                          <thead>
                            <tr>
                              <th>Parent Category</th>
                              <th>Discount</th>
                              <th>Discount Date Range</th>
                              <th>Seller Products</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{c.parentCategory}</td>
                              <td>{c.discount}%</td>
                              <td>
                                {c.discountDateRange.from} to {c.discountDateRange.to}
                              </td>
                              <td>{c.sallerProduct ? "Enabled" : "Disabled"}</td>
                              <td>
                                <button
                                  className="set-button"
                                  onClick={() => handleSetDiscount(c._id)}
                                >
                                  Set Discount
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  )}

                </>
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

export default Productbased;
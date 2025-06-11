import React, { useState } from "react";
import "./allProduct.css";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

const AllProduct = () => {
  const [products, setProducts] = useState([

    {
      id: 1,
      name: "Acer Nitro 50 N50-620 - UA91 Gaming Desktop",
      image:
        "https://m.media-amazon.com/images/I/71dJ4XcNWWL._AC_CR0%2C0%2C0%2C0_SX352_SY330_.jpg",
      addedBy: "Filon Asset Store",
      info: { sale: 16, price: "$559.990", rating: 5 },
      stock: "Low",
      deal: "true",
      published: true,
      featured: false,
    },
    {
      id: 2,
      name: "Lenovo V30a Business All-in-One Desktop",
      image: "https://m.media-amazon.com/images/I/61RfxRks6HL.jpg",
      addedBy: "Filon Asset Store",
      info: { sale: 9, price: "$579.000", rating: 5 },
      stock: "Low",
      deal: false,
      published: true,
      featured: true,
    },
    {
      id: 3,
      name: "Acer Chromebook Spin 314 Convertible Laptop",
      image:
        "https://m.media-amazon.com/images/I/71dJ4XcNWWL._AC_CR0%2C0%2C0%2C0_SX352_SY330_.jpg",
      addedBy: "Filon Asset Store",
      info: { sale: 10, price: "$309.990", rating: 5 },
      stock: "0 Low",
      deal: true,
      published: true,
      featured: false,
    },
    {
      id: 4,
      name: "StarTech.com USB 3.0 to Dual HDMI Adapter",
      image: "https://m.media-amazon.com/images/I/61RfxRks6HL.jpg",
      addedBy: "Filon Asset Store",
      info: { sale: 1, price: "$53.810", rating: 0 },
      stock: "99",
      deal: false,
      published: true,
      featured: true,
    },
    {
      id: 5,
      name: "StarTech.com USB 3.0 to Dual HDMI Adapter",
      image: "https://m.media-amazon.com/images/I/61RfxRks6HL.jpg",
      addedBy: "Filon Asset Store",
      info: { sale: 1, price: "$53.810", rating: 0 },
      stock: "99",
      deal: false,
      published: true,
      featured: true,
    },
    {
      id: 6,
      name: "StarTech.com USB 3.0 to Dual HDMI Adapter",
      image: "https://m.media-amazon.com/images/I/61RfxRks6HL.jpg",
      addedBy: "Filon Asset Store",
      info: { sale: 1, price: "$53.810", rating: 0 },
      stock: "99",
      deal: false,
      published: true,
      featured: true,
    },
    {
      id: 7,
      name: "StarTech.com USB 3.0 to Dual HDMI Adapter",
      image: "https://m.media-amazon.com/images/I/61RfxRks6HL.jpg",
      addedBy: "Filon Asset Store",
      info: { sale: 1, price: "$53.810", rating: 0 },
      stock: "99",
      deal: false,
      published: true,
      featured: true,
    },
    {
      id: 8,
      name: "StarTech.com USB 3.0 to Dual HDMI Adapter",
      image: "https://m.media-amazon.com/images/I/61RfxRks6HL.jpg",
      addedBy: "Filon Asset Store",
      info: { sale: 1, price: "$53.810", rating: 0 },
      stock: "99",
      deal: false,
      published: true,
      featured: true,
    },
  ]);
  const [sellers] = useState([
    "Mostafizar Rahman",
    "Thanh Quoc Phu ...",
    "ABC Fashion",
    "omran alzouabi",
    "Chaman",
  ]);

  const [expandedRow, setExpandedRow] = useState(null);

  const handleExpandRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const [selectedSeller, setSelectedSeller] = useState("All Sellers");
  const [isSellerDropdownOpen, setIsSellerDropdownOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Adjust as needed
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getPageNumbers = () => {
    const pages = [];
    const totalVisiblePages = 5; // Adjust as needed

    if (totalPages <= totalVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages, currentPage + 2);

      if (currentPage <= 3) {
        endPage = 5;
      }
      if (currentPage >= totalPages - 2) {
        startPage = totalPages - 4;
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (startPage > 1) {
        pages.unshift("...");
        pages.unshift(1);
      }
      if (endPage < totalPages) {
        pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  const handleToggleChange = (id, field) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, [field]: !product[field] } : product
      )
    );
  };

  const handleSortChange = (sortType) => {
    const sortedProducts = [...products];

    switch (sortType) {
      case "rating-high":
        sortedProducts.sort((a, b) => b.info.rating - a.info.rating);
        break;
      case "rating-low":
        sortedProducts.sort((a, b) => a.info.rating - b.info.rating);
        break;
      case "sale-high":
        sortedProducts.sort((a, b) => b.info.sale - a.info.sale);
        break;
      case "sale-low":
        sortedProducts.sort((a, b) => a.info.sale - b.info.sale);
        break;
      default:
        return;
    }

    setProducts(sortedProducts);
  };

  const toggleSellerDropdown = () => {
    setIsSellerDropdownOpen(!isSellerDropdownOpen);
  };

  const selectSeller = (seller) => {
    setSelectedSeller(seller);
    setIsSellerDropdownOpen(false);
  };

  return (
    <div className="product-container">
      <div className="header">
        <div>All Products</div>
        <button className="add-btn">Add New product</button>
      </div>
      <div className="filter-options">
        <select className="filter-dropdown">
          <option value="">Bulk Action</option>
          {/* ... (विकल्प) ... */}
        </select>
        {/* <select className="filter-dropdown">
                    <option value="">All Sellers</option>
                    
                </select> */}
        <div className="seller-dropdown">
          <div
            className="seller-dropdown-header"
            onClick={toggleSellerDropdown}
          >
            {selectedSeller}
            <span
              className={`arrow ${isSellerDropdownOpen ? "up" : "down"}`}
            ></span>
          </div>
          {isSellerDropdownOpen && (
            <div className="seller-dropdown-list">
              {sellers.map((seller) => (
                <div
                  key={seller}
                  className="seller-dropdown-item"
                  onClick={() => selectSeller(seller)}
                >
                  {seller}
                </div>
              ))}
            </div>
          )}
        </div>
        {/* <select className="filter-dropdown">
                    <option value="">Sort By</option>
                    
                </select> */}
        <select
          className="filter-dropdown"
          onChange={(e) => handleSortChange(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="rating-high">Rating (High - Low)</option>
          <option value="rating-low">Rating (Low - High)</option>
          <option value="sale-high">Num of Sale (High - Low)</option>
          <option value="sale-low">Num of Sale (Low - High)</option>
          <option value="sale-high">Num of Sale (High - Low)</option>
          <option value="sale-low">Num of Sale (Low - High)</option>
        </select>
        <input
          type="text"
          className="filter-input"
          placeholder="Type & Enter"
        />
      </div>
      <div className="product-table">
        <table>
          <thead>
            <tr>
              <th>
                <input type="checkbox" className="check25" />
              </th>
              <th>Name</th>
              <th>Added By</th>
              <th>Info</th>
              <th>Total Stock</th>
              <th>Today's Deal</th>
              <th>Published</th>
              <th>Featured</th>
              <th>Options</th>
            </tr>
          </thead>
          {/* <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>
                                    <input type="checkbox" />
                                </td>
                                <td className="product-name">
                                    <img src={product.image} alt={product.name} className="product-img" />
                                    <span>{product.name}</span>
                                </td>
                                <td>{product.addedBy}</td>
                                <td>
                                    <div>Num of Sale: {product.info.sale} times</div>
                                    <div>Base Price: {product.info.price}</div>
                                    <div>Rating: {product.info.rating}</div>
                                </td>
                                <td>{product.stock}</td>
                                
                                <td>
                                    <label className="switch">
                                        <input
                                            type="checkbox"
                                            checked={product.deal}
                                            onChange={() => handleToggleChange(product.id, "deal")}
                                        />
                                        <span className="slider"></span>
                                    </label>
                                </td>
                                <td>
                                    <label className="switch">
                                        <input
                                            type="checkbox"
                                            checked={product.published}
                                            onChange={() => handleToggleChange(product.id, "published")}
                                        />
                                        <span className="slider"></span>
                                    </label>
                                </td>
                                <td>
                                    <label className="switch">
                                        <input
                                            type="checkbox"
                                            checked={product.featured}
                                            onChange={() => handleToggleChange(product.id, "featured")}
                                        />
                                        <span className="slider"></span>
                                    </label>
                                </td>
                                <td>
                                    <button className="btn view-btn">
                                        <FaEye />
                                    </button>
                                    <button className="btn edit-btn">
                                        <FaEdit />
                                    </button>
                                    <button className="btn delete-btn">
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}


                    </tbody> */}
          <tbody>
            {products.map((product) => (
              <>
                {/* Main Row with Plus Icon */}
                <tr key={product.id}>
                  <td>
                    <div
                      className={`plus-icon ${product.expanded ? "rotate" : ""
                        }`}
                      onClick={() =>
                        setProducts((prevProducts) =>
                          prevProducts.map((p) =>
                            p.id === product.id
                              ? { ...p, expanded: !p.expanded }
                              : p
                          )
                        )
                      }
                    >
                      +
                    </div>
                  </td>

                  <td className="product-name">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="product-img"
                    />
                    <span>{product.name}</span>
                  </td>
                  <td className="hide-on-small">{product.addedBy}</td>
                  <td className="hide-on-small">
                    <div>Num of Sale: {product.info.sale} times</div>
                    <div>Base Price: {product.info.price}</div>
                    <div>Rating: {product.info.rating}</div>
                  </td>
                  <td className="hide-on-small">{product.stock}</td>
                  <td className="hide-on-small">
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={product.deal}
                        onChange={() => handleToggleChange(product.id, "deal")}
                      />
                      <span className="slider"></span>
                    </label>
                  </td>
                  <td className="hide-on-small">
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={product.published}
                        onChange={() =>
                          handleToggleChange(product.id, "published")
                        }
                      />
                      <span className="slider"></span>
                    </label>
                  </td>
                  <td className="hide-on-small">
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={product.featured}
                        onChange={() =>
                          handleToggleChange(product.id, "featured")
                        }
                      />
                      <span className="slider"></span>
                    </label>
                  </td>
                  <td className="hide-on-small ">
                    <button className="btn view-btn">
                      <FaEye />
                    </button>
                    <button className="btn edit-btn">
                      <FaEdit />
                    </button>
                    <button className="btn delete-btn">
                      <FaTrash />
                    </button>
                  </td>
                </tr>

                {/* Expanded Row for Small Screens */}
                {/* {product.expanded && (
        <tr className="row-details">
          <td colSpan="9">
            <div className="details-container">
              <div>Added By: {product.addedBy}</div>
              <div>
                Info: Sale {product.info.sale} times, Price {product.info.price}, Rating {product.info.rating}
              </div>
              <div>Total Stock: {product.stock}</div>
              <div>Today's Deal: {product.deal }</div>
              <div>Published: {product.published}</div>
              <div>Featured: {product.featured}</div>
            </div>
          </td>
        </tr>
      )} */}
                {product.expanded && (
                  <tr className="row-details mt-0">
                    <td colSpan="9">
                      <div className="details-container">
                        <div>Added By: {product.addedBy}</div>
                        <div>
                          Info: Sale {product.info.sale} times, Price{" "}
                          {product.info.price}, Rating {product.info.rating}
                        </div>
                        <div>Total Stock: {product.stock}</div>

                        <div>
                          Today's Deal:
                          <label className="switch">
                            <input
                              type="checkbox"
                              checked={product.deal}
                              onChange={() =>
                                handleToggleChange(product.id, "deal")
                              }
                            />
                            <span className="slider"></span>
                          </label>
                        </div>

                        <div>
                          Published:
                          <label className="switch">
                            <input
                              type="checkbox"
                              checked={product.published}
                              onChange={() =>
                                handleToggleChange(product.id, "published")
                              }
                            />
                            <span className="slider"></span>
                          </label>
                        </div>

                        <div>
                          Featured:
                          <label className="switch">
                            <input
                              type="checkbox"
                              checked={product.featured}
                              onChange={() =>
                                handleToggleChange(product.id, "featured")
                              }
                            />
                            <span className="slider"></span>
                          </label>
                        </div>

                        <div>
                          Options:
                          <button className="btn view-btn">
                            <FaEye />
                          </button>
                          <button className="btn edit-btn">
                            <FaEdit />
                          </button>
                          <button className="btn delete-btn">
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>

          <div className="pagination ">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="pagination-btn"
            >
              &lsaquo;
            </button>

            {getPageNumbers().map((page, index) => (
              <button
                key={index}
                onClick={() => typeof page === "number" && paginate(page)}
                className={`pagination-btn ${currentPage === page ? "active" : ""
                  } ${page === "..." ? "dots" : ""}`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="pagination-btn"
            >
              &rsaquo;
            </button>
          </div>
        </table>
      </div>
    </div>
  );
};

export default AllProduct;

// import React, { useState } from "react";
// import "./allProduct.css";
// import { FaEye, FaEdit, FaTrash, FaPlus } from "react-icons/fa";

// const AllProduct = () => {
//     const [products, setProducts] = useState([
//         {
//             id: 1,
//             name: "Acer Nitro 50 N50-620 - UA91 Gaming Desktop",
//             image: "https://m.media-amazon.com/images/I/71dJ4XcNWWL._AC_CR0%2C0%2C0%2C0_SX352_SY330_.jpg",
//             addedBy: "Filon Asset Store",
//             info: { sale: 16, price: "$559.990", rating: 5 },
//             stock: "Low",
//             deal: true,
//             published: true,
//             featured: false,
//         },
//         {
//             id: 2,
//             name: "Lenovo V30a Business All-in-One Desktop",
//             image: "https://m.media-amazon.com/images/I/61RfxRks6HL.jpg",
//             addedBy: "Filon Asset Store",
//             info: { sale: 9, price: "$579.000", rating: 5 },
//             stock: "Low",
//             deal: false,
//             published: true,
//             featured: true,
//         },
//     ]);

//     const [expandedRows, setExpandedRows] = useState({});

//     const toggleRowDetails = (id) => {
//         setExpandedRows((prev) => ({
//             ...prev,
//             [id]: !prev[id],
//         }));
//     };

//     const [currentPage, setCurrentPage] = useState(1);
//      const itemsPerPage = 5; // Adjust as needed
//     const totalPages = Math.ceil(products.length / itemsPerPage);

//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//          const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

//      const paginate = (pageNumber) => setCurrentPage(pageNumber);
//      const getPageNumbers = () => {
//         const pages = [];
//         const totalVisiblePages = 5; // Adjust as needed

//         if (totalPages <= totalVisiblePages) {
//              for (let i = 1; i <= totalPages; i++) {
//                  pages.push(i);
//              }
//          } else {
//              let startPage = Math.max(1, currentPage - 2);
//              let endPage = Math.min(totalPages, currentPage + 2);

//              if (currentPage <= 3) {
//                  endPage = 5;
//              }
//              if (currentPage >= totalPages - 2) {
//                  startPage = totalPages - 4;
//              }

//              for (let i = startPage; i <= endPage; i++) {
//                 pages.push(i);
//              }

//              if (startPage > 1) {
//                  pages.unshift("...");
//                  pages.unshift(1);
//             }
//              if (endPage < totalPages) {
//                  pages.push("...");
//                  pages.push(totalPages);
//              }
//          }
//          return pages;
//      };

//     return (
//         <div className="product-container">
//             <div className="header">
//                 <div>All Products</div>
//                 <button className="add-btn">Add New product</button>
//             </div>

//             <div className="product-table">
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>
//                                 <input type="checkbox" />
//                             </th>
//                             <th>Name</th>
//                             <th className="hide-on-small">Added By</th>
//                             <th className="hide-on-small">Info</th>
//                             <th className="hide-on-small">Total Stock</th>
//                             <th className="hide-on-small">Today's Deal</th>
//                             <th className="hide-on-small">Published</th>
//                             <th className="hide-on-small">Featured</th>
//                             <th className="hide-on-small">Options</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {products.map((product) => (
//                             <React.Fragment key={product.id}>
//                                 <tr>
//                                     <td>
//                                         <input type="checkbox" />
//                                     </td>
//                                     <td className="product-name">
//                                         <span
//                                             className={`plus-icon ${expandedRows[product.id] ? "rotate" : ""}`}
//                                             onClick={() => toggleRowDetails(product.id)}
//                                         >
//                                             <FaPlus />
//                                         </span>
//                                         <img src={product.image} alt={product.name} className="product-img" />
//                                         <span>{product.name}</span>
//                                     </td>

//                                     {/* Hide extra columns */}
//                                     <td className="hide-on-small">{product.addedBy}</td>
//                                     <td className="hide-on-small">
//                                         <div>Num of Sale: {product.info.sale} times</div>
//                                         <div>Base Price: {product.info.price}</div>
//                                         <div>Rating: {product.info.rating}</div>
//                                     </td>
//                                     <td className="hide-on-small">{product.stock}</td>
//                                     <td className="hide-on-small">
//                                         <input type="checkbox" checked={product.deal} readOnly />
//                                     </td>
//                                     <td className="hide-on-small">
//                                         <input type="checkbox" checked={product.published} readOnly />
//                                     </td>
//                                     <td className="hide-on-small">
//                                         <input type="checkbox" checked={product.featured} readOnly />
//                                     </td>
//                                     <td className="hide-on-small">
//                                         <button className="btn view-btn">
//                                             <FaEye />
//                                         </button>
//                                         <button className="btn edit-btn">
//                                             <FaEdit />
//                                         </button>
//                                         <button className="btn delete-btn">
//                                             <FaTrash />
//                                         </button>
//                                     </td>
//                                 </tr>

//                                 {/* Row Details for small screens */}
//                                 {expandedRows[product.id] && (
//                                     <tr className="row-details">
//                                         <td colSpan="9">
//                                             <div className="details-container">
//                                                 <div>
//                                                     <strong>Added By:</strong> {product.addedBy}
//                                                 </div>
//                                                 <div>
//                                                     <strong>Num of Sale:</strong> {product.info.sale}
//                                                 </div>
//                                                 <div>
//                                                     <strong>Base Price:</strong> {product.info.price}
//                                                 </div>
//                                                 <div>
//                                                     <strong>Total Stock:</strong> {product.stock}
//                                                 </div>
//                                                 <div>
//                                                     <strong>Today's Deal:</strong> {product.deal ? "Yes" : "No"}
//                                                 </div>
//                                                 <div>
//                                                     <strong>Published:</strong> {product.published ? "Yes" : "No"}
//                                                 </div>
//                                                 <div>
//                                                     <strong>Featured:</strong> {product.featured ? "Yes" : "No"}
//                                                 </div>
//                                             </div>
//                                         </td>
//                                     </tr>
//                                 )}
//                             </React.Fragment>
//                         ))}
//                     </tbody>
//                 </table><div className="pagination">
//                  <button
//                      onClick={() => paginate(currentPage - 1)}
//                      disabled={currentPage === 1}
//                      className="pagination-btn"
//                  >
//                      &lsaquo;
//                  </button>

//                  {getPageNumbers().map((page, index) => (
//                      <button
//                          key={index}
//                          onClick={() => typeof page === "number" && paginate(page)}
//                          className={`pagination-btn ${currentPage === page ? "active" : ""} ${page === "..." ? "dots" : ""}`}
//                      >
//                          {page}
//                      </button>
//                  ))}

//                  <button
//                      onClick={() => paginate(currentPage + 1)}
//                      disabled={currentPage === totalPages}
//                      className="pagination-btn"
//                  >
//                      &rsaquo;
//                  </button>
//              </div>

//             </div>
//         </div>
//     );
// };

// export default AllProduct;

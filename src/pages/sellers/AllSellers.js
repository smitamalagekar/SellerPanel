import React, { useState } from "react";
import "./AllSellers.css"; // Import CSS file
import { FaPlus, FaMinus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaEllipsisV } from "react-icons/fa";

const sellers = [
    {
        id: 1,
        name: "LOUIS VUITTON",
        image: "https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/qf8pEDFmjfjIDYYGXaKtJ90ilKQMC7F1rXk2vQJr.webp",
        phone: "123-456-7890",
        email: "seller11@example.com",
        verification: "Verified",
        approval: true,
        products: 4,
        due: "$120.000",
        emailVerification: "Verified",
        status: "Regular",
    },
    {
        id: 2,
        name: "Adidas",
        image: "https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/AcQrue0Rc4krp9i0LsDXW8FcZ6z4YYWXOdcJL908.webp",
        phone: "987-654-3210",
        email: "seller8@example.com",
        verification: "Verified",
        approval: false,
        products: 10,
        due: "$127.300",
        emailVerification: "Verified",
        status: "Regular",
    },
    {
        id: 3,
        name: "Adidas",
        image: "https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/AcQrue0Rc4krp9i0LsDXW8FcZ6z4YYWXOdcJL908.webp",
        phone: "987-654-3210",
        email: "seller8@example.com",
        verification: "Verified",
        approval: false,
        products: 10,
        due: "$127.300",
        emailVerification: "Verified",
        status: "Regular",
    },
    {
        id: 4,
        name: "Adidas",
        image: "https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/AcQrue0Rc4krp9i0LsDXW8FcZ6z4YYWXOdcJL908.webp",
        phone: "987-654-3210",
        email: "seller8@example.com",
        verification: "Verified",
        approval: false,
        products: 10,
        due: "$127.300",
        emailVerification: "Verified",
        status: "Regular",
    },
    {
        id: 5,
        name: "Adidas",
        image: "https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/AcQrue0Rc4krp9i0LsDXW8FcZ6z4YYWXOdcJL908.webp",
        phone: "987-654-3210",
        email: "seller8@example.com",
        verification: "Verified",
        approval: false,
        products: 10,
        due: "$127.300",
        emailVerification: "Verified",
        status: "Regular",
    },
    {
        id: 6,
        name: "Adidas",
        image: "https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/AcQrue0Rc4krp9i0LsDXW8FcZ6z4YYWXOdcJL908.webp",
        phone: "987-654-3210",
        email: "seller8@example.com",
        verification: "Verified",
        approval: false,
        products: 10,
        due: "$127.300",
        emailVerification: "Verified",
        status: "Regular",
    },
    {
        id: 7,
        name: "Adidas",
        image: "https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/AcQrue0Rc4krp9i0LsDXW8FcZ6z4YYWXOdcJL908.webp",
        phone: "987-654-3210",
        email: "seller8@example.com",
        verification: "Verified",
        approval: false,
        products: 10,
        due: "$127.300",
        emailVerification: "Verified",
        status: "Regular",
    },
    {
        id: 8,
        name: "Adidas",
        image: "https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/AcQrue0Rc4krp9i0LsDXW8FcZ6z4YYWXOdcJL908.webp",
        phone: "987-654-3210",
        email: "seller8@example.com",
        verification: "Verified",
        approval: false,
        products: 10,
        due: "$127.300",
        emailVerification: "Verified",
        status: "Regular",
    },
];

const AllSellers = () => {

    const [dropdownOpen, setDropdownOpen] = useState(null); // Track which dropdown is open

    const [expandedRows, setExpandedRows] = useState({});
     const navigate = useNavigate();
    const [approvals, setApprovals] = useState(
        sellers.reduce((acc, seller) => ({ ...acc, [seller.id]: seller.approval }), {})
    );

    const toggleRow = (id) => {
        setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const toggleApproval = (id) => {
        setApprovals((prev) => ({ ...prev, [id]: !prev[id] }));
    };
    const handlereview = (e) => {
        e.preventDefault();
        navigate("/sellers/create");
      };

      const toggleDropdown = (id) => {
        setDropdownOpen(dropdownOpen === id ? null : id); // Toggle dropdown
      };
    
    return (
        <div className="container4">
            {/* <div>
               
                <div className="header-container">
                    <h2 className="header-title">All Sellers</h2>
                    <button className="add-seller-btn">Add New Seller</button>
                </div>

                
                <div className="filters-container">
                    <select className="filter-dropdown">
                        <option>Bulk Action</option>
                        <option>Delete</option>
                    </select>
                    <select className="filter-dropdown">
                        <option>Filter by Verification</option>
                    </select>
                    <select className="filter-dropdown">
                        <option>Filter by Approval</option>
                    </select>
                    <input type="text" className="filter-input" placeholder="Type name or email & Enter" />
                </div>
            </div> */}
             <div>
                {/* हेडर और फ़िल्टर कंटेनर */}
                <div className="header-container">
        <h2 className="header-title">All Sellers</h2>
        <div className="header-right">
          <button className="add-seller-btn" onClick={handlereview}>Add New Seller</button>
        </div>
      </div>
      <div className="filters-container">
        <div className="filters-left">
          <span>Sellers</span>
          <select className="filter-dropdown">
            <option>Bulk Action</option>
            <option>Delete</option>
          </select>
        </div>
        <div className="filters-right">
          <select className="filter-dropdown">
            <option>Filter by Verification</option>
          </select>
          <select className="filter-dropdown">
            <option>Filter by Approval</option>
          </select>
          <input type="text" className="filter-input" placeholder="Type name or email & Enter" />
        </div>
      </div>
            </div>

            <table className="seller-table">
                <thead>
                    <tr>
                        <th className="hide-on-large"><button className="toggle-btn" onClick={() => { }}><FaPlus /></button></th>
                        <th><input type="checkbox" /></th>
                        <th>Name</th>
                        <th className="hide-on-small">Phone</th>
                        <th className="hide-on-small">Email</th>
                        <th className="hide-on-small">Verification</th>
                        <th className="hide-on-small">Approval</th>
                        <th className="hide-on-small">Products</th>
                        <th className="hide-on-small">Due</th>
                        <th className="hide-on-small">Email Verification</th>
                        <th className="hide-on-small">Status</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {sellers.map((seller) => (
                        <React.Fragment key={seller.id}>
                            <tr>
                                <td className="hide-on-large"><button className="toggle-btn" onClick={() => toggleRow(seller.id)}>{expandedRows[seller.id] ? <FaMinus /> : <FaPlus />}</button></td>
                                <td><input type="checkbox" /></td>
                                <td className="seller-info">
                                    <img src={seller.image} alt={seller.name} className="seller-img" />
                                    {seller.name}
                                </td>
                                <td className="hide-on-small">{seller.phone}</td>
                                <td className="hide-on-small">{seller.email}</td>
                                <td className="hide-on-small">{seller.verification}</td>
                                <td className="hide-on-small">
                                    <label className="switch">
                                        <input
                                            type="checkbox"
                                            checked={approvals[seller.id]}
                                            onChange={() => toggleApproval(seller.id)}
                                        />
                                        <span className="slider round"></span>
                                    </label>
                                </td>
                                <td className="hide-on-small">{seller.products}</td>
                                <td className="hide-on-small">{seller.due}</td>
                                <td className="hide-on-small">{seller.emailVerification}</td>
                                <td className="hide-on-small">{seller.status}</td>
                                {/* <td>
                                    <button className="btn btn-primary btn-sm">Options</button>
                                </td> */}
                                <td>
                  <div style={{ position: "relative" }}> {/* Container for dropdown */}
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => toggleDropdown(seller.id)}
                    >
                      <FaEllipsisV />
                    </button>
                    {dropdownOpen === seller.id && (
                      <div 
                        style={{
                          position: "absolute",
                          background: "white",
                          border: "1px solid #ccc",
                          borderRadius: "5px",
                          padding: "8px",
                          zIndex: 10,
                          right: 0,
                          width:"200px",
                          marginTop: "5px",
                        }}
                      >
                        <div style={{ padding: "5px", cursor: "pointer" }}>Profile</div>
                        <div style={{ padding: "5px", cursor: "pointer" }}>Log in as this Seller</div>
                        <div style={{ padding: "5px", cursor: "pointer" }}>Go to Payment</div>
                        <div style={{ padding: "5px", cursor: "pointer" }}>Payment History</div>
                        <div style={{ padding: "5px", cursor: "pointer" }}>Set Commission</div>
                        <div style={{ padding: "5px", cursor: "pointer" }}>Edit</div>
                        <div style={{ padding: "5px", cursor: "pointer" }}>Ban this seller</div>
                        <div style={{ padding: "5px", cursor: "pointer" }}>Delete</div>
                      </div>
                    )}
                  </div>
                </td>
                            </tr>
                            {expandedRows[seller.id] && (
                                <tr className="expanded-row">
                                    <td colSpan="12">
                                        <table className="inner-table">
                                            <tbody>
                                                <tr><td>Phone:</td><td>{seller.phone}</td></tr>
                                                <tr><td>Email:</td><td>{seller.email}</td></tr>
                                                <tr><td>Verification:</td><td>{seller.verification}</td></tr>
                                                <tr><td>Approval:</td>
                                                    <td>
                                                    <label className="switch">
                                                            <input
                                                                type="checkbox"
                                                                checked={approvals[seller.id]}
                                                                onChange={() => toggleApproval(seller.id)}
                                                            />
                                                            <span className="slider round"></span>
                                                        </label>
                                                    </td>
                                                </tr>
                                                <tr><td>Products:</td><td>{seller.products}</td></tr>
                                                <tr><td>Due:</td><td>{seller.due}</td></tr>
                                                <tr><td>Email Verification:</td><td className={seller.emailVerification === "Verified" ? "verified-status" : ""}>{seller.emailVerification}</td></tr>
                                                <tr><td>Status:</td><td className={seller.status === "Regular" ? "regular-status" : ""}>{seller.status}</td></tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllSellers;



import React, { useState } from "react";
import "./AllStaff.css";
import { FaPlus, FaEdit, FaTrash, FaMinus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AllStaff = () => {
  const [expandedRows, setExpandedRows] = useState({});
  const navigate = useNavigate();

  const staffsData = [
    {
      id: 1,
      name: "George M. Winters",
      email: "staff@example.com",
      phone: "662-817-4374",
      role: "Product manager",
    },
    {
      id: 2,
      name: "Donna B. Cantrell",
      email: "staff2@example.com",
      phone: "+1 (586) 899-1627",
      role: "Customer Service Representatives",
    },
    {
      id: 3,
      name: "Christian E. Guerra",
      email: "staff3@example.com",
      phone: "-1 (814) 387-2818",
      role: "PPC Manager",
    },
    {
      id: 4,
      name: "Karen E. Towles",
      email: "staff4@example.com",
      phone: "-1540851-2369",
      role: "Category Manager",
    },
    {
      id: 5,
      name: "Lindsay S Engel",
      email: "staff5@example.com",
      phone: "678-417-4134",
      role: "Order clerks",
    },
    {
        id:6,
        name: "Lindsay S Engel",
        email: "staff5@example.com",
        phone: "678-417-4134",
        role: "Order clerks",
      },
      {
        id: 7,
        name: "Lindsay S Engel",
        email: "staff5@example.com",
        phone: "678-417-4134",
        role: "Order clerks",
      },
      {
        id: 8,
        name: "Lindsay S Engel",
        email: "staff5@example.com",
        phone: "678-417-4134",
        role: "Order clerks",
      },
  ];

  const toggleRow = (id) => {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  const handlereview = (e) => {
    e.preventDefault();
    navigate("/staffs/create");
  };
  const handleStaff = (e) => {
    e.preventDefault();
    navigate("/staffs/editInfo");
  };
  return (
    <div className="all-staffs-container">
      <h1 className="staff">All Staffs</h1>
      <button className="add-new-staffs-button mb-5"   onClick={handlereview}>Add New Staffs</button>
      <table className="staffs-table">
        <thead>
          <tr>
            <th></th>
            <th className="hide-on-responsive">#</th>
            <th>Name</th>
            <th className="hide-on-responsive">Email</th>
            <th className="hide-on-responsive">Phone</th>
            <th className="hide-on-responsive">Role</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {staffsData.map((staff) => (
            <React.Fragment key={staff.id}>
              <tr>
                <td> <button className="responsive-expand-button" onClick={() => toggleRow(staff.id)}>
                      {expandedRows[staff.id] ? <FaMinus /> : <FaPlus />  }
                    </button></td>
                <td className="hide-on-responsive">{staff.id}</td>
                <td>{staff.name}</td>
                <td className="hide-on-responsive">{staff.email}</td>
                <td className="hide-on-responsive">{staff.phone}</td>
                <td className="hide-on-responsive">{staff.role}</td>
                <td>
                  <div className="options-container">
                   
                    <FaEdit className="edit-icon"  onClick={handleStaff}/>
                    <FaTrash className="delete-icon" />
                  </div>
                </td>
              </tr>
              {/* {expandedRows[staff.id] && (
                <tr className="expanded-row">
                  <td colSpan="6">
                    <div className="expanded-details">
                      <p>
                        <strong>Email:</strong> {staff.email}
                      </p>
                      <p>
                        <strong>Phone:</strong> {staff.phone}
                      </p>
                      <p>
                        <strong>Role:</strong> {staff.role}
                      </p>
                    </div>
                  </td>
                </tr>
              )} */}
              {expandedRows[staff.id] && (
  <tr className="expanded-row">
    <td colSpan="7">
      <table className="expanded-table">
        <tbody>
          <tr>
            <th>Email</th>
            <td>{staff.email}</td>
          </tr>
          <tr>
            <th>Phone</th>
            <td>{staff.phone}</td>
          </tr>
          <tr>
            <th>Role</th>
            <td>{staff.role}</td>
          </tr>
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

export default AllStaff;
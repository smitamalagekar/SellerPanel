import React from "react";
import "./Roles.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const roles = [
  { id: 1, name: "Customer Service Representatives" },
  { id: 2, name: "Product Manager" },
  { id: 3, name: "PPC Manager" },
  { id: 4, name: "Category Manager" },
  { id: 5, name: "Order Clerks" },
  { id: 6, name: "Ecommerce Manager" },
];


  
const Roles = () => {
    const navigate = useNavigate();
    
const handlereview = (e) => {
    e.preventDefault();
    navigate("/staffs/rolecreate");
  };
  const handlereviewedit = (e) => {
    e.preventDefault();
    navigate("/staffs/edit");
  };
  return (
    <div className="role-container">
      <div className="header">
        <h2>All Roles</h2>
        <button className="add-role-btn" onClick={handlereview}>Add New Role</button>
      </div>

      <table className="role-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th className="options-header">Options</th> {/* Centered Header */}
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id}>
              <td>{role.id}</td>
              <td>{role.name}</td>
              <td className="actions  ">
                <FaEdit className="edit-icon" onClick={handlereviewedit} />
                <FaTrash className="delete-icon" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Roles;

import React, { useState } from "react";
import "./Queries.css";
import {  FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Queries = () => {
  const [expandedRows, setExpandedRows] = useState({});
  const navigate = useNavigate();
  const toggleRow = (index) => {
    setExpandedRows((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const data = [
    { id: 1, user: "Arnulfo T. Lucky", product: "Anivia Computer Headsets Over Ear Headphones", question: "Can I change or cancel my order after it has been placed?", reply: "", status: "Not Replied" },
    { id: 2, user: "Arnulfo T. Lucky", product: "Premium executive estate with plenty of cargo capacity", question: "How do I know if a product is available in stock?", reply: "", status: "Not Replied" },
    { id: 3, user: "Arnulfo T. Lucky", product: "Plasticolor 008669R01 Marvel Deadpool Repeater", question: "How do I know if a product is available in stock?", reply: "", status: "Not Replied" },
    { id: 4, user: "Arnulfo T. Lucky", product: "ZAGG - Pro Keys Wireless Keyboard", question: "What is your return policy?", reply: "", status: "Not Replied" },
  ];
  const handlereview = (e) => {
    e.preventDefault();
    navigate("/support/supports");
  };

  return (
    <div className="table-container">
      <h2>Product Queries</h2>
      <table className="styled-table mt-5">
        <thead>
          <tr>
            <th></th>
            <th>#</th>
            <th>User Name</th>
            <th>Product Name</th>
            <th className="hide-on-small">Question</th>
            <th className="hide-on-small">Reply</th>
            <th>Status</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <React.Fragment key={item.id}>
              <tr>
                <td> <button className="expand-btn" onClick={() => toggleRow(index)}>+</button></td>
                <td>{item.id}</td>
                <td>{item.user}</td>
                <td>{item.product}</td>
                <td className="hide-on-small">{item.question}</td>
                <td className="hide-on-small">{item.reply || "—"}</td>
                <td>
                  <span className="status">{item.status}</span>
                </td>
                <td>
                 
                   <button className="icon-btn" onClick={handlereview}><FaEye /></button>
                </td>
              </tr>
              {expandedRows[index] && (
                <tr className="expand-row">
                  <td colSpan="7">
                    <strong>Question:</strong> {item.question} <br />
                    <strong>Reply:</strong> {item.reply || "—"}
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

export default Queries;

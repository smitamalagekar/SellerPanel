import React, { useState } from "react";
import "./payout.css";

const Payout = () => {
  const [expandedRows, setExpandedRows] = useState({});

  const payments = [
    { id: 1, date: "2022-04-27 22:12:07", seller: "Filon Asset Store", amount: "$28.00", paymentDetails: "Cash" },
    { id: 2, date: "2022-04-27 22:11:48", seller: "Filon Asset Store", amount: "$20.00", paymentDetails: "Cash" },
    { id: 3, date: "2022-04-27 22:11:48", seller: "Filon Asset Store", amount: "$20.00", paymentDetails: "Cash" },
    { id: 4, date: "2022-04-27 22:11:48", seller: "Filon Asset Store", amount: "$20.00", paymentDetails: "Cash" },
    { id: 5, date: "2022-04-27 22:11:48", seller: "Filon Asset Store", amount: "$20.00", paymentDetails: "Cash" },
  ];

  const toggleRow = (id) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="container">
      <h2 className="payout-title">Seller Payments</h2>
      <table className="payout-table">
        <thead>
          <tr>
            <th className="toggle-col hide-on-large">+</th> 
            <th className="hide-on-small">#</th>
            <th className="hide-on-small">Date</th>
            <th>Seller</th>
            <th>Amount</th>
            <th className="hide-on-small">Payment Details</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <React.Fragment key={payment.id}>
              <tr>
                <td className="toggle-col hide-on-large">
                  <button className="toggle-btn" onClick={() => toggleRow(payment.id)}>
                    {expandedRows[payment.id] ? "−" : "+"}
                  </button>
                </td>
                <td className="hide-on-small">{payment.id}</td>
                <td className="hide-on-small">{payment.date}</td>
                <td>{payment.seller}</td>
                <td>{payment.amount}</td>
                <td className="hide-on-small">{payment.paymentDetails}</td>
              </tr>
              {expandedRows[payment.id] && (
                <tr className="expanded-row">
                  <td colSpan="6">
                    <table className="inner-table">
                      <tbody>
                        <tr>
                          <td>#</td>
                          <td>{payment.id}</td>
                        </tr>
                        <tr>
                          <td>Date</td>
                          <td>{payment.date}</td>
                        </tr>
                        <tr>
                          <td>Payment Details</td>
                          <td>{payment.paymentDetails}</td>
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

export default Payout;





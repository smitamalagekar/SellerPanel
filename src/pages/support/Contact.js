import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contacts-container">
      <h3 className="title">Contacts</h3>
      <table className="contacts-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Query</th>
            <th>Reply</th>
            <th>Status</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="8" className="no-data">
              <div className="not-found">
                <span className="sad-face"></span>
                <p>Nothing found</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Contact;

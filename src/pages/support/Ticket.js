import React, { useState } from "react";
import "./Ticket.css";
import { FaPlus, FaEye } from "react-icons/fa"; 

const tickets = [
  {
    id: "#1000002513",
    sendingDate: "2022-04-28 03:07:13",
    subject: "A doloribus aut quae",
    user: "Paul K. Jensen",
    status: "Open",
    lastReply: "2022-04-27 21:07:13",
  },
  {
    id: "#2147483647",
    sendingDate: "2022-04-28 03:06:46",
    subject: "Voluptatibus quia id",
    user: "Filon Asset Store",
    status: "Solved",
    lastReply: "2022-04-27 21:06:46",
  },
  {
    id: "#2147483647",
    sendingDate: "2022-04-16 23:43:10 new",
    subject: "Broken",
    user: "Filon Asset Store",
    status: "Pending",
    lastReply: "2022-04-16 23:43:10",
  },
  {
    id: "#10000024",
    sendingDate: "2021-02-14 07:24:33 now",
    subject: "Cupiditate qui aut p",
    user: "Paul K. Jensen",
    status: "Pending",
    lastReply: "2021-02-14 07:24:33",
  },
];

const Ticket = () => {
  const [expandedRows, setExpandedRows] = useState({});

  const toggleRow = (id) => {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="support-desk-container">
      <div className="header">
        <h2 className="title">Support Desk</h2>
        <input type="text" className="search-input" placeholder="Type ticket code & Enter" />
      </div>

      <table className="ticket-table">
        <thead>
          <tr>
            <th className="hide-on-large"></th> 
            <th className="hide-on-small">Ticket ID</th>
            <th className="hide-on-small">Sending Date</th>
            <th>Subject</th>
            <th className="hide-on-small">User</th>
            <th className="hide-on-small">Status</th>
            <th className="hide-on-small">Last reply</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <React.Fragment key={ticket.id}>
              <tr>
                <td className="hide-on-large">
                  <button className="toggle-btn" onClick={() => toggleRow(ticket.id)}>
                    {expandedRows[ticket.id] ? <FaPlus /> : <FaPlus />}
                  </button>
                </td>
                <td className="hide-on-small">{ticket.id}</td>
                <td className="hide-on-small">{ticket.sendingDate}</td>
                <td>{ticket.subject}</td>
                <td className="hide-on-small">{ticket.user}</td>
                <td className="hide-on-small status1">{ticket.status}</td>
                <td className="hide-on-small">{ticket.lastReply}</td>
                {/* <td><FaEye /></td> */}
                <td>
                  <button><FaEye className="eye-icon" /></button>
                </td>
              </tr>
              {/* {expandedRows[ticket.id] && (
                <tr className="expanded-row">
                  <td colSpan="8">
                    <div className="expanded-details">
                      <p><strong>Ticket ID:</strong> {ticket.id}</p>
                      <p><strong>Sending Date:</strong> {ticket.sendingDate}</p>
                      <p><strong>User:</strong> {ticket.user}</p>
                      <p><strong>Status:</strong> {ticket.status}</p>
                      <p><strong>Last reply:</strong> {ticket.lastReply}</p>
                    </div>
                  </td>
                </tr>
              )} */}
               {expandedRows[ticket.id] && (
                <tr className="expanded-row">
                  <td colSpan="8">
                    <table className="expanded-table">
                      <tbody>
                        <tr>
                          <td><strong>Ticket ID:</strong></td>
                          <td>{ticket.id}</td>
                        </tr>
                        <tr>
                          <td><strong>Sending Date:</strong></td>
                          <td>{ticket.sendingDate}</td>
                        </tr>
                        <tr>
                          <td><strong>User:</strong></td>
                          <td>{ticket.user}</td>
                        </tr>
                        <tr>
                          <td><strong>Status:</strong></td>
                          <td>{ticket.status}</td>
                        </tr>
                        <tr>
                          <td><strong>Last reply:</strong></td>
                          <td>{ticket.lastReply}</td>
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

export default Ticket;
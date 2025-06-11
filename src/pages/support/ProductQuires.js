

// export default ProductQuires;
import React, { useState } from "react";
import "./Conversation.css";
import { FaPlus, FaEye, FaTrash } from "react-icons/fa";

const Conversation = () => {
  const [expandedRows, setExpandedRows] = useState({});

  const conversationsData = [
    {
      id: 1,
      date: "2025-01-27 11:20:07",
      title: "Redragon S101 Wired RGB Backlit Gaming Keyboard",
      sender: "Paul K. Jensen",
      receiver: "Filon Asset Store",
      isNew: true,
    },
    {
      id: 2,
      date: "2024-12-12 02:16:47",
      title: "Women's Plain Dress One Piece for Girls",
      sender: "Paul K. Jensen",
      receiver: "William C. Schroyer",
      isNew: true,
    },
    {
        id: 3,
        date: "2024-12-12 02:16:47",
        title: "Women's Plain Dress One Piece for Girls",
        sender: "Paul K. Jensen",
        receiver: "William C. Schroyer",
        isNew: true,
      },
      {
        id: 4,
        date: "2024-12-12 02:16:47",
        title: "Women's Plain Dress One Piece for Girls",
        sender: "Paul K. Jensen",
        receiver: "William C. Schroyer",
        isNew: true,
      },
      {
        id: 5,
        date: "2024-12-12 02:16:47",
        title: "Women's Plain Dress One Piece for Girls",
        sender: "Paul K. Jensen",
        receiver: "William C. Schroyer",
        isNew: true,
      },
  ];

  const toggleRow = (id) => {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="container">
      <h2 className="heading">Conversations</h2>
      <table className="conversation-table">
        <thead>
          <tr>
            <th></th>
            <th className="hide-on-small">#</th>
            <th className="hide-on-small">Date</th>
            <th className="hide-on-small">Title</th>
            <th>Sender</th>
            <th>Receiver</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {conversationsData.map((conversation) => (
            <React.Fragment key={conversation.id}>
              <tr className="table-row">
                <td className="hide-on-small">{conversation.id}</td>
                <td className="hide-on-small">{conversation.date}</td>
                <td className="hide-on-small">{conversation.title}</td>
                <td>
                <button onClick={() => toggleRow(conversation.id)} className="expand-btn">
                    <FaPlus />
                  </button>
                </td>
                <td>
                  {/* <button onClick={() => toggleRow(conversation.id)} className="expand-btn">
                    <FaPlus />
                  </button> */}
                  {conversation.sender}
                  {conversation.isNew && <span className="new-badge">new</span>}
                </td>
                <td>{conversation.receiver}</td>
                <td>
                  <button className="icon-btn mr-2"><FaEye /></button>
                  <button className="icon-btn delete-btn"><FaTrash /></button>
                </td>
              </tr>
              {expandedRows[conversation.id] && (
                <tr className="expanded-row">
                  <td colSpan="6">
                    <table className="expanded-table">
                      <tbody>
                        <tr>
                          <th className="expanded-th">#</th>
                          <td className="expanded-td">{conversation.id}</td>
                        </tr>
                        <tr>
                          <th className="expanded-th">Date</th>
                          <td className="expanded-td">{conversation.date}</td>
                        </tr>
                        <tr>
                          <th className="expanded-th">Title</th>
                          <td className="expanded-td">{conversation.title}</td>
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

export default Conversation;
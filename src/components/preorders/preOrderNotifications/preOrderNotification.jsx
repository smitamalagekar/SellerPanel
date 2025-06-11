import { Edit } from "lucide-react"
import "./preOrderNotification.scss"
// import Switch from "../../Switch"
import { useEffect, useState } from "react";
import axios from "axios";

export default function PreOrderNotification() {
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get("https://e-commerce-backend-1-0.onrender.com/api/preorder-notification");
      if (res.data?.data) {
        setNotifications(res.data.data);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      await axios.put(`https://e-commerce-backend-1-0.onrender.com/api/preorder-notification/${id}`, {
        status: currentStatus === "active" ? "inactive" : "active",
      });
      fetchNotifications(); // refetch after update
    } catch (err) {
      console.error("Status update error:", err);
    }
  };

  const handleEdit = async (id, currentDefaultText) => {
    const newText = prompt("Edit default text:", currentDefaultText);
    if (!newText || newText === currentDefaultText) return;

    try {
      await axios.put(`https://e-commerce-backend-1-0.onrender.com/api/preorder-notification/${id}`, {
        defaultText: newText,
      });
      fetchNotifications(); // refetch after update
    } catch (err) {
      console.error("Edit error:", err);
    }
  };

  return (
    <div className="PreOrderNotification ma10">
      <div className="preOrderNotificationBox">
        <div className="preOrderNotificationBoxHeader">
          <p className="notificationTypes">Notification Types</p>
          <div className="notificationMenu">
            <div className="notMLeft">
              <p className="notMItem activeNot">Customer</p>
              <p className="notMItem">Seller</p>
              <p className="notMItem">Admin</p>
            </div>
          </div>
        </div>

        <div className="preOrderNotificationLower">
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Type</th>
                  <th>Default Text</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {notifications.length > 0 ? (
                  notifications.map((n, i) => (
                    <tr key={n._id}>
                      <td>{i + 1}</td>
                      <td>{n.image ? <img src={n.image} alt="" className="nimg" /> : "No image"}</td>
                      <td>{n.name}</td>
                      <td>{n.defaultText}</td>
                      <td>
                        <label className="switch">
                          <input
                            type="checkbox"
                            checked={n.status === "active"}
                            onChange={() => handleToggleStatus(n._id, n.status)}
                          />
                          <span className="slider"></span>
                        </label>
                      </td>
                      <td>
                        <Edit
                          color="blue"
                          size={18}
                          className="cursor-pointer"
                          onClick={() => handleEdit(n._id, n.defaultText)}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center" }}>
                      No notifications found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

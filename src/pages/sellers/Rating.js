// import React, { useState } from "react";
// import "./rating.css"; // Custom CSS
// import { FaStar, FaRegStar } from "react-icons/fa"; // FontAwesome Icons for Rating


// const sellers = [
//   { id: 1, name: "LOUIS VUITTON", image: "https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/qf8pEDFmjfjIDYYGXaKtJ90ilKQMC7F1rXk2vQJr.webp", phone: "", email: "seller11@example.com", rating: 5, followers: 0, customFollowers: 0 },
//   { id: 2, name: "Adidas", image: "https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/AcQrue0Rc4krp9i0LsDXW8FcZ6z4YYWXOdcJL908.webp", phone: "", email: "seller8@example.com", rating: 4, followers: 0, customFollowers: 0 },
//   { id: 3, name: "Lavish Look", image: "https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/1RutGcPmMYvLHiatsxAVq9l8XMM3IiuuvGUq20yh.webp", phone: "", email: "seller7@example.com", rating: 3, followers: 1, customFollowers: 0 },
//   { id: 4, name: "Jhonson", image: "https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/py3XlBVjI3SEBiQPcyfs3vSlrqHCbBlPMNaDcoUR.webp", phone: "734-604-6681", email: "seller6@example.com", rating: 0, followers: 0, customFollowers: 0 },
//   { id: 3, name: "Apple Store", image: "https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/py3XlBVjI3SEBiQPcyfs3vSlrqHCbBlPMNaDcoUR.webp", phone: "", email: "seller7@example.com", rating: 3, followers: 1, customFollowers: 0 },
//   { id: 4, name: "Electroware", image: "https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/NMwkxm5oVRDoj2Mh8i4bP1DSDGneTkKMhAWYyBfc.webp", phone: "734-604-6681", email: "seller6@example.com", rating: 0, followers: 0, customFollowers: 0 },
// ];

// const renderStars = (rating) => {
//   const totalStars = 5;
//   return (
//     <>
//       {[...Array(totalStars)].map((_, index) =>
//         index < rating ? <FaStar key={index} className="star filled" /> : <FaRegStar key={index} className="star" />
//       )}
//     </>
//   );
// };

// const Rating = () => {
//   const [expandedRows, setExpandedRows] = useState({});

//   const toggleRow = (id) => {
//     setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
//   };

//   return (
//     <div className="container">
//       <h3 className="table-title">Sellers Review & Followers</h3>
//       <table className="seller-table">
//         <thead>
//           <tr>
//             <th className="toggle-col hide-on-large">+</th>
//             <th>#</th>
//             <th>Name</th>
//             <th className="hide-on-small">Phone</th>
//             <th className="hide-on-small">Email Address</th>
//             <th className="hide-on-small">Rating</th>
//             <th className="hide-on-small">Followers</th>
//             <th className="hide-on-small">Custom Followers</th>
//             <th>Options</th>
//           </tr>
//         </thead>
//         <tbody>
//           {sellers.map((seller) => (
//             <React.Fragment key={seller.id}>
//               <tr>
//                 <td className="toggle-col hide-on-large">
//                   <button className="toggle-btn" onClick={() => toggleRow(seller.id)}>
//                     {expandedRows[seller.id] ? "−" : "+"}
//                   </button>
//                 </td>
//                 <td>{seller.id}</td>
//                 <td>
//                   <div className="seller-info">
//                     <img src={seller.image} alt={seller.name} className="seller-img" />
//                     {seller.name}
//                   </div>
//                 </td>
//                 <td className="hide-on-small">{seller.phone || "N/A"}</td>
//                 <td className="hide-on-small">{seller.email}</td>
//                 <td className="hide-on-small">{renderStars(seller.rating)}</td>
//                 <td className="hide-on-small">{seller.followers}</td>
//                 <td className="hide-on-small">{seller.customFollowers}</td>
//                 <td>
//                   <button className="btn btn-primary btn-sm">Edit Custom Follower</button>
//                 </td>
//               </tr>
//               {expandedRows[seller.id] && (
//                 <tr className="expanded-row">
//                   <td colSpan="9">
//                     <table className="inner-table">
//                       <tbody>
//                         <tr>
//                           <td>Phone</td>
//                           <td>{seller.phone || "N/A"}</td>
//                         </tr>
//                         <tr>
//                           <td>Email</td>
//                           <td>{seller.email}</td>
//                         </tr>
//                         <tr>
//                           <td>Rating</td>
//                           <td>{renderStars(seller.rating)}</td>
//                         </tr>
//                         <tr>
//                           <td>Followers</td>
//                           <td>{seller.followers}</td>
//                         </tr>
//                         <tr>
//                           <td>Custom Followers</td>
//                           <td>{seller.customFollowers}</td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </td>
//                 </tr>
//               )}
//             </React.Fragment>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Rating;







// import React, { useState } from "react";
// import "./payout.css";

// const Payout = () => {
//   const [expandedRows, setExpandedRows] = useState({});
//   const [showModal, setShowModal] = useState(false);
//   const [customFollowers, setCustomFollowers] = useState(0);

//   const payments = [
//     { id: 1, date: "2022-04-27 22:12:07", seller: "Filon Asset Store", amount: "$28.00", paymentDetails: "Cash" },
//     { id: 2, date: "2022-04-27 22:11:48", seller: "Filon Asset Store", amount: "$20.00", paymentDetails: "Cash" },
//     { id: 3, date: "2022-04-27 22:11:48", seller: "Filon Asset Store", amount: "$20.00", paymentDetails: "Cash" },
//     { id: 4, date: "2022-04-27 22:11:48", seller: "Filon Asset Store", amount: "$20.00", paymentDetails: "Cash" },
//     { id: 5, date: "2022-04-27 22:11:48", seller: "Filon Asset Store", amount: "$20.00", paymentDetails: "Cash" },
//   ];

//   const toggleRow = (id) => {
//     setExpandedRows((prev) => ({
//       ...prev,
//       [id]: !prev[id],
//     }));
//   };

//   const openModal = () => {
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//   };

//   const handleSave = () => {
//     // यहाँ आप कस्टम फॉलोअर्स को सेव करने का लॉजिक जोड़ सकते हैं
//     console.log("Custom Followers Saved:", customFollowers);
//     closeModal();
//   };

//   return (
//     <div className="container">
//       <h2 className="payout-title">Seller Payments</h2>
//       <table className="payout-table">
//         <thead>
//           <tr>
//             <th className="toggle-col hide-on-large">+</th>
//             <th className="hide-on-small">#</th>
//             <th className="hide-on-small">Date</th>
//             <th>Seller</th>
//             <th>Amount</th>
//             <th className="hide-on-small">Payment Details</th>
//             <th>Actions</th> {/* नया कॉलम */}
//           </tr>
//         </thead>
//         <tbody>
//           {payments.map((payment) => (
//             <React.Fragment key={payment.id}>
//               <tr>
//                 <td className="toggle-col hide-on-large">
//                   <button className="toggle-btn" onClick={() => toggleRow(payment.id)}>
//                     {expandedRows[payment.id] ? "−" : "+"}
//                   </button>
//                 </td>
//                 <td className="hide-on-small">{payment.id}</td>
//                 <td className="hide-on-small">{payment.date}</td>
//                 <td>{payment.seller}</td>
//                 <td>{payment.amount}</td>
//                 <td className="hide-on-small">{payment.paymentDetails}</td>
//                 <td>
//                   <button className="edit1" onClick={openModal}>Edit Custom Followers</button>
//                 </td>
//               </tr>
//               {expandedRows[payment.id] && (
//                 <tr className="expanded-row">
//                   <td colSpan="7"> {/* colSpan को 7 में बदलें */}
//                     <table className="inner-table">
//                       <tbody>
//                         <tr>
//                           <td>#</td>
//                           <td>{payment.id}</td>
//                         </tr>
//                         <tr>
//                           <td>Date</td>
//                           <td>{payment.date}</td>
//                         </tr>
//                         <tr>
//                           <td>Payment Details</td>
//                           <td>{payment.paymentDetails}</td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </td>
//                 </tr>
//               )}
//             </React.Fragment>
//           ))}
//         </tbody>
//       </table>

//       {showModal && (
//         <div className="modal">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h2 >Edit Seller Custom Followers</h2>
//               <span className="close" onClick={closeModal}>&times;</span>
//             </div>
//             <div className="modal-body">
//               <label htmlFor="customFollowers">Custom Followers</label>
//               <input
//                 type="number"
//                 id="customFollowers"
//                 value={customFollowers}
//                 onChange={(e) => setCustomFollowers(e.target.value)}
//               />
//             </div>
//             <div className="modal-footer">
//               <button className="save-btn" onClick={handleSave}>Save</button>
//               <button className="cancel-btn" onClick={closeModal}>Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Payout;






import React, { useState } from "react";
import "./rating.css"; // Custom CSS
import { FaStar, FaRegStar } from "react-icons/fa"; // FontAwesome Icons for Rating

const sellers = [
  { id: 1, name: "LOUIS VUITTON", image: "https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/qf8pEDFmjfjIDYYGXaKtJ90ilKQMC7F1rXk2vQJr.webp", phone: "", email: "seller11@example.com", rating: 5, followers: 0, customFollowers: 0 },
  { id: 2, name: "Adidas", image: "https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/AcQrue0Rc4krp9i0LsDXW8FcZ6z4YYWXOdcJL908.webp", phone: "", email: "seller8@example.com", rating: 4, followers: 0, customFollowers: 0 },
  { id: 3, name: "Lavish Look", image: "https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/1RutGcPmMYvLHiatsxAVq9l8XMM3IiuuvGUq20yh.webp", phone: "", email: "seller7@example.com", rating: 3, followers: 1, customFollowers: 0 },
  { id: 4, name: "Jhonson", image: "https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/py3XlBVjI3SEBiQPcyfs3vSlrqHCbBlPMNaDcoUR.webp", phone: "734-604-6681", email: "seller6@example.com", rating: 0, followers: 0, customFollowers: 0 },
  { id: 3, name: "Apple Store", image: "https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/py3XlBVjI3SEBiQPcyfs3vSlrqHCbBlPMNaDcoUR.webp", phone: "", email: "seller7@example.com", rating: 3, followers: 1, customFollowers: 0 },
  { id: 4, name: "Electroware", image: "https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/NMwkxm5oVRDoj2Mh8i4bP1DSDGneTkKMhAWYyBfc.webp", phone: "734-604-6681", email: "seller6@example.com", rating: 0, followers: 0, customFollowers: 0 },
];

const renderStars = (rating) => {
  const totalStars = 5;
  return (
    <>
      {[...Array(totalStars)].map((_, index) =>
        index < rating ? <FaStar key={index} className="star filled" /> : <FaRegStar key={index} className="star" />
      )}
    </>
  );
};

const Rating = () => {
  const [expandedRows, setExpandedRows] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalSeller, setModalSeller] = useState(null);
  const [customFollowers, setCustomFollowers] = useState(0);

  const toggleRow = (id) => {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const openModal = (seller) => {
    setModalSeller(seller);
    setCustomFollowers(seller.customFollowers);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalSeller(null);
  };

  const handleSave = () => {
    // Implement save logic here
    console.log("Saving followers:", customFollowers, "for seller:", modalSeller);
    closeModal();
  };

  return (
    <div className="container">
      <h3 className="table-title">Sellers Review & Followers</h3>
      <table className="seller-table">
        <thead>
          <tr>
            <th className="toggle-col hide-on-large">+</th>
            <th>#</th>
            <th>Name</th>
            <th className="hide-on-small">Phone</th>
            <th className="hide-on-small">Email Address</th>
            <th className="hide-on-small">Rating</th>
            <th className="hide-on-small">Followers</th>
            <th className="hide-on-small">Custom Followers</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {sellers.map((seller) => (
            <React.Fragment key={seller.id}>
              <tr>
                <td className="toggle-col hide-on-large">
                  <button className="toggle-btn" onClick={() => toggleRow(seller.id)}>
                    {expandedRows[seller.id] ? "−" : "+"}
                  </button>
                </td>
                <td>{seller.id}</td>
                <td>
                  <div className="seller-info">
                    <img src={seller.image} alt={seller.name} className="seller-img" />
                    {seller.name}
                  </div>
                </td>
                <td className="hide-on-small">{seller.phone || "N/A"}</td>
                <td className="hide-on-small">{seller.email}</td>
                <td className="hide-on-small">{renderStars(seller.rating)}</td>
                <td className="hide-on-small">{seller.followers}</td>
                <td className="hide-on-small">{seller.customFollowers}</td>
                <td>
                  <button className="btn btn-primary btn-sm" onClick={() => openModal(seller)}>Edit Custom Follower</button>
                </td>
              </tr>
              {expandedRows[seller.id] && (
                <tr className="expanded-row">
                  <td colSpan="9">
                    <table className="inner-table">
                      <tbody>
                        <tr>
                          <td>Phone</td>
                          <td>{seller.phone || "N/A"}</td>
                        </tr>
                        <tr>
                          <td>Email</td>
                          <td>{seller.email}</td>
                        </tr>
                        <tr>
                          <td>Rating</td>
                          <td>{renderStars(seller.rating)}</td>
                        </tr>
                        <tr>
                          <td>Followers</td>
                          <td>{seller.followers}</td>
                        </tr>
                        <tr>
                          <td>Custom Followers</td>
                          <td>{seller.customFollowers}</td>
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

      {showModal && modalSeller && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Edit Custom Followers for {modalSeller.name}</h2>
              <span className="close" onClick={closeModal}>&times;</span>
            </div>
            <div className="modal-body">
              <label htmlFor="customFollowers">Custom Followers:</label>
              <input
                type="number"
                id="customFollowers"
                value={customFollowers}
                onChange={(e) => setCustomFollowers(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button className="save-btn" onClick={handleSave}>Save</button>
              <button className="cancel-btn" onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rating;
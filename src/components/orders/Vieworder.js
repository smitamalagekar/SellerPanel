import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ViewPreorder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const preorder = location.state?.preorder || {};

  if (!location.state?.preorder) {
    return <div className="p-6 text-center text-gray-600">No preorder data found.</div>;
  }

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(`Field: ${name}, Value: ${value}`);
   
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-start">
      <div className="w-full max-w-4xl bg-white p-8 rounded-xl shadow-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-inter text-gray-800">Edit Preorder Details</h2>
          <button
            onClick={handleGoBack}
            className="text-sm text-white bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded-md"
          >
            Go Back
          </button>
        </div>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product */}
          <div>
            <label className="block mb-1 text-gray-700 font-medium">Product</label>
            <input
              type="text"
              name="product"
              value={preorder.product}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="block mb-1 text-gray-700 font-medium">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={preorder.quantity}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Order Code */}
          <div>
            <label className="block mb-1 text-gray-700 font-medium">Order Code</label>
            <input
              type="text"
              name="code"
              value={preorder.code}
              readOnly
              className="w-full bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-gray-500"
            />
          </div>

          {/* Created Date */}
          <div>
            <label className="block mb-1 text-gray-700 font-medium">Created Date</label>
            <input
              type="text"
              name="created"
              value={preorder.created}
              readOnly
              className="w-full bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-gray-500"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block mb-1 text-gray-700 font-medium">Price</label>
            <input
              type="text"
              name="price"
              value={preorder.price}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Prepayment */}
          <div>
            <label className="block mb-1 text-gray-700 font-medium">Prepayment</label>
            <input
              type="text"
              name="prepayment"
              value={preorder.prepayment}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Customer Name */}
          <div>
            <label className="block mb-1 text-gray-700 font-medium">Customer Name</label>
            <input
              type="text"
              name="customerName"
              value={preorder.customerName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Customer Email */}
          <div>
            <label className="block mb-1 text-gray-700 font-medium">Customer Email</label>
            <input
              type="email"
              name="customerEmail"
              value={preorder.customerEmail}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block mb-1 text-gray-700 font-medium">Status</label>
            <input
              type="text"
              name="status"
              value={preorder.status}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Refund Status */}
          <div>
            <label className="block mb-1 text-gray-700 font-medium">Refund Status</label>
            <input
              type="text"
              name="refund"
              value={preorder.refund}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </form>

        {/* Save Changes */}
        <div className="mt-8 text-right">
          <button
            type="button"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md shadow-md"
            onClick={() => console.log('Save logic here')}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewPreorder;

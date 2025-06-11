import { useState } from "react";
import { Eye } from "lucide-react"; // or use your icon component
import { useParams } from "react-router-dom";

export const Viewfinalorder = ({ order }) => {
  const [showDetails, setShowDetails] = useState(false);

  const { userId } = useParams();

  return (
    <>
      <tr>
        <td>
          <button onClick={() => setShowDetails(true)} className="text-blue-500">
            <Eye size={20} />
          </button>
        </td>
        <td>{order.productName}</td>
        {/* other summary fields here */}
      </tr>

      {showDetails && (
        <tr>
          <td colSpan="100%">
            <div className="bg-white p-4 rounded shadow-md mt-2 border border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold">Order Details</h2>
                <button
                  onClick={() => setShowDetails(false)}
                  className="text-sm px-2 py-1 bg-red-100 text-red-600 rounded"
                >
                  Close
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <img src={order.image} alt="Product" className="w-32 h-auto rounded" />
                </div>
                <div>
                  <p><strong>Product:</strong> {order.productName}</p>
                  <p><strong>Quantity:</strong> {order.quantity}</p>
                  <p><strong>Preorder Code:</strong> {order.code}</p>
                  <p><strong>Created:</strong> {order.date}</p>
                  <p><strong>Price:</strong> ${order.price}</p>
                  <p><strong>Prepayment:</strong> ${order.prepayment}</p>
                  <p><strong>Customer:</strong> {order.customer}</p>
                  <p><strong>Email:</strong> {order.email}</p>
                  <p><strong>Status:</strong> {order.status}</p>
                  <p><strong>Refund:</strong> {order.refund}</p>
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

// import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useLocation, useNavigate ,useParams} from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

const ViewDelayedPayment = () => {
    const navigate = useNavigate();
    // eslint-disable-next-line no-unused-vars
    const { userId } = useParams();
    const location = useLocation();
    const item = location.state?.order;

    const [isEditable, setIsEditable] = useState(false);
    const [image, setImage] = useState(null); // State to handle image

    const handleSave = () => {
        // You can implement the logic to save the changes (e.g., API call)
        console.log("Changes saved");
        setIsEditable(false);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file)); // Display the selected image
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
                {/* Back Button */}
                <div className="flex justify-start mb-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center text-blue-600 hover:underline"
                    >
                        <ArrowLeft size={20} className="mr-1" />
                        Back
                    </button>
                </div>

                {/* Heading */}
                <h2 className="text-xl font-inter text-gray-800 mb-6">Edit Delayed Prepayment</h2>

                {/* Form Grid */}
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="font-medium block mb-1">Product</label>
                        <input
                            type="text"
                            value={item?.product || ""}
                            disabled={!isEditable}
                            className="w-full border px-4 py-2 rounded-md bg-gray-100"
                        />
                    </div>

                    <div>
                        <label className="font-medium block mb-1">Quantity</label>
                        <input
                            type="text"
                            value={item?.quantity || ""}
                            disabled={!isEditable}
                            className="w-full border px-4 py-2 rounded-md bg-gray-100"
                        />
                    </div>

                    <div>
                        <label className="font-medium block mb-1">Preorder Code</label>
                        <input
                            type="text"
                            value={item?.preorder_code || ""}
                            disabled={!isEditable}
                            className="w-full border px-4 py-2 rounded-md bg-gray-100"
                        />
                    </div>

                    <div>
                        <label className="font-medium block mb-1">Created Date</label>
                        <input
                            type="text"
                            value={item?.created || ""}
                            disabled={!isEditable}
                            className="w-full border px-4 py-2 rounded-md bg-gray-100"
                        />
                    </div>

                    <div>
                        <label className="font-medium block mb-1">Price</label>
                        <input
                            type="text"
                            value={item?.price || ""}
                            disabled={!isEditable}
                            className="w-full border px-4 py-2 rounded-md bg-gray-100"
                        />
                    </div>

                    <div>
                        <label className="font-medium block mb-1">Prepayment</label>
                        <input
                            type="text"
                            value={item?.prepayment || ""}
                            disabled={!isEditable}
                            className="w-full border px-4 py-2 rounded-md bg-gray-100"
                        />
                    </div>

                    <div>
                        <label className="font-medium block mb-1">Customer Name</label>
                        <input
                            type="text"
                            value={item?.customer?.name || ""}
                            disabled={!isEditable}
                            className="w-full border px-4 py-2 rounded-md bg-gray-100"
                        />
                    </div>

                    <div>
                        <label className="font-medium block mb-1">Customer Email</label>
                        <input
                            type="email"
                            value={item?.customer?.email || ""}
                            disabled={!isEditable}
                            className="w-full border px-4 py-2 rounded-md bg-gray-100"
                        />
                    </div>

                    <div>
                        <label className="font-medium block mb-1">Status</label>
                        <input
                            type="text"
                            value={item?.status || ""}
                            disabled={!isEditable}
                            className="w-full border px-4 py-2 rounded-md bg-gray-100"
                        />
                    </div>

                    <div>
                        <label className="font-medium block mb-1">Refund</label>
                        <input
                            type="text"
                            value={item?.refund || ""}
                            disabled={!isEditable}
                            className="w-full border px-4 py-2 rounded-md bg-gray-100"
                        />
                    </div>

                    {/* Image Upload Input */}
                    {/* <div>
            <label className="font-medium block mb-1">Image</label>
            <input
              type="file"
              onChange={handleImageChange}
              disabled={!isEditable}
              className="w-5xl border px-4 py-2 rounded-md bg-gray-100"
            />
            {image && (
              <div className="mt-4">
                <img src={image} alt="Uploaded" className="max-w-xs max-h-48 object-cover" />
              </div>
            )}
          </div> */}
                </form>
                {/* Image Upload Input */}
                <div className="mt-3">
                    <label className="font-medium block mb-1">Image</label>
                    <input
                        type="file"
                        onChange={handleImageChange}
                        disabled={!isEditable}
                        className="w-full px-4 py-2 rounded-md bg-gray-100"
                    />
                    {image && (
                        <div className="mt-4">
                            <img src={image} alt="Uploaded" className="max-w-xs max-h-48 object-cover" />
                        </div>
                    )}
                </div>

                {/* Save Changes Button */}
                {isEditable && (
                    <div className="flex justify-end mt-6">
                        <button
                            onClick={handleSave}
                            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                        >
                            Save Changes
                        </button>
                    </div>
                )}

                {/* Edit Button */}
                {!isEditable && (
                    <div className="flex justify-end mt-4">
                        <button
                            onClick={() => setIsEditable(true)}
                            className="bg-blue-900 text-white py-2 px-4 rounded-md hover:bg-blue-800"
                        >
                            Edit
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ViewDelayedPayment;

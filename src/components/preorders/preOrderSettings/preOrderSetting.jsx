import { useState, useEffect } from "react";
import "./preOrderSetting.scss";
import { X } from "lucide-react";
// import Switch from "../../Switch";
// import apiInstance from '../../../utils/axios'
import axios from "axios";

export default function PreOrderSetting() {
  const [file, setFile] = useState({ name: "Choose file", src: "" });
  const [loading, setLoading] = useState(true);
  const [preOrderId, setPreOrderId] = useState(null);

  const [commission, setCommission] = useState({ amount: "", status: true });
  // eslint-disable-next-line no-unused-vars
  const [flatRate, setFlatRate] = useState("");

  // eslint-disable-next-line no-unused-vars
  const [marketingImage, setMarketingImage] = useState({
    name: "Choose file",
    src: "",
    file: null,
  });
  
  // eslint-disable-next-line no-unused-vars
  const [preorderInstructions, setPreorderInstructions] = useState("");

  // eslint-disable-next-line no-unused-vars
  const [paymentInstructions, setPaymentInstructions] = useState("");

  // eslint-disable-next-line no-unused-vars
  const [qrCode, setQrCode] = useState({
    name: "Choose file",
    src: "",
    file: null,
  });

  // Fetch settings on mount
  useEffect(() => {
    const fetchSettings = async () => {
      //  const res = await axios.get("/sellerpreorder-setting");
       const res = await axios.get("https://e-commerce-backend-1-0.onrender.com/api/sellerpreorder-setting");
        // const res = await apiInstance.get("/sellerpreorder-setting");
      if (res.data && res.data.length > 0) {
        const data = res.data[0];
        setPreOrderId(data._id);
        setCommission({
          amount: data.sellerCommission?.amount || "",
          status: data.sellerCommission?.status === "active",
        });
        setFlatRate(data.flatRateShipping || "");
        setMarketingImage({
          name: "Choose file",
          src: data.marketingImage || "",
          file: null,
        });
        setPreorderInstructions(data.preorderInstructions || "");
        setPaymentInstructions(data.paymentInstructions || "");
        setQrCode({
          name: "Choose file",
          src: data.paymentQRCode || "",
          file: null,
        });
      }
    };
    fetchSettings();
  }, []);

  const handleUpdate = async (field, payload, files = null) => {
    if (!preOrderId) return alert("Settings ID not found!");

    const formData = new FormData();
    if (files) {
      for (const key in files) {
        formData.append(key, files[key]);
      }
    }

    for (const key in payload) {
      formData.append(key, payload[key]);
    }

    //  `http://localhost:5000/api/sellerpreorder-setting/${preOrderId}`,
    try {
      await axios.put(
        `https://e-commerce-backend-1-0.onrender.com/api/sellerpreorder-setting/${preOrderId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert(`${field} updated successfully`);
    } catch (err) {
      console.error(err);
      alert(`Failed to update ${field}`);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile({
        name: selectedFile.name,
        src: URL.createObjectURL(selectedFile),
      });
    } else {
      setFile({ name: "Choose file", src: "" });
    }
  };

  return (
    <div className="PreOrderSetting ma10">
      <div className="preOrderSettingBox">
        <div className="preOrderBoxHead">
          <p className="preOrderBoxHeadText">Payment Instructions</p>
        </div>

        <div className="preOrderBoxLower">
          {/* Textarea 1 */}
          <div className="productBoxLowerdiv editorBox">
            <p className="productBoxLowerText">Preorder Request Instructions</p>
            {loading ? (
              <div className="skeleton fancy-textarea"></div>
            ) : (
              <textarea
                className="editor-container"
                placeholder="Enter your instructions here..."
              />
            )}
          </div>

          {/* File Upload */}
          <div className="productBoxLowerdiv">
            <p className="productBoxLowerText">Image For Payment QR Code</p>
            <div className="PreProductInputDiv">
              <label className="file-label">
                Browse
                <input
                  type="file"
                  className="file-input"
                  onChange={handleFileChange}
                />
              </label>
              <span className="file-name">{file.name}</span>
            </div>
          </div>

          {/* Image Preview */}
          <div className="productBoxLowerdiv">
            <div className="productBoxLowerText"></div>
            <div className="qrcode">
              {loading ? (
                <div className="skeleton fancy-image"></div>
              ) : file.src ? (
                <>
                  <img src={file.src} alt="QR Code" className="qrcodeimg" />
                  <div
                    onClick={() => setFile({ name: "", src: "" })}
                    className="crossImg"
                  >
                    <X size={18} color="blue" />
                  </div>
                </>
              ) : (
                <div className="placeholder-image">No image uploaded</div>
              )}
            </div>
          </div>

          {/* Textarea 2 */}
          <div className="productBoxLowerdiv editorBox">
            <p className="productBoxLowerText">Payment Instructions</p>
            {loading ? (
              <div className="skeleton fancy-textarea"></div>
            ) : (
              <textarea
                className="editor-container"
                placeholder="Enter the payment instructions..."
              />
            )}
          </div>

          {/* Button */}
          <div className="updateButtonBox">
            {loading ? (
              <div className="skeleton fancy-button"></div>
            ) : (
              <button className="updatePreOrderSetting" onClick={() =>
                handleUpdate("Seller Commission", {
                  sellerCommissionAmount: commission.amount,
                  sellerCommissionStatus: commission.status
                    ? "active"
                    : "inactive",
                })
              }>Update</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

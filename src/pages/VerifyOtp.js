// import React, { useState } from "react";
import React from "react";
// import { Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAdminContext } from "../adminContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function VerifyOtp() {
  const navigate = useNavigate();
  const { adminData, setAdminData } = useAdminContext();

  const handleChangeOtp = (e) => {
    e.preventDefault();

    const { name, value } = e.target;

    setAdminData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOtp = async (e) => {
    e.preventDefault();

    try {
      if (adminData.otp === adminData.mailOtp) {
        await signInWithEmailAndPassword(
          auth,
          adminData.email,
          adminData.password
        );
        navigate("/");
      } else {
        alert("Enter correct details");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
        {/* Left Side - Image */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-r from-pink-600 to-red-600 items-center justify-center p-10">
          <div className="text-center text-white">
            <img
              src="images/loginImg.webp"
              alt="ACTIVE ECOMMERCE CMS"
              className="w-full h-auto rounded-lg shadow-lg"
            />
            <h2 className="text-3xl font-bold mt-6">Verify Your Account</h2>
            <p className="mt-2 text-lg">Enter the OTP sent to your email.</p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              VERIFY YOUR ACCOUNT
            </h1>
            <p className="text-gray-600 mt-2">
              Enter the OTP sent to your email
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleOtp}>
            {/* OTP Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-gray-700">
                  OTP
                </span>
              </label>
              <div className="relative">
                {/* <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400 " />
                </div> */}
                <input
                  type="text"
                  className="w-full p-3   pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Enter OTP"
                  value={adminData.otp}
                  name="otp"
                  onChange={handleChangeOtp}
                  required
                />
              </div>
            </div>

            {/* Verify OTP Button */}
            <button
              type="submit"
              className="w-full p-3 bg-gradient-to-r from-pink-600 to-red-600 text-white font-semibold rounded-lg hover:from-pink-700 hover:to-red-700 transition-all"
            >
              Verify OTP
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default VerifyOtp;

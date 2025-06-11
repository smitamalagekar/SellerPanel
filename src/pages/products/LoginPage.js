import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import axios from "axios";
import { useAdminContext } from "../adminContext";
import api from "../utils/axios"

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { adminData, setAdminData } = useAdminContext();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setAdminData((prev) => ({
      ...prev,
      [name]: value,
    })); 
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const otpCode = Math.floor(100000 + Math.random() * 900000);
    await setAdminData((prev) => ({
      ...prev,
      mailOtp: otpCode,
    }));

    await api.post("/admin/send-mail-otp", {
      adminEmail: adminData.email,
      otp: otpCode,
    });

    navigate("/verify-otp");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-r from-blue-600 to-purple-600 items-center justify-center p-10">
          <div className="text-center text-white">
            <img
              src="images/loginImg.webp"
              alt="ACTIVE ECOMMERCE CMS"
              className="w-full h-auto rounded-lg shadow-lg"
            />
            <h2 className="text-3xl font-bold mt-6">Welcome Back!</h2>
            <p className="mt-2 text-lg">Login to access your admin panel.</p>
          </div>
        </div>

        <div className="w-full lg:w-1/2 p-8 sm:p-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome to Admin Panel
            </h1>
            <p className="text-gray-600 mt-2">Login to your account</p>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleLogin}>
            {/* Email Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-gray-700">
                  Email
                </span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="johndoe@example.com"
                  value={adminData.email}
                  name="email"
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-gray-700">
                  Password
                </span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Password"
                  value={adminData.password}
                  name="password"
                  onChange={handleInputChange}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-gray-100 rounded-full p-1 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-blue-600 rounded focus:ring-blue-500 transition-all"
                />
                <span className="ml-2 text-gray-600">Remember Me</span>
              </label>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

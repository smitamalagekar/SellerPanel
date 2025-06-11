import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Eye, EyeOff, Lock } from "lucide-react";
// import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { RecaptchaVerifier } from "firebase/auth";
// import axios from "axios";
import { useAdminContext } from "../adminContext";
import api from "../utils/axios";
// import loginImage from "../assets/side.png";
import { auth } from "../firebase";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { adminData, setAdminData } = useAdminContext();
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState("");
  const [isEmail, setIsEmail] = useState(null);

   // eslint-disable-next-line no-unused-vars
  const [loginType, setLoginType] = useState("email"); // 'email' or 'mobile'

   // eslint-disable-next-line no-unused-vars
  const [otpSent, setOtpSent] = useState(false);

   // eslint-disable-next-line no-unused-vars
  const [showOtp, setShowOtp] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.includes("@")) {
      setIsEmail(true);
      setAdminData(prev => ({
        ...prev,
        "email": value
      }));
    } else if (/^\d{10}$/.test(value)) {
      setIsEmail(false);
      setAdminData(prev => ({
        ...prev,
        "phone": value
      }));
    } else {
      setIsEmail(null);
    }
  };

  useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth, "recaptcha-container", {
      size: "invisible",
      callback: function (response) {
        console.log("Captcha Resolved");
      },
      defaultCountry: "IN",
    });
  }, []);

   // eslint-disable-next-line no-unused-vars
  // const handleSendOtp = async (e) => {
  //   e.preventDefault();
  //   if (adminData.phone.length !== 10) {
  //     alert("Enter a valid 10-digit phone number");
  //     return;
  //   }
  //   try {
  //     const appVerifier = window.recaptchaVerifier;
  //     const result = await signInWithPhoneNumber(auth, `+91${adminData.phone}`, appVerifier);
  //     setOtpSent(true);
  //     setShowOtp(true);
  //     alert("OTP sent!");
  //     navigate("/otpverify");
  //   } catch (err) {
  //     alert("Error: " + err.message);
  //     console.log(err);
  //   }
  // };

   // eslint-disable-next-line no-unused-vars
  const handleSendOtpMail = async (e) => {
    e.preventDefault();
    try {
      const otpCode = Math.floor(100000 + Math.random() * 900000);
      await setAdminData(prev => ({
        ...prev,
        mailOtp: otpCode
      }));

      await api.post("/user/send-mail-otp", {
        userEmail: adminData.email,
        userName: adminData.firstName,
        otp: otpCode
      });

      navigate("/otpverify");
    } catch (err) {
      console.log(err);
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setAdminData((prev) => ({
      ...prev,
      [name]: value
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

    navigate("/Verify-otp");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
        {/* Left Image Section */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-r from-pink-600 to-red-600 items-center justify-center p-10">
          <div className="text-center text-white">
            <img
              // src={loginImage}
              alt="Login Illustration"
              className="w-full h-auto rounded-lg shadow-lg"
            />
            <h2 className="text-3xl font-bold mt-6">Welcome Back!</h2>
            <p className="mt-2 text-lg">Login to access your seller panel.</p>
          </div>
        </div>

        {/* Right Form Section */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Welcome to Seller Panel</h1>
            <p className="text-gray-600 mt-2">Login to your account</p>
          </div>

          <form className="space-y-6" onSubmit={handleLogin}>
            {/* Email or Mobile Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-gray-700">Enter Email / Mobile</span>
              </label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="johndoe@example.com or 1234567890"
                value={inputValue}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Password Input for Email Login */}
            {isEmail && (
              <>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium text-gray-700">Password</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Password"
                      value={adminData.password}
                      name="password"
                      onChange={handleInput}
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
              </>
            )}

            {/* Actions */}
            <div className="register-actions">
              <button
                type="submit"
                onClick={handleLogin}
                className="w-full p-3 bg-gradient-to-r from-pink-600 to-red-600 text-white font-semibold rounded-lg hover:from-pink-700 hover:to-red-700"
              >
                Send OTP
              </button>
              <p className="login-link text-center mt-4">
                NEW USER? <a href="/Signup" className="text-blue-500 hover:text-blue-700">SIGN UP</a>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* ReCAPTCHA container */}
      <div id="recaptcha-container"></div>
    </div>
  );
}

export default LoginPage;

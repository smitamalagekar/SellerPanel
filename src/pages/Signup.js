import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { Lock, Mail, Phone, User } from "lucide-react";
import { Lock, Mail, Phone } from "lucide-react";

function RegisterPage() {
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleRegister = (e) => {
        e.preventDefault();

        if (userData.password !== userData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        // Submit logic here
        console.log("Registering user:", userData);
        navigate("/otpverify");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
                <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-r from-pink-600 to-red-600 items-center justify-center p-10">
                    <div className="text-center text-white">
                        <img
                            src="/images/loginImg.webp"
                            alt="ACTIVE ECOMMERCE CMS"
                            className="w-full h-auto rounded-lg shadow-lg"
                        />
                        <h2 className="text-3xl font-bold mt-6">Welcome!</h2>
                        <p className="mt-2 text-lg">Join us to explore amazing features.</p>
                    </div>
                </div>

                <div className="w-full lg:w-1/2 p-8 sm:p-12">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
                        <p className="text-gray-600 mt-2">Register to get started</p>
                    </div>

                    <form className="space-y-5" onSubmit={handleRegister}>
                        {/* First Name */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">First Name</label>
                            <div className="relative">
                               
                                <input
                                    type="text"
                                    name="firstName"
                                    value={userData.firstName}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full p-3 pl-14 border border-gray-300 rounded-lg"
                                    placeholder="Enter your first name"
                                />
                            </div>
                        </div>

                        {/* Last Name */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Last Name</label>
                            <div className="relative">
                                {/* <User className="absolute top-3.5 left-4 text-gray-400 w-5 h-5" /> */}
                                <input
                                    type="text"
                                    name="lastName"
                                    value={userData.lastName}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full p-3 pl-14 border border-gray-300 rounded-lg"
                                    placeholder=" last name"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-gray-700 font-medium">Email</label>
                            <div className="relative">
                                <Mail className="absolute top-3 left-3 text-gray-400" />
                                <input
                                    type="email"
                                    name="email"
                                    value={userData.email}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full p-3 pl-10 border border-gray-300 rounded-lg"
                                    placeholder="example@email.com"
                                />
                            </div>
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-gray-700 font-medium">Phone</label>
                            <div className="relative">
                                <Phone className="absolute top-3 left-3 text-gray-400" />
                                <input
                                    type="tel"
                                    name="phone"
                                    value={userData.phone}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full p-3 pl-10 border border-gray-300 rounded-lg"
                                    placeholder="1234567890"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-gray-700 font-medium">Password</label>
                            <div className="relative">
                                <Lock className="absolute top-3 left-3 text-gray-400" />
                                <input
                                    type="password"
                                    name="password"
                                    value={userData.password}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full p-3 pl-10 border border-gray-300 rounded-lg"
                                    placeholder="******"
                                />
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-gray-700 font-medium">Confirm Password</label>
                            <div className="relative">
                                <Lock className="absolute top-3 left-3 text-gray-400" />
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={userData.confirmPassword}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full p-3 pl-10 border border-gray-300 rounded-lg"
                                    placeholder="******"
                                />
                            </div>
                        </div>

                        {/* Terms */}
                        <div className="flex items-center space-x-2">
                            <input type="checkbox" required className="form-checkbox h-4 w-4 text-blue-600" />
                            <span className="text-gray-600 text-sm">
                                By continuing, you agree to our Terms and Conditions
                            </span>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full p-3 bg-gradient-to-r from-pink-600 to-red-600 text-white font-semibold rounded-lg hover:from-pink-700 hover:to-red-700 transition-all"
                        >
                            Register
                        </button>

                        <p className="text-center text-sm mt-4 text-gray-600">
                            Already have an account?{" "}
                            <a href="/login" className="text-blue-600 font-medium hover:underline">
                                Login
                            </a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;

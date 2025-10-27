import React, { useState, useEffect } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(backendUrl + "/api/user/admin", {
        email,
        password,
      });

      if (response.data.success) {
        setToken(response.data.token);
        toast.success("Login successful!");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error logging in!");
    }
  };

  useEffect(() => {
    setEmail("admin@example.com");
    setPassword("admin1234");
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6">
      <div className="bg-white shadow-lg rounded-2xl px-6 py-8 w-full max-w-sm sm:max-w-md">
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">
          Admin Panel Login
        </h1>

        {/* Form */}
        <form onSubmit={onSubmitHandler} className="flex flex-col gap-4">
          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Email Address
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-lg w-full px-3 py-2 text-sm sm:text-base border border-gray-300 outline-none focus:ring-2 focus:ring-black"
              type="email"
              placeholder="your@email.com"
              value={email}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-lg w-full px-3 py-2 text-sm sm:text-base border border-gray-300 outline-none focus:ring-2 focus:ring-black"
              type="password"
              placeholder="••••••••"
              value={password}
              required
            />
          </div>

          {/* Button */}
          <button
            className="mt-4 w-full py-2 sm:py-3 rounded-lg text-sm sm:text-base font-medium text-white bg-black hover:bg-white hover:text-black hover:border hover:border-black transition-all duration-500"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;


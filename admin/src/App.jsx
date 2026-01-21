import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Routes, Route, Navigate } from "react-router-dom";
import Add from "./pages/Add";
import List from "./pages/List";
import AdminSlider from "./pages/AdminSlider";
import Orders from "./pages/Orders";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";


export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = "PKR ";

const App = () => {
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );

  // 🔄 naya state unread refresh ke liye
  const [refreshUnread, setRefreshUnread] = useState(false);

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} />
          <hr />
          <div className="flex w-full">
            {/* 🟢 refreshUnread pass karo */}
            <Sidebar refreshUnread={refreshUnread}  setRefreshUnread={setRefreshUnread}/>

            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
              <Routes>
                <Route path="/" element={<Navigate to="/add" replace />} />
                <Route path="/add" element={<Add token={token} />} />
                <Route path="/list" element={<List token={token} />} />
                <Route path="/admin-slider" element={<AdminSlider token={token} />} />
                {/* 🟢 setRefreshUnread pass karo */}
                <Route
                  path="/orders"
                  element={<Orders token={token} setRefreshUnread={setRefreshUnread} />}
                />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;


import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/admin_assets/assets";
import { Menu } from "lucide-react"; // for mobile toggle icon
import { useEffect } from "react";
import { backendUrl } from "../App";


const Sidebar = ({ refreshUnread, setRefreshUnread }) => {
  const [open, setOpen] = useState(false); // for mobile menu toggle
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchUnread = async () => {
      try {
        const res = await fetch(backendUrl + "/api/order/unread-count", {
          headers: { token: localStorage.getItem("token") },
        });
        const data = await res.json();
        if (data.success) setUnreadCount(data.count);
      } catch (error) {
        console.error("Error fetching unread orders:", error);
      }
    };

    fetchUnread();
    const interval = setInterval(fetchUnread, 15000); // refresh every 15s
    return () => clearInterval(interval);
  }, []);

useEffect(() => {
  if (refreshUnread) {
    const fetchUnread = async () => {
      try {
        const res = await fetch(backendUrl + "/api/order/unread-count", {
          headers: { token: localStorage.getItem("token") },
        });
        const data = await res.json();
        if (data.success) setUnreadCount(data.count);
      } catch (error) {
        console.error("Error refreshing unread count:", error);
      } finally {
        setRefreshUnread(false);
      }
    };
    fetchUnread();
  }
}, [refreshUnread]);


  return (
    <>
      {/* Sidebar for large screens */}
      <div className="hidden md:flex w-[18%] min-h-screen border-r-2 bg-white shadow-sm">
        <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
          <NavLink
            className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l hover:bg-gray-100"
            to="/add"
          >
            <img className="w-5 h-5" src={assets.add_icon} alt="add-icon" />
            <p>Add Items</p>
          </NavLink>
          <NavLink
            className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l hover:bg-gray-100"
            to="/list"
          >
            <img className="w-5 h-5" src={assets.order_icon} alt="list-icon" />
            <p>List Items</p>
          </NavLink>
         <NavLink
  className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l hover:bg-gray-100 relative"
  to="/orders"
>
  <img className="w-5 h-5" src={assets.order_icon} alt="order-icon" />
  <p>Orders</p>

  {/* 🔴 Unread count badge */}
  {unreadCount > 0 && (
    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] px-1.5 py-0.5 rounded-full">
      {unreadCount}
    </span>
  )}
</NavLink>

        </div>
      </div>

      {/* Sidebar toggle button for mobile */}
      <div className="md:hidden fixed top-4 left-1 z-50">
        <button
          onClick={() => setOpen(!open)}
          className="bg-gray-800 text-white p-2 rounded-md"
        >
          <Menu size={16} />
        </button>
      </div>

      {/* Sidebar for mobile (slide-in) */}
      <div
        className={`fixed top-0 left-0 h-full w-2/3 sm:w-1/2 bg-white border-r-2 shadow-lg transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-40`}
      >
        <div className="flex flex-col gap-4 pt-16 pl-6 text-[15px]">
          <NavLink
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-100"
            to="/add"
          >
            <img className="w-5 h-5" src={assets.add_icon} alt="add-icon" />
            <p>Add Items</p>
          </NavLink>
          <NavLink
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-100"
            to="/list"
          >
            <img className="w-5 h-5" src={assets.order_icon} alt="list-icon" />
            <p>List Items</p>
          </NavLink>
          <NavLink
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-100"
            to="/orders"
          >
            <img className="w-5 h-5" src={assets.order_icon} alt="order-icon" />
            <p>Orders</p>
          </NavLink>
        </div>
      </div>

      {/* Overlay when sidebar open */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
        ></div>
      )}
    </>
  );
};

export default Sidebar;


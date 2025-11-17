import React from "react";
import { assets } from "../assets/frontend_assets/assets";
import { Link } from "react-router-dom";


const Footer = () => {
  return (
    <div className="px-6 sm:px-12 lg:px-24 text-gray-700">
      {/* Main Footer Grid */}
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-10 sm:gap-14 my-10 mt-24 text-sm sm:text-base">
        {/* Logo + About */}
        <div>
          <img src={assets.logo} className="mb-5 w-28 sm:w-36" alt="logo" />
          <p className="w-full md:w-3/4 text-gray-600 text-xs sm:text-sm leading-relaxed">
            Welcome to <span className="font-semibold text-black">Jamal Collection</span> —
            your go-to destination for stylish fashion and premium quality.
            We bring you the latest trends, crafted with care and delivered
            with love, straight to your doorstep.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <p className="text-lg sm:text-xl font-semibold mb-4">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600 text-xs sm:text-sm">
            <li className="cursor-pointer hover:text-black transition"><Link to="/return-refund-policy" className="hover:underline">Return Refund Policy
</Link></li>
            <li className="cursor-pointer hover:text-black transition"><Link to="/shipping-policy" className="hover:underline">
  Shipping Policy
</Link></li>
            <li className="cursor-pointer hover:text-black transition"><Link to="/terms-and-conditions" className="hover:underline">
  Terms & Conditions
</Link>
</li>
            <li className="cursor-pointer hover:text-black transition"><Link to="/privacy-policy" className="hover:underline">
  Privacy Policy
</Link>
</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <p className="text-lg sm:text-xl font-semibold mb-4">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600 text-xs sm:text-sm">
            <li> +92-3105087313</li>
            <li> @officialjamalcollection@gmail.com</li>
                <li>
      <a
        href="https://www.facebook.com/profile.php?id=61583732707640"
        target="_blank"
        rel="noopener noreferrer"
        className="cursor-pointer hover:text-black transition"
      >
        Facebook
      </a>
    </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div>
        <hr className="border-gray-300" />
        <p className="py-4 text-[10px] sm:text-sm text-center text-gray-500">
          © {new Date().getFullYear()} Jamal Collection Store — Designed & Developed by Muhammad Bilal.  
          All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;

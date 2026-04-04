import React from "react";
import { assets } from "../assets/frontend_assets/assets";
import { Link } from "react-router-dom";
import LazyImage from "./LazyImage";

const Footer = () => {
  return (
    <footer className="bg-[#121212] pt-16 sm:pt-24 pb-8 border-t-[3px] border-[#C5A059]">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-24">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-12 sm:gap-16 mb-16">
          
          {/* Column 1: Brand Info */}
          <div className="flex flex-col items-start">
            {/* Note: Agar dark background par logo black hai, to 'brightness-0 invert' class use karein taake wo white ho jaye. Agar logo gold/white hai to us class ko hata dein. */}
            <div className="bg-white/5 p-4 rounded-xl backdrop-blur-sm mb-6 border border-white/10">
              <LazyImage src={assets.logo} className="w-28 sm:w-36" alt="Jamal Collection Logo" />
            </div>
            
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-sm tracking-wide">
              Welcome to <span className="text-[#C5A059] font-medium">Jamal Collection</span> —
              your go-to destination for stylish fashion and premium quality.
              We bring you the latest trends, crafted with care and delivered
              with love, straight to your doorstep.
            </p>
          </div>

          {/* Column 2: Company Links */}
          <div>
            <h3 className="text-white text-xs sm:text-sm font-bold tracking-[0.2em] uppercase mb-6">
              Company
            </h3>
            <ul className="flex flex-col gap-4 text-gray-400 text-xs sm:text-sm">
              {[
                { name: 'Return Refund Policy', path: '/return-refund-policy' },
                { name: 'Shipping Policy', path: '/shipping-policy' },
                { name: 'Terms & Conditions', path: '/terms-and-conditions' },
                { name: 'Privacy Policy', path: '/privacy-policy' }
              ].map((link, i) => (
                <li key={i} className="group flex items-center">
                  {/* Advanced Hover Sliding Line */}
                  <span className="w-0 h-[1px] bg-[#C5A059] mr-0 transition-all duration-300 group-hover:w-4 group-hover:mr-3"></span>
                  <Link to={link.path} className="group-hover:text-[#C5A059] transition-colors duration-300">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-white text-xs sm:text-sm font-bold tracking-[0.2em] uppercase mb-6">
              Get In Touch
            </h3>
            <ul className="flex flex-col gap-4 text-gray-400 text-xs sm:text-sm">
              
              {/* Phone */}
              <li className="flex items-start gap-3 hover:text-white transition-colors duration-300">
                <svg className="w-5 h-5 text-[#C5A059] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                </svg>
                <span className="tracking-widest">+92-3105087313</span>
              </li>
              
              {/* Email */}
              <li className="flex items-start gap-3 hover:text-white transition-colors duration-300">
                <svg className="w-5 h-5 text-[#C5A059] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
                <span className="tracking-wider">officialjamalcollection@gmail.com</span>
              </li>
              
              {/* Facebook */}
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-[#C5A059] shrink-0" fill="currentColor" viewBox="0 0 24 24">
                   <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                </svg>
                <a
                  href="https://www.facebook.com/profile.php?id=61583732707640"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#C5A059] transition-colors duration-300 tracking-widest"
                >
                  Facebook
                </a>
              </li>
              
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Area */}
        <div className="pt-8 border-t border-gray-800/80 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-widest text-center md:text-left">
            © {new Date().getFullYear()} <span className="text-[#C5A059]">Jamal Collection</span>. All Rights Reserved.
          </p>
          <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-widest text-center md:text-right">
            Designed & Developed by <span className="text-white font-medium">Muhammad Bilal</span>.
          </p>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;

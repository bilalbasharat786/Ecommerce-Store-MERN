// frontend/src/components/ScrollToTop.jsx

import React, { useEffect, useState } from "react";
import { assets } from "../assets/frontend_assets/assets"; // Arrow icon agar assets ma ha to use kro, warna nechy SVG hai

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // 1. Calculate Scroll Progress
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      
      const scrollValue = totalHeight > 0 ? (currentScroll / totalHeight) * 100 : 0;
      setScrollProgress(scrollValue);

      // 2. Show/Hide Button
      if (currentScroll > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Circle properties for SVG
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <div
      className={`fixed bottom-5 right-5 z-50 transition-all duration-300 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div
        onClick={scrollToTop}
        className="relative w-12 h-12 flex items-center justify-center cursor-pointer group"
      >
        {/* Progress Circle (SVG) */}
        <svg className="w-full h-full -rotate-90 transform" width="100" height="100">
          {/* Grey Background Circle */}
          <circle
            cx="24"
            cy="24"
            r={radius}
            className="stroke-gray-200"
            strokeWidth="3"
            fill="none"
          />
          {/* Filling Circle (Black) */}
          <circle
            cx="24"
            cy="24"
            r={radius}
            className="stroke-black transition-all duration-100 ease-out"
            strokeWidth="3"
            fill="none"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: strokeDashoffset,
            }}
          />
        </svg>

        {/* Arrow Icon in Center */}
        <div className="absolute text-lg font-bold text-black">
          ↑
          {/* Agar tumhare paas arrow image hai to <img> tag use krlo */}
          {/* <img src={assets.arrow_icon} className="w-4" /> */}
        </div>
      </div>
    </div>
  );
};

export default ScrollToTop;
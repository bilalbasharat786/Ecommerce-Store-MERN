import React, { useEffect, useState } from "react";
import { assets } from "../assets/frontend_assets/assets"; // Arrow icon agar assets ma ha

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      
      const scrollValue = totalHeight > 0 ? (currentScroll / totalHeight) * 100 : 0;
      setScrollProgress(scrollValue);

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

  return (
    <div
      className={`fixed bottom-5 right-5 z-50 transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {/* Main Circle Container */}
      <div
        onClick={scrollToTop}
        className="relative w-12 h-12 rounded-full border-2 border-black overflow-hidden cursor-pointer shadow-lg bg-white group"
      >
        
        {/* 🌊 The WAVE (Liquid Fill) */}
        <div
          className="absolute left-0 w-full bg-black transition-all duration-100 ease-linear"
          style={{
            bottom: `${scrollProgress}%`, // Jitna scroll, utna neechay se start hoga
            height: "150%", // Thoda lamba taake wave ghoome
            borderRadius: "40%", // Ye shape wave banati hai jab ghoomti hai
            animation: "spin 4s linear infinite", // Wave animation
            transform: "translateY(50%)", // Position adjust
          }}
        ></div>

        {/* ⬆️ Arrow Icon */}
        <div 
            className="absolute inset-0 flex items-center justify-center font-bold text-xl pointer-events-none"
            style={{ mixBlendMode: "difference", color: "white" }} 
        >
          {/* Arrow Symbol */}
           ↑
           {/* Agar image use karni hai to neeche wali line uncomment karo aur uper wala arrow hata do */}
           {/* <img src={assets.arrow_icon} className="w-4 invert" alt="arrow" /> */}
        </div>
      </div>

      {/* CSS Animation for Wave */}
      <style jsx>{`
        @keyframes spin {
          0% {
            transform: translateY(50%) rotate(0deg);
          }
          100% {
            transform: translateY(50%) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default ScrollToTop;
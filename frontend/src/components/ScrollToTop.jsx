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
      
      // Calculate percentage 0 to 100
      const scrollValue = totalHeight > 0 ? (currentScroll / totalHeight) * 100 : 0;
      setScrollProgress(scrollValue);

      // Button kab dikhana hai (100px scroll ke baad)
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
      <div
        onClick={scrollToTop}
        className="relative w-12 h-12 rounded-full border-2 border-black overflow-hidden cursor-pointer shadow-lg bg-white"
      >
        
        {/* ⚫ SOLID BLACK FILL (Seedha Uper Jayega) */}
        <div
          className="absolute bottom-0 left-0 w-full bg-black transition-all duration-75 ease-linear"
          style={{
            height: `${scrollProgress}%`, // Jitna scroll, utni height
          }}
        ></div>

        {/* ⬆️ Arrow Icon (Color auto change hoga) */}
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
    </div>
  );
};

export default ScrollToTop;
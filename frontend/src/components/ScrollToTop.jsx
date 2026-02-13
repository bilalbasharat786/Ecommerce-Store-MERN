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
        className="relative w-12 h-12 rounded-full  overflow-hidden cursor-pointer shadow-lg bg-[#ffffff]"
      >
        
        {/* ⚫ SOLID BLACK FILL (Seedha Uper Jayega) */}
        <div
          className="absolute bottom-0 left-0 w-full bg-black transition-all duration-75 ease-linear"
          style={{
            height: `${scrollProgress}%`, // Jitna scroll, utni height
          }}
        ></div>

       {/* ⬆️ Double Arrow Icon (SVG) */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ mixBlendMode: "difference", color: "white" }}
        >
          {/* Ye SVG wo 2 Arrows banayega jo tumne mangi hain */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2} // Thoda mota kiya taake clear nazar aye
            stroke="currentColor"
            className="w-3 h-3"
          >
            {/* Arrow 1 (Upar wala) */}
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75 12 5.25l7.5 7.5" />
            {/* Arrow 2 (Neeche wala) */}
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 18.75 12 11.25l7.5 7.5" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ScrollToTop;
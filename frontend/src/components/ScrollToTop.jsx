import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;

      // Ensure progress is between 0 and 100
      const scrollValue = totalHeight > 0 ? (currentScroll / totalHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, scrollValue)));

      // Show button after scrolling down 150px
      if (currentScroll > 150) {
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

  // SVG Circle Mathematics for Progress Ring
  const radius = 26; // Circle radius
  const circumference = 2 * Math.PI * radius; // Full circle length (~163.36)
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-6 right-6 sm:bottom-10 sm:right-10 z-[100]"
        >
          <div
            onClick={scrollToTop}
            className="relative w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center cursor-pointer group rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_4px_25px_rgba(197,160,89,0.3)] transition-shadow duration-300"
          >
            {/* SVG Circular Progress Background & Track */}
            <svg 
              className="absolute inset-0 w-full h-full transform -rotate-90" 
              viewBox="0 0 60 60"
            >
              {/* Inner Charcoal Background */}
              <circle
                cx="30"
                cy="30"
                r={radius}
                fill="#121212"
                stroke="#2A2A2A"
                strokeWidth="2"
                className="transition-colors duration-300 group-hover:fill-[#1A1A1A]"
              />
              {/* Dynamic Gold Progress Ring */}
              <circle
                cx="30"
                cy="30"
                r={radius}
                fill="transparent"
                stroke="#C5A059"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-100 ease-linear"
              />
            </svg>

            {/* Elegant Up Arrow Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="absolute w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:text-[#C5A059] group-hover:-translate-y-1 transition-all duration-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18"
              />
            </svg>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
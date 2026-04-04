import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import { backendUrl } from "../App.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LazyImage from "../components/LazyImage";
import { motion } from "framer-motion"; // Framer motion import kiya

// Premium Next Arrow
const NextArrow = ({ onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1, backgroundColor: "#C5A059", borderColor: "#C5A059" }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-black/20 backdrop-blur-sm border border-white/50 cursor-pointer z-10 transition-colors duration-300 shadow-lg group"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:translate-x-1">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
    </motion.div>
  );
};

// Premium Prev Arrow
const PrevArrow = ({ onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1, backgroundColor: "#C5A059", borderColor: "#C5A059" }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-black/20 backdrop-blur-sm border border-white/50 cursor-pointer z-10 transition-colors duration-300 shadow-lg group"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:-translate-x-1">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
      </svg>
    </motion.div>
  );
};

const Hero = () => {
  const [slides, setSlides] = useState([]);

  const fetchSliderImages = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/slider/list`);
      setSlides(data);
    } catch (error) {
      console.error("Slider fetch error:", error);
    }
  };

  useEffect(() => {
    fetchSliderImages();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 800, // Thoda slow aur smooth transition ke liye
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500, // Premium sliders slightly slow chalte hain
    pauseOnHover: true,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    dotsClass: "slick-dots premium-dots", // Naya class name
  };

  return (
    <div className="w-full relative z-0 pb-8 bg-[#FAFAFA]">
      {/* Premium Dots Styling */}
      <style>
        {`
          .premium-dots {
            bottom: 20px; /* Dots ko image ke andar/upar laye hain */
            z-index: 10;
            display: flex !important;
            justify-content: center;
            align-items: center;
          }
          .premium-dots li {
            width: auto;
            margin: 0 4px;
          }
          .premium-dots li button {
            width: 30px;
            height: 3px;
            padding: 0;
            background-color: rgba(255, 255, 255, 0.5);
            border-radius: 4px;
            transition: all 0.4s ease;
          }
          .premium-dots li button:before {
            display: none; /* Purane gol dots hide kar diye */
          }
          .premium-dots li.slick-active button {
            background-color: #C5A059; /* Active dot Gold color ka */
            width: 50px; /* Active hone par lamba ho jayega */
          }
        `}
      </style>

      <div className="relative group">
        <Slider {...settings}>
          {slides.map((slide) => (
            <div key={slide._id} className="relative w-full outline-none">
              <div className="w-full aspect-[16/9] sm:aspect-[21/9] md:aspect-[24/9] max-h-[85vh] relative overflow-hidden">
                <LazyImage
                  src={slide.image}
                  w={1500}
                  h={625}
                  className="w-full h-full object-cover transform transition-transform duration-[10s] hover:scale-105" // Bhoot smooth zoom effect on hover
                  alt="slider"
                />
                {/* Subtle dark gradient overlay at bottom for dots visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Hero;















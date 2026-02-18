import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import { backendUrl } from "../App.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LazyImage from "../components/LazyImage";

// ⭐ UPDATED: NextArrow Component (Right Side Bar)
const NextArrow = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      // ✨ CHANGES HERE: Increased height (h-24/h-32), kept width narrow (w-8/w-10), positioned exactly right-0.
      // Using bg-black/30 for semi-transparent black look.
      className="absolute flex right-0 top-1/2 -translate-y-1/2
      bg-black/30 hover:bg-black/50 w-8 sm:w-10 h-24 sm:h-32 rounded-l-md items-center justify-center
      cursor-pointer z-10 transition-colors duration-300"
    >
      {/* ✨ Thicker white icon */}
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="white" className="w-5 h-5 sm:w-6 sm:h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
    </div>
  );
};

// ⭐ UPDATED: PrevArrow Component (Left Side Bar)
const PrevArrow = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      // ✨ CHANGES HERE: Symmetric styling for the left side. Positioned exactly left-0.
      className="absolute flex left-0 top-1/2 -translate-y-1/2
      bg-black/30 hover:bg-black/50 w-8 sm:w-10 h-24 sm:h-32 rounded-r-md items-center justify-center
      cursor-pointer z-10 transition-colors duration-300"
    >
      {/* ✨ Thicker white icon */}
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="white" className="w-5 h-5 sm:w-6 sm:h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
      </svg>
    </div>
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
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    dotsClass: "slick-dots custom-dots",
  };

  return (
    <div className="w-full overflow-hidden relative z-0 pb-10">
      <style>
        {`
          .custom-dots li button:before {
            font-size: 12px;
            color: black !important;
            opacity: 0.7;
          }
          .custom-dots li.slick-active button:before {
            color: black !important;
            opacity: 1;
          }
        `}
      </style>

      <Slider {...settings}>
        {slides.map((slide) => (
          <div
            key={slide._id}
            // Ensure the container handles the image correctly
            className="relative w-full flex justify-center items-center"
          >
             {/* Using aspect-ratio to prevent layout shift and ensure consistent height */}
            <div className="w-full aspect-[16/9] sm:aspect-[21/9] md:aspect-[24/9] max-h-[80vh]">
                <LazyImage
                src={slide.image}
                w={1500}
                h={625}
                className="w-full h-full object-cover"
                alt="slider"
                />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Hero;















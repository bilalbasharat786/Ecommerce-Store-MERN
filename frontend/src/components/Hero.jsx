import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import { backendUrl } from "../App.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LazyImage from "../components/LazyImage";


// ===========================
// Custom White Round Arrows (Show on Hover)
// ===========================
const NextArrow = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="absolute hidden group-hover:flex right-5 top-1/2 -translate-y-1/2
      bg-white shadow-xl w-10 h-10 rounded-full items-center justify-center
      cursor-pointer z-10 transition-opacity duration-300"
    >
      <span className="text-black text-xl">{">"}</span>
    </div>
  );
};

const PrevArrow = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="absolute hidden group-hover:flex left-5 top-1/2 -translate-y-1/2
      bg-white shadow-xl w-10 h-10 rounded-full items-center justify-center
      cursor-pointer z-10 transition-opacity duration-300"
    >
      <span className="text-black text-xl">{"<"}</span>
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

  // ===========================
  // Slick Slider Settings
  // ===========================
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
    <div className="w-full overflow-hidden relative z-0 pb-10 group">

      {/* Custom dots styling */}
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

    {slides.length === 0 && (
    <div className="w-full aspect-[12/5] bg-gray-200 animate-pulse" />
  )}

  {slides.length > 0 && (
    <Slider {...settings}>
      {slides.map((slide) => (
        <div key={slide._id} className="relative w-full aspect-[12/5]">
          <LazyImage
            src={slide.image}
            w={1500}
            h={625}
            alt="slider"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      ))}
    </Slider>
    )}
    </div>
  );
};

export default Hero;















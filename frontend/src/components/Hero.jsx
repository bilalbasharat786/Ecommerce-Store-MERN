import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import { backendUrl } from "../App.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LazyImage from "../components/LazyImage";

// ⭐ UPDATED: NextArrow (Right Circular Button)
const NextArrow = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      // ✨ CHANGES: Circle Shape (w-10 h-10 rounded-full), White Background, Shadow
      className="absolute flex right-5 top-1/2 -translate-y-1/2
      bg-white w-10 h-10 rounded-full items-center justify-center shadow-lg
      cursor-pointer z-10 hover:bg-gray-100 transition-all duration-300"
    >
      {/* Icon Color: Black */}
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="black" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
    </div>
  );
};

// ⭐ UPDATED: PrevArrow (Left Circular Button)
const PrevArrow = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      // ✨ CHANGES: Circle Shape, White Background, Shadow
      className="absolute flex left-5 top-1/2 -translate-y-1/2
      bg-white w-10 h-10 rounded-full items-center justify-center shadow-lg
      cursor-pointer z-10 hover:bg-gray-100 transition-all duration-300"
    >
      {/* Icon Color: Black */}
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="black" className="w-5 h-5">
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
            className="relative w-full flex justify-center items-center"
          >
             {/* Using aspect-ratio for consistent sizing */}
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















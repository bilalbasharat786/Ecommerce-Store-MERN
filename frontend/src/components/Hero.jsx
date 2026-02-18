import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import { backendUrl } from "../App.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LazyImage from "../components/LazyImage";

// ⭐ UPDATED: NextArrow Component (Right Side)
const NextArrow = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      // Changes: Removed 'hidden group-hover', changed bg to semi-transparent black, rectangular shape, white icon
      className="absolute flex right-0 top-1/2 -translate-y-1/2
      bg-black/30 hover:bg-black/60 w-9 h-14 rounded-l-md items-center justify-center
      cursor-pointer z-10 transition-all duration-300"
    >
      {/* SVG Icon for Right Arrow */}
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 text-white">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
    </div>
  );
};

// ⭐ UPDATED: PrevArrow Component (Left Side)
const PrevArrow = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      // Changes: Removed 'hidden group-hover', changed bg to semi-transparent black, rectangular shape, white icon
      className="absolute flex left-0 top-1/2 -translate-y-1/2
      bg-black/30 hover:bg-black/60 w-9 h-14 rounded-r-md items-center justify-center
      cursor-pointer z-10 transition-all duration-300"
    >
      {/* SVG Icon for Left Arrow */}
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 text-white">
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
    // Removed 'group' class from here as arrows are always visible now
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
            className="relative w-full flex justify-center items-center min-h-[300px] sm:min-h-[450px]"
          >
            <LazyImage
              src={slide.image}
              w={1500}
              h={625}
              className="w-full h-auto max-h-[100vh] object-cover"
              alt="slider"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Hero;















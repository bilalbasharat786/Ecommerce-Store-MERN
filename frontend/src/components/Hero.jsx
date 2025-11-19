import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import { backendUrl } from "../App.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: true,

    appendDots: (dots) => (
      <div className="absolute bottom-4 w-full flex justify-center z-20">
        <ul className="flex gap-2 bg-black/40 px-4 py-2 rounded-full">{dots}</ul>
      </div>
    ),

  };

  return (
    <div className="w-full overflow-hidden relative z-0">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div
            key={slide._id}
            className="relative w-full h-[90vh] sm:h-[85vh] md:h-[90vh] bg-black flex justify-center items-center"
          >
            <img
              src={slide.image}
              alt="slider"
              className="w-full h-full object-contain" 
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Hero;













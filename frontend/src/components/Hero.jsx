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

    
  };

  return (
    <div className="w-full overflow-hidden relative z-0">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div
            key={slide._id}
            className="relative w-full flex justify-center items-center"
          >
            <img
              src={slide.image}
              alt="slider"
              className="w-full h-auto max-h-[100vh] object-cover"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Hero;













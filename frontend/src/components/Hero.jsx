import React from "react";
import Slider from "react-slick";
import { assets } from "../assets/frontend_assets/assets";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Hero = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: true, // arrows enabled
    appendDots: dots => (
      <div>
        <ul className="mb-4"> {dots} </ul>
      </div>
    ),
  };

  const slides = [
    { id: 1, img: assets.hero_img },
    { id: 2, img: assets.hero_img2 },
    { id: 3, img: assets.hero_img3 },
  ];

  return (
    <div className="w-full overflow-hidden relative z-0">
      <Slider {...settings}>
        {slides.map(slide => (
          <div key={slide.id} className="relative w-full h-[90vh] flex justify-center items-center">
            <img src={slide.img} alt={`slide-${slide.id}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Hero;












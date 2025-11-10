import React from "react";
import Slider from "react-slick";
import { assets } from "../assets/frontend_assets/assets"; // Ensure path sahi ho

// Slick Carousel CSS
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
    pauseOnHover: false,
    arrows: true,
  };

  const slides = [
    {
      id: 1,
      img: assets.hero_img,
      // title: "Latest Arrivals",
      // subtitle: "Our Best Collection for You",
      // btnText: "Shop Now",
    },
    {
      id: 2,
      img: assets.hero_img2,
      // title: "New Fashion Trends",
      // subtitle: "Discover Modern Styles",
      // btnText: "Explore",
    },
    {
      id: 3,
      img: assets.hero_img3,
      // title: "Fresh Looks Every Day",
      // subtitle: "Step into Style",
      // btnText: "View Collection",
    },
  ];

  return (
    <div className="w-full overflow-hidden relative z-0">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="relative w-full h-[80vh] sm:h-[90vh] md:h-[85vh] lg:h-[90vh] flex justify-center items-center bg-black"
          >
            {/* Background Image */}
            <img
              src={slide.img}
              alt={slide.title}
              className="w-full h-full object-cover opacity-90"
            />

            {/* Overlay Text */}
            <div className="absolute inset-0 flex flex-col justify-center text-white px-5 sm:px-10 md:px-20 py-4 sm:py-8 bg-black/30">
              <h3 className="text-xs sm:text-lg font-light mb-1 sm:mb-3">
                {slide.subtitle}
              </h3>
              <h1 className="text-lg sm:text-5xl font-bold mb-2 sm:mb-6 max-w-[90%] sm:max-w-[500px] leading-snug sm:leading-tight">
                {slide.title}
              </h1>
              <button className="bg-white text-black px-3 py-1 sm:px-5 sm:py-2 text-xs sm:text-base font-medium w-fit hover:bg-black hover:text-white border transition-all">
                {slide.btnText}
              </button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Hero;











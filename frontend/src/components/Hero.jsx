import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";

const Hero = () => {
  const [slides, setSlides] = useState([]);

  const fetchSlides = async () => {
    const { data } = await axios.get("/api/slider/list");
    if (data.success) setSlides(data.images);
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    arrows: false,
  };

  return (
    <div className="w-full overflow-hidden relative z-0">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div
            key={slide._id}
            className="relative w-full h-auto sm:h-[90vh] md:h-[85vh] lg:h-[90vh] flex justify-center items-center bg-black"
          >
            <img
              src={slide.image}
              alt="Slider"
              className="w-full h-auto sm:h-full object-contain sm:object-cover opacity-90"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Hero;










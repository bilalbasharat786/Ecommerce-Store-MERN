import React, { useState, useEffect } from 'react';
// Images import
import img1 from '../assets/img_1.jpg';
import img2 from '../assets/img_2.jpg';
import img3 from '../assets/img_3.jpg';
import img4 from '../assets/img_4.jpg';
import img5 from '../assets/img_5.jpg';

const Gallery = () => {
  const [filter, setFilter] = useState('ALL');
  const [selectedImg, setSelectedImg] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Slider state
  const [activeSlide, setActiveSlide] = useState(0);

  const allImages = [
    { id: 1, src: img1, category: ['ALL', 'EVENTS', 'PARTY', 'HOLIDAYS'] },
    { id: 2, src: img2, category: ['ALL', 'EVENTS', 'PARTY', 'HOLIDAYS'] },
    { id: 3, src: img3, category: ['ALL', 'EVENTS', 'PARTY', 'HOLIDAYS'] },
    { id: 4, src: img4, category: ['ALL', 'EVENTS', 'PARTY'] },
    { id: 5, src: img5, category: ['ALL', 'EVENTS'] },
    { id: 6, src: img1, category: ['ALL'] },
    { id: 7, src: img2, category: ['ALL'] },
    { id: 8, src: img3, category: ['ALL'] },
  ];

  const slides = [
    {
      id: "01.",
      title: "Online Applications",
      img: img1,
      desc: "A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth."
    },
    {
      id: "02.",
      title: "Get Approval",
      img: img2,
      desc: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts."
    },
    {
      id: "03.",
      title: "Receive Your Funding",
      img: img3,
      desc: "Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean."
    }
  ];

  // Auto Slide Logic (5 Seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const filteredImages = allImages.filter(img => img.category.includes(filter));

  return (
    <section id="gallery" className="py-24 bg-white font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* --- Top Gallery Part --- */}
        <div className="text-center mb-12">
          <h2 className="text-orange-500 text-4xl md:text-5xl font-bold mb-12 text-center">Gallery</h2>
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {['ALL', 'EVENTS', 'PARTY', 'HOLIDAYS'].map((btn) => (
              <button key={btn} onClick={() => setFilter(btn)}
                className={`px-8 py-2 rounded-full text-xs font-bold tracking-widest transition-all ${
                  filter === btn ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600'
                }`}
              >
                {btn}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-32">
          {filteredImages.map((image, index) => (
            <div key={image.id} onClick={() => setSelectedImg(image.src)} className="overflow-hidden rounded-sm group cursor-pointer animate-fadeIn">
              <img src={image.src} className="w-full h-64 object-cover transform transition-transform group-hover:scale-110" alt="Gallery" />
            </div>
          ))}
        </div>

        {/* --- How It Works Slider Part --- */}
        <div className="text-center mb-20">
          <h2 className="text-orange-500 text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-400 font-light max-w-2xl mx-auto">
            A small river named Duden flows by their place and supplies it with the necessary regelialia.
          </p>
        </div>

        <div className="relative flex flex-col md:flex-row items-center gap-12 min-h-[450px]">
          {/* Left: Image with Orange Buttons */}
          <div className="w-full md:w-1/2 relative group">
            <div className="overflow-hidden rounded-sm shadow-xl">
              <img 
                src={slides[activeSlide].img} 
                alt="Step" 
                className="w-full h-[400px] object-cover transition-opacity duration-1000 ease-in-out" 
              />
            </div>
            {/* Orange Navigation Buttons */}
            <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 flex bg-orange-500 p-2 shadow-lg">
              <button 
                onClick={() => setActiveSlide((activeSlide - 1 + slides.length) % slides.length)}
                className="p-4 text-white hover:bg-orange-600 transition"
              >
                ←
              </button>
              <div className="w-[1px] bg-orange-400 my-2"></div>
              <button 
                onClick={() => setActiveSlide((activeSlide + 1) % slides.length)}
                className="p-4 text-white hover:bg-orange-600 transition"
              >
                →
              </button>
            </div>
          </div>

          {/* Right: Text Content */}
          <div className="w-full md:w-1/2 px-4 animate-fadeIn" key={activeSlide}>
            <h3 className="text-orange-500 text-5xl md:text-6xl font-bold mb-4">
              {slides[activeSlide].id} {slides[activeSlide].title}
            </h3>
            <p className="text-gray-500 text-lg leading-relaxed font-light mb-8">
              {slides[activeSlide].desc}
            </p>
            <button className="bg-orange-500 text-white px-10 py-4 rounded-full font-medium hover:bg-orange-600 transition shadow-md">
              Learn More
            </button>
          </div>
        </div>

      </div>

      {/* Lightbox logic wahi purana rahay ga */}
      {selectedImg && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4" onClick={() => setSelectedImg(null)}>
           <img src={selectedImg} className="max-w-full max-h-full object-contain shadow-2xl animate-zoomIn" alt="Large" />
           <button className="absolute top-5 right-10 text-white text-4xl">✕</button>
        </div>
      )}
    </section>
  );
};

export default Gallery;
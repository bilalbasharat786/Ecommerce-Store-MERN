import React from 'react';
import aboutUsImg from '../assets/aboutus.jpg';

const AboutUs = () => {
  return (
    // 'about-section' id navigation scroll ke liye hai
    <section id="about-section" className="py-24 bg-white font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="text-center mb-20">
          <h2 className="text-orange-500 text-4xl md:text-5xl font-bold mb-6">
            About Us
          </h2>
          <p className="max-w-3xl mx-auto text-gray-400 text-lg leading-relaxed font-light">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus minima neque tempora reiciendis.
          </p>
        </div>

        {/* Content Row */}
        <div className="flex flex-col md:flex-row items-center gap-16">
          
          {/* Left Side: Image */}
          <div className="w-full md:w-1/2 relative">
            {/* Background decorative circle (optional, like in some designs) */}
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-gray-50 rounded-full -z-10"></div>
            <img 
              src={aboutUsImg} 
              alt="Our Story" 
              className="w-full h-auto rounded-lg shadow-xl object-cover" 
            />
          </div>

          {/* Right Side: Text */}
          <div className="w-full md:w-1/2">
            <h3 className="text-3xl font-semibold text-gray-800 mb-6 leading-tight">
              We Solve Your Financial Problem
            </h3>
            <div className="space-y-6 text-gray-500 font-light leading-relaxed">
              <p>
                Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.
              </p>
              <p>
                A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutUs;
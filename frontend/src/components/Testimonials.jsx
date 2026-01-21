import React, { useState } from 'react';
// Assets se images import kar rahe hain
import p1 from '../assets/person_1.jpg';
import p2 from '../assets/person_2.jpg';
import p3 from '../assets/person_3.jpg';
import p4 from '../assets/person_4.jpg';

const Testimonials = () => {
  const [activeTab, setActiveTab] = useState(0);

  const reviews = [
    {
      name: "Robert Spears",
      img: p1,
      text: "“Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.”"
    },
    {
      name: "James Miller",
      img: p2,
      text: "“Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics.”"
    },
    {
      name: "Sarah Jenkins",
      img: p3,
      text: "“A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.”"
    },
    {
      name: "Linda Adams",
      img: p4,
      text: "“The Big Oxmox advised her not to do so, because there were thousands of bad Commas, wild Question Marks and devious Semikoli, but the Little Blind Text didn’t listen.”"
    }
  ];

  return (
    <section id="testimonials" className="py-24 bg-white font-sans overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center">
        
        {/* Main Heading */}
        <h2 className="text-orange-500 text-4xl md:text-5xl font-bold mb-16">
          Happy Customers
        </h2>

        {/* Content Wrapper - Animate on Change */}
        <div key={activeTab} className="animate-slideInRight">
          {/* Review Text */}
          <p className="text-gray-400 text-xl italic font-light leading-relaxed mb-10 max-w-3xl mx-auto">
            {reviews[activeTab].text}
          </p>

          {/* User Info (Image & Name) */}
          <div className="flex flex-col items-center">
            <img 
              src={reviews[activeTab].img} 
              alt={reviews[activeTab].name} 
              className="w-16 h-16 rounded-full object-cover mb-4 shadow-md"
            />
            <span className="text-gray-500 font-medium">
              {reviews[activeTab].name}
            </span>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-3 mt-12">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeTab === index ? 'bg-orange-500 scale-125' : 'bg-gray-200 hover:bg-gray-300'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
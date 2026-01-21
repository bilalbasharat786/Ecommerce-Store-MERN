import React from 'react';
// Assets se icons import kar rahe hain
import s1 from '../assets/services_1.svg';
import s2 from '../assets/services_2.svg';
import s3 from '../assets/services_3.svg';
import s4 from '../assets/services_4.svg';
import s5 from '../assets/services_5.svg';
import s6 from '../assets/services_6.svg';

const Services = () => {
  const serviceData = [
    {
      title: "Business Consulting",
      icon: s1,
      desc: "A small river named Duden flows by their place and supplies it with the necessary regelialia."
    },
    {
      title: "Credit Card",
      icon: s2,
      desc: "A small river named Duden flows by their place and supplies it with the necessary regelialia."
    },
    {
      title: "Income Monitoring",
      icon: s3,
      desc: "A small river named Duden flows by their place and supplies it with the necessary regelialia."
    },
    {
      title: "Insurance Consulting",
      icon: s4,
      desc: "A small river named Duden flows by their place and supplies it with the necessary regelialia."
    },
    {
      title: "Financial Investment",
      icon: s5,
      desc: "A small river named Duden flows by their place and supplies it with the necessary regelialia."
    },
    {
      title: "Financial Management",
      icon: s6,
      desc: "A small river named Duden flows by their place and supplies it with the necessary regelialia."
    }
  ];

  return (
    <section id="services-section" className="py-24  bg-gray-50 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="text-center mb-20">
          <h2 className="text-orange-500 text-4xl md:text-5xl font-bold mb-4">
            Our Services
          </h2>
        </div>

        {/* Services Grid - 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-16">
          {serviceData.map((service, index) => (
            <div key={index} className="flex flex-col items-start group">
              
              {/* Icon Container */}
              <div className="mb-6">
                <img 
                  src={service.icon} 
                  alt={service.title} 
                  className="w-16 h-16 object-contain" 
                />
              </div>

              {/* Text Content */}
              <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-orange-500 transition-colors">
                {service.title}
              </h3>
              
              <p className="text-gray-400 leading-relaxed mb-4 text-[15px] font-light">
                {service.desc}
              </p>

              {/* Learn More Link */}
              <a 
                href="#" 
                className="text-orange-500 text-sm font-medium hover:underline tracking-wide"
              >
                Learn More
              </a>
              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
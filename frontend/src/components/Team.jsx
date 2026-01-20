import React from 'react';
// Assets se saari 8 images import kar rahe hain
import p1 from '../assets/person_1.jpg';
import p2 from '../assets/person_2.jpg';
import p3 from '../assets/person_3.jpg';
import p4 from '../assets/person_4.jpg';
import p5 from '../assets/person_5.jpg';
import p6 from '../assets/person_6.jpg';
import p7 from '../assets/person_7.jpg';
import p8 from '../assets/person_8.jpg';

const Team = () => {
  const teamMembers = [
    { name: "Kaiara Spencer", role: "FINANCE MANAGER", img: p1 },
    { name: "Dave Simpson", role: "MARKETING MANAGER", img: p2 },
    { name: "Ben Thompson", role: "ACCOUNTANT", img: p3 },
    { name: "Kyla Stewart", role: "ACCOUNTANT", img: p4 },
    { name: "Kaiara Spencer", role: "ACCOUNTANT", img: p5 },
    { name: "Dave Simpson", role: "BANK TELLER", img: p6 },
    { name: "Ben Thompson", role: "BANK TELLER", img: p7 },
    { name: "Chris Stewart", role: "BANK TELLER", img: p8 },
  ];

  return (
    <section id="team-section" className="py-24 bg-white font-sans">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="text-center mb-20">
          <h2 className="text-orange-500 text-4xl md:text-5xl font-bold mb-6">
            Meet Team
          </h2>
          <p className="max-w-2xl mx-auto text-gray-400 text-lg font-light">
            A small river named Duden flows by their place and supplies it with the necessary regelialia.
          </p>
        </div>

        {/* Team Grid - 4 columns on desktop, 1 on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="flex flex-col">
              {/* Image Container */}
              <div className="overflow-hidden mb-4 shadow-sm transition-all duration-300 hover:shadow-lg">
                <img 
                  src={member.img} 
                  alt={member.name} 
                  className="w-full h-auto object-cover" 
                />
              </div>
              
              {/* Name & Role */}
              <h3 className="text-xl font-medium text-gray-800 tracking-tight">
                {member.name}
              </h3>
              <p className="text-[11px] text-gray-300 font-bold mt-1 tracking-widest uppercase">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

const Navbar = () => {
  // Dropdown open/close karne ke liye state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsDropdownOpen(false); // Scroll karne ke baad menu band ho jaye
  };

  const dropdownLinks = [
    { name: "Team", id: "team-section" }, // Inki IDs aap baad mein sections bana kar de sakte hain
    { name: "Pricing", id: "pricing" },
    { name: "FAQ", id: "faq" },
    { name: "Gallery", id: "gallery" },
    { name: "Services", id: "services-section" },
    { name: "Testimonials", id: "testimonials" },
    { name: "More Links", id: "more", hasSub: true },
  ];

  return (
    <nav className="absolute top-0 left-0 w-full z-20 px-8 md:px-24 py-6 flex items-center justify-between text-white border-b border-white/20">
      
      {/* Logo */}
      <div className="text-2xl font-bold tracking-tight">
        Banker<span className="text-orange-500">.</span>
      </div>

      {/* Links & Socials */}
      <div className="hidden md:flex items-center gap-10">
        <ul className="flex gap-8 text-[13px] font-medium tracking-[0.1em] uppercase items-center">
          <li className="cursor-pointer hover:text-orange-400 transition">Home</li>
          
          {/* About Us with Dropdown Logic */}
          <li 
            className="relative group py-2" // 'group' class hover logic ke liye hai
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <div 
              onClick={() => handleScroll('about-section')}
              className="cursor-pointer hover:text-orange-400 transition flex items-center gap-1"
            >
              About Us <span className="text-[10px] transform group-hover:rotate-180 transition-transform">▼</span>
            </div>

            {/* Dropdown Menu - Jo image mein white box hai */}
            {isDropdownOpen && (
              <ul className="absolute left-0 mt-2 w-48 bg-white text-gray-800 py-4 shadow-xl rounded-sm border-t-2 border-orange-500 animate-fadeIn">
                {dropdownLinks.map((link, index) => (
                  <li 
                    key={index}
                    onClick={() => handleScroll(link.id)}
                    className="px-6 py-2 hover:text-orange-500 cursor-pointer transition text-[14px] flex justify-between items-center"
                  >
                    {link.name}
                    {link.hasSub && <span className="text-[10px]">▶</span>}
                  </li>
                ))}
              </ul>
            )}
          </li>
          
          <li className="cursor-pointer hover:text-orange-400 transition">Blog</li>
          <li className="cursor-pointer hover:text-orange-400 transition">Contact</li>
        </ul>

        {/* Social Icons */}
        <div className="flex gap-5 text-sm ml-4">
          <a href="#" className="hover:text-orange-400 transition"><FontAwesomeIcon icon={faFacebookF} /></a>
          <a href="#" className="hover:text-orange-400 transition"><FontAwesomeIcon icon={faTwitter} /></a>
          <a href="#" className="hover:text-orange-400 transition"><FontAwesomeIcon icon={faLinkedinIn} /></a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

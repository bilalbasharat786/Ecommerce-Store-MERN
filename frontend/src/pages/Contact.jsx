import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import LazyImage from "../components/LazyImage";
import { motion } from "framer-motion";

const Contact = () => {
  // Framer Motion Variants for Staggered Entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemLeft = {
    hidden: { opacity: 0, x: -50 },
    show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const itemRight = {
    hidden: { opacity: 0, x: 50 },
    show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section className="w-full py-16 sm:py-24 bg-[#FAFAFA] min-h-screen flex flex-col justify-center overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Animated Premium Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center mb-16 sm:mb-24"
        >
          <span className="text-[#C5A059] text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase mb-4">
            Get In Touch
          </span>
          <Title text1={"CONTACT"} text2={"US"} />
          <div className="w-16 sm:w-24 h-[2px] bg-[#C5A059] mt-6 rounded-full shadow-[0_0_10px_rgba(197,160,89,0.3)]"></div>
        </motion.div>

        {/* Main Content Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24"
        >
          
          {/* Left Side: Editorial Image */}
          <motion.div variants={itemLeft} className="w-full lg:w-1/2 flex justify-center lg:justify-end relative">
            {/* Decorative Gold Offset Frame */}
            <div className="absolute top-4 -left-4 sm:top-6 sm:-left-6 w-full h-full border-2 border-[#C5A059]/40 z-0 hidden sm:block"></div>
            
            {/* Image Container */}
            <div className="relative z-10 w-full max-w-[500px] aspect-[4/5] overflow-hidden bg-white shadow-xl">
              <LazyImage
                src={assets.contact_img}
                className="w-full h-full object-cover transition-transform duration-[10s] hover:scale-110"
                alt="Jamal Collection Store"
              />
            </div>
          </motion.div>

          {/* Right Side: Contact Details */}
          <motion.div variants={itemRight} className="w-full lg:w-1/2 flex flex-col justify-center items-start text-left">
            
            {/* Store Info Section */}
            <div className="mb-12">
              <h3 className="text-2xl sm:text-3xl font-medium text-[#121212] mb-6 font-serif tracking-wide">
                Our Store
              </h3>
              
              <div className="flex flex-col gap-5">
                {/* Phone */}
                <a href="tel:+923105087313" className="group flex items-center gap-4 text-gray-600 hover:text-[#C5A059] transition-colors duration-300">
                  <div className="w-12 h-12 flex items-center justify-center bg-white border border-gray-200 group-hover:border-[#C5A059] rounded-full shadow-sm transition-all duration-300">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.48-4.18-7.076-7.076l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <span className="text-sm sm:text-base tracking-wider">+92 310 508 7313</span>
                </a>

                {/* Email */}
                <a href="mailto:officialjamalcollection@gmail.com" className="group flex items-center gap-4 text-gray-600 hover:text-[#C5A059] transition-colors duration-300">
                  <div className="w-12 h-12 flex items-center justify-center bg-white border border-gray-200 group-hover:border-[#C5A059] rounded-full shadow-sm transition-all duration-300">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <span className="text-sm sm:text-base tracking-wide">officialjamalcollection@gmail.com</span>
                </a>
              </div>
            </div>

            {/* Premium Divider */}
            <hr className="w-full border-gray-200 mb-10" />

            {/* Careers Section */}
            <div>
              <h3 className="text-xl sm:text-2xl font-medium text-[#121212] mb-4 tracking-wide">
                Careers at Jamal Collection
              </h3>
              <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-8 max-w-md">
                We're always looking for passionate individuals to join our growing team. Learn more about our teams and job openings.
              </p>
              
              {/* Minimalist Action Button */}
              <button className="group relative px-8 py-3 bg-transparent overflow-hidden text-xs sm:text-sm font-semibold tracking-widest uppercase border border-[#121212] text-[#121212] transition-colors duration-300">
                <span className="absolute inset-0 bg-[#121212] translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0"></span>
                <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                  Explore Opportunities
                </span>
              </button>
            </div>

          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default Contact;


import React from "react";
import { assets } from "../assets/frontend_assets/assets";
import { motion } from "framer-motion";

const OurPolicy = () => {
  // Policy data array ko alag kar liya taake map() lagane mein asani ho aur code clean rahay
  const policies = [
    {
      id: 1,
      icon: assets.exchange_icon,
      title: "Easy Exchange",
      desc: "Hassle-free exchange policy tailored for you",
    },
    {
      id: 2,
      icon: assets.quality_icon,
      title: "7 Days Return",
      desc: "Shop with confidence with our free return policy",
    },
    {
      id: 3,
      icon: assets.support_img,
      title: "24/7 Support",
      desc: "Dedicated premium customer service anytime",
    },
  ];

  // Framer Motion Variants (For Smooth Scrolling Animation)
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }, // Har card 0.2s ke waqfay se aayega
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section className="w-full py-16 sm:py-24 bg-white border-y border-gray-100 overflow-hidden relative">
      
      {/* Background Subtle Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[1px] bg-gradient-to-r from-transparent via-[#C5A059]/20 to-transparent"></div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6 md:gap-12"
        >
          {policies.map((policy) => (
            <motion.div
              key={policy.id}
              variants={itemVariants}
              className="group flex flex-col items-center text-center cursor-default"
            >
              {/* Premium Icon Wrapper with Hover Effect */}
              <div className="relative mb-6 sm:mb-8">
                {/* Background glow circle that appears on hover */}
                <div className="absolute inset-0 bg-[#C5A059]/5 rounded-full scale-50 opacity-0 group-hover:scale-110 group-hover:opacity-100 transition-all duration-500 ease-out"></div>
                
                {/* Main Icon Ring */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full border border-gray-200 flex items-center justify-center bg-white group-hover:border-[#C5A059] group-hover:shadow-[0_0_20px_rgba(197,160,89,0.15)] transition-all duration-500 z-10">
                  <img
                    src={policy.icon}
                    alt={policy.title}
                    className="w-7 sm:w-8 md:w-10 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                  />
                </div>
              </div>

              {/* Typography Styling */}
              <h3 className="font-semibold text-xs sm:text-sm md:text-base text-gray-900 tracking-widest uppercase mb-2 group-hover:text-[#C5A059] transition-colors duration-300">
                {policy.title}
              </h3>
              
              <p className="text-gray-500 text-[11px] sm:text-xs md:text-sm leading-relaxed max-w-[250px]">
                {policy.desc}
              </p>
              
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default OurPolicy;


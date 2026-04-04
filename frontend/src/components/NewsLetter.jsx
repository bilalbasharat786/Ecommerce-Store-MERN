import React from "react";
import { motion } from "framer-motion";

const NewsLetter = () => {
  const onSubmitHandler = (e) => {
    e.preventDefault();
    // Yahan aap future mein EmailJS ya backend API call laga sakte hain
  };

  return (
    <section className="w-full py-16 sm:py-24 bg-white flex justify-center overflow-hidden border-t border-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl w-full px-4 sm:px-6 flex flex-col items-center text-center"
      >
        {/* Premium VIP Label */}
        <span className="text-[#C5A059] text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase mb-4">
          VIP Exclusive
        </span>

        {/* Elegant Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-[#121212] mb-4">
          Join the Jamal Collection Club
        </h2>

        {/* Sophisticated Description */}
        <p className="text-gray-500 text-xs sm:text-sm md:text-base tracking-wide max-w-lg mb-8 sm:mb-12 leading-relaxed">
          Subscribe to receive 20% off your first order. Be the first to know about new arrivals, exclusive offers, and premium menswear trends.
        </p>

        {/* Advanced Styling Form */}
        <form
          onSubmit={onSubmitHandler}
          className="w-full sm:w-[85%] md:w-[75%] flex flex-col sm:flex-row group"
        >
          {/* Input Field with Hover/Focus Gold Border */}
          <div className="flex-1 relative">
            <input
              className="w-full h-full outline-none text-sm sm:text-base px-4 sm:px-6 py-4 bg-[#FAFAFA] border border-gray-200 focus:border-[#C5A059] focus:bg-white text-gray-800 placeholder-gray-400 transition-all duration-500"
              type="email"
              placeholder="Enter your email address"
              required
            />
          </div>

          {/* Premium Subscribe Button */}
          <button
            type="submit"
            className="relative overflow-hidden bg-[#121212] text-white text-xs sm:text-sm font-semibold tracking-widest uppercase px-8 sm:px-12 py-4 mt-3 sm:mt-0 sm:-ml-[1px] transition-all duration-500 hover:bg-[#C5A059] group-focus-within:shadow-[0_0_15px_rgba(197,160,89,0.2)]"
          >
            <span className="relative z-10">Subscribe</span>
          </button>
        </form>

        {/* Minimalist Disclaimer */}
        <p className="text-[9px] sm:text-[10px] text-gray-400 mt-5 uppercase tracking-widest">
          By subscribing, you agree to our Privacy Policy.
        </p>

      </motion.div>
    </section>
  );
};

export default NewsLetter;

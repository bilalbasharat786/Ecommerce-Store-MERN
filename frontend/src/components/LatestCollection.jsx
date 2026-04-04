import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../contexts/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";
import { motion } from "framer-motion";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);

  // Framer Motion Variants for Staggered Animation
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }, // Har card 0.15s ke delay se aayega
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="w-full py-16 sm:py-24 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section with Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center mb-12 sm:mb-16"
        >
          <Title text1={"LATEST"} text2={"COLLECTION"} />
          {/* Premium Gold Divider */}
          <div className="w-16 sm:w-24 h-[2px] bg-[#C5A059] my-4 sm:my-6 rounded-full"></div>
          <p className="max-w-2xl text-xs sm:text-sm md:text-base text-gray-500 tracking-widest uppercase leading-relaxed">
            Handpicked premium selections tailored for your distinguished taste
          </p>
        </motion.div>

        {/* Product Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8"
        >
          {latestProducts.map((item, index) => (
            <motion.div key={index} variants={itemVariants}>
              <ProductItem
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
                discountPrice={item.discountPrice}
                colors={item.colors}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Premium 'View All' Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 sm:mt-20 flex justify-center"
        >
          <button className="group relative px-8 py-3 bg-transparent overflow-hidden text-xs sm:text-sm font-semibold tracking-widest uppercase border border-[#C5A059] text-gray-900 transition-colors duration-300">
            <span className="absolute inset-0 bg-[#C5A059] translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0"></span>
            <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
              Discover More
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default LatestCollection;

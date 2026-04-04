import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../contexts/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";
import { motion } from "framer-motion";

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    // ES6 Safe Check
    if (products?.length > 0) {
      let productsCopy = products.slice();
      
      // Filtering by category and subCategory
      productsCopy = productsCopy.filter((item) => category === item.category);
      productsCopy = productsCopy.filter((item) => subCategory === item.subCategory);
      
      setRelated(productsCopy.slice(0, 5));
    }
  }, [products, category, subCategory]);

  // Framer Motion Variants for Staggered Animation
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }, // Har card mein 0.15s ka waqfa hoga
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  // Agar koi related product na ho to blank return karega (UI kharab nahi hogi)
  if (related.length === 0) return null;

  return (
    <section className="w-full py-12 sm:py-16 lg:py-20 bg-white overflow-hidden">
      <div className="w-full">
        
        {/* Premium Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center mb-10 sm:mb-14"
        >
          <span className="text-[#C5A059] text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase mb-3">
            Complete Your Look
          </span>
          <Title text1={"RELATED"} text2={"PRODUCTS"} />
          
          {/* Elegant Gold Divider */}
          <div className="w-16 sm:w-24 h-[2px] bg-[#C5A059] my-4 sm:my-6 rounded-full shadow-[0_0_10px_rgba(197,160,89,0.3)]"></div>
          
          <p className="max-w-2xl text-xs sm:text-sm text-gray-500 tracking-widest uppercase leading-relaxed px-4">
            Discover similar styles meticulously crafted to elevate your premium wardrobe.
          </p>
        </motion.div>

        {/* Animated Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8"
        >
          {related.map((item, index) => (
            <motion.div key={index} variants={itemVariants}>
              <ProductItem
                id={item._id}
                name={item.name}
                price={item.price}
                image={item.image}
                discountPrice={item.discountPrice}
                colors={item.colors}
              />
            </motion.div>
          ))}
        </motion.div>
        
      </div>
    </section>
  );
};

export default RelatedProducts;

import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../contexts/ShopContext';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Wishlist = () => {
  const { products, wishlist } = useContext(ShopContext);
  const [wishlistProducts, setWishlistProducts] = useState([]);

  useEffect(() => {
    if (products?.length > 0) {
      // Filtering products based on wishlist object keys
      const tempData = products.filter((item) => wishlist[item._id]);
      setWishlistProducts(tempData);
    }
  }, [products, wishlist]);

  // Framer Motion Variants for Staggered Animation
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.3 } }
  };

  return (
    <div className="bg-[#FAFAFA] min-h-[80vh] py-10 sm:py-16">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Premium Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center sm:items-start mb-10 sm:mb-14"
        >
          <span className="text-[#C5A059] text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase mb-2">
            Your Favorites
          </span>
          <Title text1={'MY'} text2={'WISHLIST'} />
        </motion.div>

        {wishlistProducts.length > 0 ? (
          /* Animated Products Grid */
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 gap-y-10"
          >
            <AnimatePresence>
              {wishlistProducts.map((item) => (
                <motion.div
                  key={item._id}
                  variants={itemVariants}
                  layout
                  exit="exit"
                >
                  <ProductItem
                    id={item._id}
                    name={item.name}
                    image={item.image}
                    price={item.price}
                    discountPrice={item.discountPrice} // Premium card ke liye zaroori
                    colors={item.colors}               // Premium card ke liye zaroori
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* Premium Empty State */
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center py-24 sm:py-32 bg-white border border-gray-100 shadow-sm text-center px-4"
          >
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
              <svg className="w-10 h-10 text-[#C5A059]/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            
            <h2 className="text-xl sm:text-2xl font-serif text-[#121212] mb-3">
              Your wishlist is empty
            </h2>
            <p className="text-gray-500 mb-8 text-sm max-w-md leading-relaxed tracking-wide">
              You haven't saved any items yet. Start exploring our collections and save your favorite pieces here.
            </p>
            
            <Link 
              to="/collection"
              className="group relative px-10 py-4 bg-[#121212] text-white text-xs sm:text-sm font-bold tracking-widest uppercase overflow-hidden transition-all duration-300 shadow-xl hover:shadow-[#C5A059]/20"
            >
              <span className="absolute inset-0 bg-[#C5A059] translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0"></span>
              <span className="relative z-10 transition-colors duration-300">
                Discover Styles
              </span>
            </Link>
          </motion.div>
        )}

      </div>
    </div>
  );
};

export default Wishlist;
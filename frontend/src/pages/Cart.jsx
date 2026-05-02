import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../contexts/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import { motion, AnimatePresence } from "framer-motion";

const Cart = () => {
  const {
    products,
    currency,
    cartItems,
    updateQuantity,
    navigate,
    getCartAmount,
    deliveryFee,
    setCartItems
  } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item.split("-")[0],
              quantity: cartItems[items][item],
              color: item.split("-")[1],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.3 } }
  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen py-10 sm:py-16">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Premium Header */}
        <div className="flex flex-col items-center sm:items-start mb-10 sm:mb-14">
          <span className="text-[#C5A059] text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase mb-2">
            Your Shopping Bag
          </span>
          <Title text1={"YOUR"} text2={"CART"} />
        </div>

        {cartData.length === 0 ? (
          // Empty Cart State
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20 bg-white border border-gray-100 shadow-sm"
          >
            <svg className="w-16 h-16 text-gray-300 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <h2 className="text-xl sm:text-2xl font-serif text-[#121212] mb-3">Your bag is empty</h2>
            <p className="text-gray-500 mb-8 text-sm">Looks like you haven't added anything to your cart yet.</p>
            <button
              onClick={() => navigate('/collection')}
              className="bg-[#121212] text-white px-8 py-3 text-xs font-bold tracking-widest uppercase hover:bg-[#C5A059] transition-colors"
            >
              Continue Shopping
            </button>
          </motion.div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
            
            {/* Left Side: Cart Items List */}
            <div className="w-full lg:w-[65%]">
              
              {/* Desktop Header Row */}
              <div className="hidden sm:grid grid-cols-[3fr_1fr_1fr_auto] gap-4 pb-4 border-b border-gray-200 text-xs font-bold tracking-widest uppercase text-gray-400">
                <p>Product Details</p>
                <p className="text-center">Quantity</p>
                <p className="text-right">Price</p>
                <p className="w-10 text-center"></p> {/* Remove Icon Space */}
              </div>

              {/* Animated Cart Items */}
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="flex flex-col gap-6 sm:gap-8 mt-6 sm:mt-8"
              >
                <AnimatePresence>
                  {cartData.map((item, index) => {
                    const productData = products.find((product) => product._id === item._id);
                    if (!productData) return null;
                    
                    const currentPrice = productData.discountPrice > 0 && productData.discountPrice < productData.price
                      ? productData.discountPrice
                      : productData.price;

                    return (
                      <motion.div
                        variants={itemVariants}
                        layout
                        key={`${item._id}-${item.size}-${item.color}`}
                        className="grid grid-cols-[auto_1fr] sm:grid-cols-[3fr_1fr_1fr_auto] gap-4 sm:gap-6 items-center pb-6 border-b border-gray-100 relative group"
                      >
                        {/* 1. Image & Info */}
                        <div className="flex gap-4 sm:gap-6">
                          <div className="w-20 sm:w-24 aspect-[3/4] bg-gray-50 overflow-hidden cursor-pointer" onClick={() => navigate(`/product/${item._id}`)}>
                            <img className="w-full h-full object-cover object-top hover:scale-110 transition-transform duration-500" src={productData.image[0]} alt={productData.name} />
                          </div>
                          <div className="flex flex-col justify-center">
                            <h3 className="text-sm sm:text-base font-medium text-[#121212] uppercase tracking-wide cursor-pointer hover:text-[#C5A059] transition-colors" onClick={() => navigate(`/product/${item._id}`)}>
                              {productData.name}
                            </h3>
                            <div className="mt-2 space-y-1">
                              <p className="text-xs text-gray-500 tracking-wider uppercase">Size: <span className="font-semibold text-gray-800">{item.size}</span></p>
                              {item.color && item.color !== 'undefined' && (
                                <div className="flex items-center gap-2 text-xs text-gray-500 tracking-wider uppercase">
                                  <span>Color:</span>
                                  <span className="w-3 h-3 rounded-full border border-gray-200" style={{ backgroundColor: item.color }}></span>
                                </div>
                              )}
                            </div>
                            {/* Mobile Only Price */}
                            <p className="sm:hidden mt-3 text-sm font-semibold text-[#121212]">
                              {currency}{currentPrice}
                            </p>
                          </div>
                        </div>

                        {/* 2. Sleek Quantity Selector */}
                        <div className="col-span-2 sm:col-span-1 flex items-center sm:justify-center mt-2 sm:mt-0">
                          <div className="flex items-center border border-gray-200 rounded-sm overflow-hidden">
                            <button
                              onClick={() => item.quantity > 1 ? updateQuantity(item._id, `${item.size}-${item.color}`, item.quantity - 1) : null}
                              className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-[#121212] transition-colors"
                            >
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
                            </button>
                            <span className="w-8 text-center text-xs font-semibold text-[#121212]">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item._id, `${item.size}-${item.color}`, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-[#121212] transition-colors"
                            >
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                            </button>
                          </div>
                        </div>

                        {/* 3. Desktop Price */}
                        <div className="hidden sm:block text-right">
                          <p className="text-sm font-semibold text-[#121212]">
                            {currency}{currentPrice * item.quantity}
                          </p>
                        </div>

                        {/* 4. Elegant Remove Button */}
                        <div className="absolute top-0 right-0 sm:static">
                          <button
                            onClick={() => updateQuantity(item._id, `${item.size}-${item.color}`, 0)}
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-300 group-hover:opacity-100 sm:opacity-50"
                            title="Remove item"
                          >
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>

                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </motion.div>

              {/* Clear Cart Action */}
              <div className="mt-8 flex justify-start">
                <button
                  onClick={() => setCartItems ? setCartItems({}) : navigate('/collection')}
                  className="text-xs font-bold tracking-widest text-gray-400 hover:text-[#121212] uppercase border-b border-transparent hover:border-[#121212] pb-1 transition-all"
                >
                  Clear Shopping Bag
                </button>
              </div>

            </div>

            {/* Right Side: Order Summary (Sticky) */}
            <div className="w-full lg:w-[35%] lg:sticky lg:top-24">
              <div className="bg-white p-6 sm:p-8 border border-gray-100 shadow-sm">
                <h3 className="text-lg font-serif text-[#121212] mb-6">Order Summary</h3>
                
                <div className="flex flex-col gap-4 text-sm text-gray-600 mb-6">
                  <div className="flex justify-between items-center">
                    <p>Subtotal</p>
                    <p className="font-medium text-[#121212]">{currency}{getCartAmount().toLocaleString("en-PK")}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p>Estimated Shipping</p>
                    <p className="font-medium text-[#121212]">{currency}{deliveryFee.toLocaleString("en-PK")}</p>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 mb-8 flex justify-between items-end">
                  <div>
                    <p className="text-lg font-bold text-[#121212]">Total</p>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest">Including VAT</p>
                  </div>
                  <p className="text-xl sm:text-2xl font-bold text-[#C5A059]">
                    {currency}{(getCartAmount() === 0 ? 0 : getCartAmount() + deliveryFee).toLocaleString("en-PK")}
                  </p>
                </div>

                <button
                  onClick={() => navigate("/place-order")}
                  className="group relative w-full h-14 bg-[#121212] text-white text-xs sm:text-sm font-bold tracking-widest uppercase overflow-hidden transition-all duration-300 mb-4"
                >
                  <span className="absolute inset-0 bg-[#C5A059] translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0"></span>
                  <span className="relative z-10 transition-colors duration-300">
                    Proceed to Checkout
                  </span>
                </button>

                <button
                  onClick={() => navigate("/collection")}
                  className="w-full h-14 bg-white text-[#121212] border border-gray-200 text-xs sm:text-sm font-bold tracking-widest uppercase hover:border-[#121212] transition-all duration-300"
                >
                  Continue Shopping
                </button>
              </div>

              {/* Trust Badges under Summary */}
              <div className="mt-6 flex justify-center gap-6">
                <div className="flex flex-col items-center gap-1 opacity-60 grayscale">
                   <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-5-5 1.41-1.41L11 14.17l7.59-7.59L20 8l-9 9z"/></svg>
                   <span className="text-[9px] font-bold uppercase tracking-widest">Secure Checkout</span>
                </div>
              </div>

            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
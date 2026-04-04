import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShopContext } from "../contexts/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import RelatedProducts from "../components/RelatedProducts";
import axios from "axios";
import { backendUrl } from "../App";
import { optimizeImage } from "../utils/imageConfig";
import LiveView from "../components/LiveView";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

const Product = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { products, currency, addToCart, token } = useContext(ShopContext);
  
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("description"); // Clean Tabs Logic

  const fetchProductData = async () => {
    const localProduct = products.find(item => item._id === productId);
    if (localProduct) {
      setProductData(localProduct);
      setImage(localProduct.image[0]);
    }

    try {
      const response = await axios.post(backendUrl + '/api/product/single', { productId });
      if (response.data.success) {
        setProductData(response.data.product);
        if (!image) setImage(response.data.product.image[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  const submitReview = async (e) => {
    e.preventDefault();
    if (!token) {
      toast.error("Please login to write a review");
      return;
    }
    if (rating === 0) {
      toast.error("Please select a star rating");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await axios.post(
        backendUrl + "/api/product/review",
        { productId, rating, comment },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success("Review Added Successfully");
        setRating(0);
        setComment("");
        fetchProductData();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return productData ? (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-[#FAFAFA] min-h-screen pt-8 pb-20"
    >
      {/* Hide Scrollbar for Thumbnails */}
      <style>
        {`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}
      </style>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section: Images & Details */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          
          {/* Left: Image Gallery */}
          <div className="flex-1 flex flex-col-reverse lg:flex-row gap-4 lg:gap-6">
            {/* Thumbnails */}
            <div className="flex lg:flex-col overflow-x-auto lg:overflow-y-auto justify-start gap-3 lg:w-24 hide-scrollbar py-1">
              {productData.image.map((item, index) => (
                <div 
                  key={index}
                  onClick={() => setImage(item)}
                  className={`w-20 lg:w-full aspect-[3/4] flex-shrink-0 cursor-pointer overflow-hidden border-2 transition-all duration-300 ${image === item ? 'border-[#C5A059] shadow-md' : 'border-transparent opacity-70 hover:opacity-100'}`}
                >
                  <img
                    className="w-full h-full object-cover object-top"
                    src={optimizeImage(item, 200)}
                    alt={`Thumbnail ${index + 1}`}
                  />
                </div>
              ))}
            </div>
            
            {/* Main Image */}
            <div className="flex-1 relative bg-white aspect-[3/4] lg:aspect-auto lg:h-[80vh] overflow-hidden group border border-gray-100 shadow-sm">
              <AnimatePresence mode="wait">
                <motion.img
                  key={image}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full object-cover object-top cursor-zoom-in"
                  src={optimizeImage(image, 1000)}
                  alt={productData.name}
                />
              </AnimatePresence>
            </div>
          </div>

          {/* Right: Product Details (Sticky) */}
          <div className="flex-1 lg:sticky lg:top-24 h-max py-4">
            
            <span className="text-[#C5A059] text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase mb-2 block">
              {productData.category} / {productData.subCategory}
            </span>
            
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#121212] mb-3 leading-tight">
              {productData.name}
            </h1>
            
            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <img
                    key={i}
                    className="w-3.5 h-3.5"
                    src={i < Math.round(productData.rating || 0) ? assets.star_icon : assets.star_dull_icon}
                    alt="star"
                  />
                ))}
              </div>
              <p className="text-sm text-gray-500 underline cursor-pointer hover:text-[#C5A059] transition-colors" onClick={() => setActiveTab('reviews')}>
                {productData.reviews ? productData.reviews.length : 0} Reviews
              </p>
            </div>

            {/* Price */}
            <div className="flex items-end gap-4 mb-8 border-b border-gray-200 pb-6">
              <p className="text-3xl sm:text-4xl font-medium text-[#121212]">
                {currency}{productData.discountPrice > 0 && productData.discountPrice < productData.price 
                  ? Number(productData.discountPrice).toLocaleString("en-PK") 
                  : Number(productData.price).toLocaleString("en-PK")}
              </p>
              {productData.discountPrice > 0 && productData.discountPrice < productData.price && (
                <p className="line-through text-gray-400 text-lg sm:text-xl mb-1">
                  {currency}{Number(productData.price).toLocaleString("en-PK")}
                </p>
              )}
            </div>

            {/* Colors */}
            {productData.colors && productData.colors.length > 0 && (
              <div className="mb-8">
                <p className="text-xs font-bold tracking-widest uppercase text-[#121212] mb-3">Color</p>
                <div className="flex flex-wrap gap-4">
                  {productData.colors.map((clr, index) => (
                    <button
                      key={index}
                      onClick={() => setColor(clr)}
                      className={`relative w-8 h-8 rounded-full transition-all duration-300 flex items-center justify-center ${color === clr ? 'ring-2 ring-offset-2 ring-[#C5A059] scale-110' : 'ring-1 ring-gray-200 hover:scale-110'}`}
                    >
                      <span className="w-full h-full rounded-full border border-black/10 shadow-inner" style={{ backgroundColor: clr }}></span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {productData.sizes && productData.sizes.length > 0 && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <p className="text-xs font-bold tracking-widest uppercase text-[#121212]">Size</p>
                  <span className="text-xs text-gray-400 underline cursor-pointer hover:text-[#C5A059]">Size Guide</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {productData.sizes.map((item, index) => (
                    <button
                      onClick={() => setSize(item)}
                      key={index}
                      className={`min-w-[3rem] h-10 px-4 flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                        item === size
                          ? "bg-[#121212] text-white border border-[#121212]"
                          : "bg-white text-gray-700 border border-gray-300 hover:border-[#C5A059] hover:text-[#C5A059]"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Live View Tracker */}
            <div className="mb-8 bg-white p-4 border border-gray-100 shadow-sm flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C5A059] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#C5A059]"></span>
              </span>
              <LiveView />
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={() => {
                if (productData.sizes.length > 0 && !size) return toast.error("Please select a size");
                if (productData.colors.length > 0 && !color) return toast.error("Please select a color");
                addToCart(productData._id, size + "-" + color);
                navigate("/cart");
              }}
              className="group relative w-full h-14 bg-[#121212] text-white text-sm font-bold tracking-widest uppercase overflow-hidden transition-all duration-300 shadow-xl hover:shadow-[#C5A059]/20"
            >
              <span className="absolute inset-0 bg-[#C5A059] translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0"></span>
              <span className="relative z-10 flex items-center justify-center gap-2 transition-colors duration-300">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                Add To Cart
              </span>
            </button>

            {/* Premium Guarantees */}
            <div className="mt-10 pt-6 border-t border-gray-200 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex flex-col items-center text-center gap-2 group">
                <svg className="w-6 h-6 text-gray-400 group-hover:text-[#C5A059] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                </svg>
                <span className="text-xs text-gray-500 uppercase tracking-wider">100% Original</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2 group">
                <svg className="w-6 h-6 text-gray-400 group-hover:text-[#C5A059] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                </svg>
                <span className="text-xs text-gray-500 uppercase tracking-wider">COD Available</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2 group">
                <svg className="w-6 h-6 text-gray-400 group-hover:text-[#C5A059] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
                <span className="text-xs text-gray-500 uppercase tracking-wider">7 Days Return</span>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Section: Tabs for Description & Reviews */}
        <div className="mt-20 lg:mt-32 max-w-5xl mx-auto">
          
          {/* Sleek Tabs Navigation */}
          <div className="flex justify-center gap-8 sm:gap-16 border-b border-gray-200 mb-8">
            <button
              onClick={() => setActiveTab('description')}
              className={`pb-4 text-sm sm:text-base font-bold tracking-widest uppercase transition-all duration-300 relative ${activeTab === 'description' ? 'text-[#121212]' : 'text-gray-400 hover:text-gray-700'}`}
            >
              Description
              {activeTab === 'description' && (
                <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C5A059]" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-4 text-sm sm:text-base font-bold tracking-widest uppercase transition-all duration-300 relative ${activeTab === 'reviews' ? 'text-[#121212]' : 'text-gray-400 hover:text-gray-700'}`}
            >
              Reviews ({productData.reviews ? productData.reviews.length : 0})
              {activeTab === 'reviews' && (
                <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C5A059]" />
              )}
            </button>
          </div>

          {/* Tab Content Area */}
          <div className="min-h-[300px]">
            {activeTab === 'description' ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="prose prose-sm sm:prose-base text-gray-600 leading-loose max-w-none text-justify"
              >
                <p>{productData.description}</p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-12"
              >
                {/* Write Review Form */}
                <div className="bg-white p-6 sm:p-8 border border-gray-100 shadow-sm h-max">
                  <h3 className="font-serif text-xl sm:text-2xl text-[#121212] mb-6">Leave a Review</h3>
                  <form onSubmit={submitReview} className="flex flex-col gap-6">
                    <div>
                      <label className="block text-xs font-bold tracking-widest uppercase text-gray-500 mb-3">Rating</label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            className="focus:outline-none transition-transform active:scale-90 hover:scale-110"
                          >
                            <img
                              src={star <= rating ? assets.star_icon : assets.star_dull_icon}
                              alt={`${star} stars`}
                              className="w-7 h-7"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold tracking-widest uppercase text-gray-500 mb-3">Your Review</label>
                      <textarea
                        className="w-full bg-[#FAFAFA] border border-gray-200 p-4 outline-none focus:border-[#C5A059] focus:bg-white transition-all resize-none text-sm"
                        placeholder="Tell us what you think..."
                        rows={5}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#121212] text-white py-4 text-xs font-bold tracking-widest uppercase hover:bg-[#C5A059] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Submitting..." : "Post Review"}
                    </button>
                  </form>
                </div>

                {/* Display Reviews */}
                <div className="flex flex-col gap-6">
                  <h3 className="font-serif text-xl sm:text-2xl text-[#121212] mb-2">Customer Feedback</h3>
                  {productData.reviews && productData.reviews.length > 0 ? (
                    <div className="flex flex-col gap-6 max-h-[500px] overflow-y-auto pr-2">
                      {productData.reviews.map((item, index) => (
                        <div key={index} className="bg-white p-5 border border-gray-100">
                          <div className="flex items-center justify-between mb-3">
                            <p className="font-bold text-[#121212] capitalize">{item.name}</p>
                            <p className="text-xs tracking-wider text-gray-400 uppercase">{new Date(item.date).toLocaleDateString()}</p>
                          </div>
                          <div className="flex gap-1 mb-3">
                            {[...Array(5)].map((_, i) => (
                              <img
                                key={i}
                                className="w-3.5 h-3.5"
                                src={i < item.rating ? assets.star_icon : assets.star_dull_icon}
                                alt=""
                              />
                            ))}
                          </div>
                          <p className="text-sm text-gray-600 leading-relaxed italic">"{item.comment}"</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-white p-8 border border-gray-100 text-center flex flex-col items-center justify-center h-full min-h-[200px]">
                      <svg className="w-12 h-12 text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <p className="text-gray-400 font-medium">No reviews yet. Be the first to review!</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </div>

      </div>

      {/* Related Products Section */}
      <div className="mt-24 sm:mt-32 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 border-t border-gray-200 pt-16">
        <RelatedProducts
          category={productData.category}
          subCategory={productData.subCategory}
        />
      </div>

    </motion.div>
  ) : (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
      <div className="w-10 h-10 border-4 border-gray-200 border-t-[#C5A059] rounded-full animate-spin"></div>
    </div>
  );
};

export default Product;

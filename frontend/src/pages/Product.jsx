import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // useNavigate yahan se import kiya
import { ShopContext } from "../contexts/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import RelatedProducts from "../components/RelatedProducts";
import LazyImage from "../components/LazyImage";
import axios from "axios";
import { backendUrl } from "../App";
import { optimizeImage } from "../utils/imageConfig";
import LiveView from "../components/LiveView";
import { toast } from "react-toastify"; // Toast notification ke liye

const Product = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { products, currency, addToCart, token } = useContext(ShopContext); // Token bhi chahiye review ke liye
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");

  // ⭐ Review States
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchProductData = async () => {
    // Pehle products array se data dhoondo
    const localProduct = products.find(item => item._id === productId);
    if (localProduct) {
      setProductData(localProduct);
      setImage(localProduct.image[0]);
    }
    
    // ⭐ Fresh data (Reviews samet) backend se mangwao
    try {
        const response = await axios.post(backendUrl + '/api/product/single', { productId });
        if (response.data.success) {
            setProductData(response.data.product); // Isme reviews honge
            if(!image) setImage(response.data.product.image[0]);
        }
    } catch (error) {
        console.error(error);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  // ⭐ Review Submit Handler
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
            fetchProductData(); // Refresh data to show new review
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
    <div className="border-t-2 pt-8 transition-opacity ease-in duration-500 opacity-100 px-4 sm:px-8 md:px-16">
      {/* Product Data */}
      <div className="flex flex-col sm:flex-row gap-10 sm:gap-12">
        {/* Product Images */}
        <div className="flex-1 flex flex-col-reverse sm:flex-row gap-4 sm:gap-5">
          {/* Thumbnail images */}
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-auto justify-between sm:justify-start sm:w-[20%] w-full">
            {productData.image.map((item, index) => (
              <img
                key={index}
                className="w-[22%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer rounded-md hover:opacity-80 transition-all duration-300"
                src={optimizeImage(item, 200)}
                alt="product_image"
                onClick={() => setImage(item)}
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="w-full sm:w-[80%]">
            <img
              className="w-full h-auto rounded-lg shadow-sm object-contain"
              src={optimizeImage(image, 1000)}
              alt={productData.name}
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1 text-gray-700">
          <h1 className="font-semibold text-xl sm:text-2xl mt-2">
            {productData.name}
          </h1>

          {/* Ratings Display */}
          <div className="flex items-center gap-1 mt-2">
             {/* Dynamic Stars based on average rating */}
            {[...Array(5)].map((_, i) => (
              <img 
                key={i} 
                className="w-3.5" 
                src={i < Math.round(productData.rating || 0) ? assets.star_icon : assets.star_dull_icon} 
                alt="star" 
              />
            ))}
            <p className="pl-2 text-sm">
                ({productData.reviews ? productData.reviews.length : 0} reviews)
            </p>
          </div>

          {/* Price */}
          <p className="mt-4 text-2xl sm:text-3xl font-medium text-gray-900">
            {currency}
            {productData.discountPrice > 0 &&
            productData.discountPrice < productData.price ? (
              <>
                {Number(productData.discountPrice).toLocaleString("en-PK")}
                <span className="line-through text-gray-500 text-lg sm:text-xl ml-4">
                  {currency}
                  {Number(productData.price).toLocaleString("en-PK")}
                </span>
              </>
            ) : (
              Number(productData.price).toLocaleString("en-PK")
            )}
          </p>

          {/* Description */}
          <p className="mt-4 text-gray-500 text-sm sm:text-base leading-relaxed md:w-4/5">
            {productData.description}
          </p>

          {/* ⭐ Color Selector */}
          {productData.colors && productData.colors.length > 0 && (
            <div className="flex flex-col gap-3 my-6">
              <p className="font-medium text-sm sm:text-base">Select Color</p>

              <div className="flex flex-wrap gap-2">
                {productData.colors.map((clr, index) => (
                  <button
                    key={index}
                    onClick={() => setColor(clr)}
                    style={{ backgroundColor: clr }}
                    className={`w-6 h-6 rounded-full border-2 ${
                      color === clr ? "border-black scale-110" : "border-gray-300"
                    } transition-all`}
                  ></button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selector */}
          <div className="flex flex-col gap-3 my-6">
            <p className="font-medium text-sm sm:text-base">Select Size</p>
            <div className="flex flex-wrap gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  key={index}
                  className={`border py-2 px-4 rounded-md text-sm sm:text-base transition-all ${
                    item === size
                      ? "border-black bg-gray-200"
                      : "border-gray-300 bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <LiveView />
          
          {/* Add to Cart */}
          <button
            onClick={() => {
              if (!size) return alert("Please select size");
              if (!color && productData.colors.length > 0) return alert("Please select color");

              addToCart(productData._id, size + "-" + color);
              navigate("/cart");
            }}
            className="bg-black text-white px-6 sm:px-8 py-3 text-sm sm:text-base border border-transparent hover:bg-white hover:text-black hover:border-black transition-all duration-500 rounded-md"
          >
            ADD TO CART
          </button>

          {/* Extra Info */}
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-xs sm:text-sm text-gray-500 mt-4 flex flex-col gap-1">
            <p>✅ 100% Original product.</p>
            <p>💵 Cash on delivery available.</p>
            <p>↩️ Easy return and exchange within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Description & Review Section */}
      <div className="mt-16 sm:mt-20">
        <div className="flex flex-col sm:flex-row">
          <b className="border px-5 py-3 text-sm sm:text-base bg-gray-100">
            Reviews ({productData.reviews ? productData.reviews.length : 0})
          </b>
          <p className="border px-5 py-3 text-sm sm:text-base text-gray-500">
            Description
          </p>
        </div>

        <div className="flex flex-col gap-4 border px-4 sm:px-6 py-6 text-sm sm:text-base text-gray-500 leading-relaxed">
           
           {/* ⭐ WRITE A REVIEW SECTION */}
           <div className="mb-6">
                <h3 className="font-semibold text-lg text-black mb-4">Write a Review</h3>
                <form onSubmit={submitReview} className="flex flex-col gap-4">
                    {/* Star Rating Input */}
                    <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button 
                                key={star} 
                                type="button" 
                                onClick={() => setRating(star)}
                                className="focus:outline-none transition-transform active:scale-90"
                            >
                                <img 
                                    src={star <= rating ? assets.star_icon : assets.star_dull_icon} 
                                    alt={`${star} stars`} 
                                    className="w-6 h-6 cursor-pointer"
                                />
                            </button>
                        ))}
                    </div>

                    <textarea
                        className="w-full sm:w-1/2 border border-gray-300 p-3 rounded outline-none focus:border-black"
                        placeholder="Write your experience..."
                        rows={4}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                    ></textarea>

                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full sm:w-40 bg-black text-white py-3 px-4 text-sm font-medium hover:bg-gray-800 transition disabled:bg-gray-400"
                    >
                        {isSubmitting ? "Submitting..." : "Submit Review"}
                    </button>
                </form>
           </div>

           <hr className="my-4" />

           {/* ⭐ DISPLAY REVIEWS */}
           <div className="flex flex-col gap-6">
                {productData.reviews && productData.reviews.length > 0 ? (
                    productData.reviews.map((item, index) => (
                        <div key={index} className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 mb-1">
                                <p className="font-semibold text-black">{item.name}</p>
                                <div className="flex gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <img 
                                            key={i} 
                                            className="w-3" 
                                            src={i < item.rating ? assets.star_icon : assets.star_dull_icon} 
                                            alt="" 
                                        />
                                    ))}
                                </div>
                            </div>
                            <p className="text-gray-600">{item.comment}</p>
                            <p className="text-xs text-gray-400 mt-1">{new Date(item.date).toDateString()}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-400 italic">No reviews yet. Be the first to review!</p>
                )}
           </div>

        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;

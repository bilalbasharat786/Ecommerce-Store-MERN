import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../contexts/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import RelatedProducts from "../components/RelatedProducts";
import { useNavigate } from "react-router-dom";
import LazyImage from "../components/LazyImage"
import axios from "axios";
import { backendUrl } from "../App";



const Product = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");



const addToWishlist = async () => {
  console.log("📌 Adding to wishlist... Product:", productData._id);

  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      `${backendUrl}/api/wishlist/add`,
      { productId: productData._id },
      { headers: { token } }
    );

    console.log("📌 Wishlist Add Response:", response.data);

    if (response.data.success) {
      alert("Added to Wishlist ❤️");
    } else {
      alert(response.data.message);
    }
  } catch (error) {
    console.log("❌ Wishlist Add Error:", error);
  }
};

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
      return null;
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

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
    src={item}
    alt="product_image"
    onClick={() => setImage(item)}
  />
))}

          </div>

          {/* Main Image */}
          <div className="w-full sm:w-[80%]">
          <img
  className="w-full h-auto rounded-lg shadow-sm object-contain"
  src={image}
  alt={productData.name}
/>

          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1 text-gray-700">
          <h1 className="font-semibold text-xl sm:text-2xl mt-2">
            {productData.name}
          </h1>
          
          {/* Ratings */}
          <div className="flex items-center gap-1 mt-2">
            {[...Array(4)].map((_, i) => (
              <img key={i} className="w-3.5" src={assets.star_icon} alt="star" />
            ))}
            <img className="w-3.5" src={assets.star_dull_icon} alt="star_dull" />
            <p className="pl-2 text-sm">122 reviews</p>
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
<button
  onClick={addToWishlist}
  className="mt-3 bg-red-500 text-white px-6 sm:px-8 py-3 text-sm sm:text-base border border-transparent hover:bg-white hover:text-red-500 hover:border-red-500 transition-all duration-500 rounded-md"
>
  ❤️ ADD TO WISHLIST
</button>

          {/* Add to Cart */}
         <button
  onClick={() => {
    if (!size) return alert("Please select size");
if (!color) return alert("Please select color");

addToCart(productData._id, size + "-" + color);  // ⭐ size + color
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
            Description
          </b>
          <p className="border px-5 py-3 text-sm sm:text-base">
            Reviews (122)
          </p>
        </div>

        <div className="flex flex-col gap-4 border px-4 sm:px-6 py-6 text-sm sm:text-base text-gray-500 leading-relaxed">
          <p>
            Our online store offers a wide selection of premium-quality products
            that combine functionality, style, and durability. Whether you’re
            shopping for yourself or a loved one, every product is designed to
            meet your lifestyle needs.
          </p>
          <p>
            We’re committed to ensuring your satisfaction — from exploring our
            catalog to enjoying your purchase at home. Shop confidently knowing
            that every order is backed by our reliable service and quality
            guarantee.
          </p>
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

import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../contexts/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import { toast } from "react-toastify";

const Cart = () => {
  const {
    products,
    currency,
    cartItems,
    updateQuantity,
    navigate,
    getCartAmount,
    deliveryFee,
    setCartItems // Added to enable Clear Cart functionality
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
              color: item.split("-")[1], // Logic preserved
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  // Helper to construct key for updateQuantity (Matches your existing logic)
  const getItemKey = (size, color) => {
      if(color && color !== 'undefined') return `${size}-${color}`;
      return size; // Fallback if structure varies, but sticking to your `${size}-${color}` pattern is safest if that's how you save it.
      // Based on your code: `${item.size}-${item.color}`
  };

  return (
    <div className="border-t pt-5 px-2 sm:px-4 md:px-8 lg:px-12 min-h-[90vh]">
      <div className="text-2xl mb-8">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      {/* 🖤 TABLE HEADER (Black Strip like Reference) */}
      <div className="hidden md:grid grid-cols-[1.5fr_2fr_1fr_1fr_1fr_0.5fr] items-center py-3 px-4 bg-black text-white text-xs sm:text-sm font-bold uppercase tracking-wider mb-4">
        <p>Product</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p className="text-center">Remove</p>
      </div>

      <div className="flex flex-col gap-4">
        {cartData.map((item, index) => {
          const productData = products.find((product) => product._id === item._id);
          
          if (!productData) return null;

          // Calculate current price (Discount vs Regular)
          const currentPrice = productData.discountPrice > 0 && productData.discountPrice < productData.price 
            ? productData.discountPrice 
            : productData.price;

          return (
            <div
              key={index}
              className="relative py-4 px-4 border border-gray-900 bg-white shadow-sm grid grid-cols-1 md:grid-cols-[1.5fr_2fr_1fr_1fr_1fr_0.5fr] items-center gap-4"
            >
              {/* 🖼️ Product Image */}
              <div className="flex items-center gap-4">
                <img
                  className="w-20 h-24 object-cover border rounded-sm"
                  src={productData.image[0]}
                  alt={productData.name}
                />
              </div>

              {/* 📝 Title & Details */}
              <div className="flex flex-col">
                <p className="text-sm sm:text-base font-bold text-gray-800 uppercase">
                  {productData.name}
                </p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mt-1 text-xs text-gray-500">
                  <p className="px-2 py-1 bg-gray-100 rounded border">
                    Size: {item.size}
                  </p>
                  {item.color && item.color !== 'undefined' && (
                     <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded border">
                        <span>Color:</span>
                        <span className="w-3 h-3 rounded-full border border-gray-300" style={{backgroundColor: item.color}}></span>
                     </div>
                  )}
                </div>
              </div>

              {/* 💰 Price */}
              <div className="flex items-center justify-between md:block">
                <span className="md:hidden font-bold text-gray-600 text-sm">Price:</span>
                <p className="text-sm sm:text-base font-medium">
                  {currency}{currentPrice}
                </p>
              </div>

              {/* 🔢 Quantity Selector (Black Buttons Style) */}
              <div className="flex items-center justify-between md:justify-start">
                 <span className="md:hidden font-bold text-gray-600 text-sm">Quantity:</span>
                 <div className="flex items-center border border-gray-300">
                    <button
                      onClick={() =>
                        item.quantity > 1
                          ? updateQuantity(item._id, `${item.size}-${item.color}`, item.quantity - 1)
                          : null
                      }
                      className="w-8 h-8 sm:w-10 sm:h-10 bg-black text-white hover:bg-gray-800 transition-colors flex items-center justify-center font-bold"
                    >
                      -
                    </button>
                    <span className="w-10 h-8 sm:w-12 sm:h-10 flex items-center justify-center bg-white text-sm font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item._id, `${item.size}-${item.color}`, item.quantity + 1)
                      }
                      className="w-8 h-8 sm:w-10 sm:h-10 bg-black text-white hover:bg-gray-800 transition-colors flex items-center justify-center font-bold"
                    >
                      +
                    </button>
                  </div>
              </div>

              {/* 💵 Total Price for Item */}
              <div className="flex items-center justify-between md:block">
                <span className="md:hidden font-bold text-gray-600 text-sm">Total:</span>
                <p className="text-sm sm:text-base font-bold text-gray-900">
                  {currency}{currentPrice * item.quantity}
                </p>
              </div>

              {/* 🗑️ Delete Button (Red Box) */}
              <div className="flex justify-end md:justify-center mt-2 md:mt-0 absolute top-2 right-2 md:static">
                <button
                  onClick={() => updateQuantity(item._id, `${item.size}-${item.color}`, 0)}
                  className="w-8 h-8 sm:w-9 sm:h-9 bg-[#ff2626] text-white hover:bg-[#ff0000] transition flex items-center justify-center shadow-sm"
                >
                  {/* 👇 'invert-0' ko 'invert' kar diya hai */}
                 <img src={assets.bin_icon} className="w-4 h-4 filter brightness-0 invert" alt="delete" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 👇 BOTTOM SECTION: CLEAR CART & TOTALS */}
      <div className="flex flex-col-reverse md:flex-row justify-between items-start mt-10 gap-8">
        
        {/* Left Side: Buttons */}
        <div className="flex flex-col gap-4 w-full md:w-1/3">
           <button 
             onClick={() => {
                // Agar 'setCartItems' context me available nahi hai to ye line hata dena
                if(setCartItems) setCartItems({}); 
                else navigate('/collection');
             }}
             className="w-full sm:w-auto py-3 px-6 bg-black text-white font-semibold text-sm uppercase hover:bg-white hover:text-black hover:border-black transition-all duration-500 "
           >
             Clear Cart
           </button>
        </div>

        {/* Right Side: Totals Box */}
        <div className="w-full md:w-1/3 bg-gray-50 p-6 sm:p-8 rounded-md border border-gray-200 shadow-sm">
          <div className="flex flex-col gap-2">
            
            {/* Subtotal */}
            <div className="flex justify-between text-sm text-gray-600 border-b pb-2">
               <p>Subtotal</p>
               <p>{currency}{getCartAmount()}.00</p>
            </div>
            
            {/* Shipping */}
            <div className="flex justify-between text-sm text-gray-600 border-b py-2">
               <p>Shipping Fee</p>
               <p>{currency}{deliveryFee}.00</p>
            </div>

            {/* GRAND TOTAL */}
            <div className="flex justify-between text-lg sm:text-xl font-bold text-gray-900 py-4">
               <p>Grand Total:</p>
               <p>{currency}{getCartAmount() === 0 ? 0 : getCartAmount() + deliveryFee}.00</p>
            </div>
            
            {/* CHECKOUT BUTTON (Black) */}
            <button
              onClick={() => navigate("/place-order")}
              className="w-full bg-black text-white py-3 text-sm font-bold uppercase tracking-wide hover:text-black hover:border-black transition-all duration-500 "
            >
              Proceed to Checkout
            </button>

            {/* CONTINUE SHOPPING BUTTON (White) */}
            <button
              onClick={() => navigate("/collection")}
              className="w-full bg-white text-black border border-black py-3 text-sm font-bold uppercase tracking-wide hover:bg-gray-100 transition-all"
            >
              Continue Shopping
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

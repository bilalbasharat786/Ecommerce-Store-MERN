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
              size: item,
              quantity: cartItems[items][item],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  return (
    <div className="border-t pt-14 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] min-h-[80vh]">
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

          return (
            <div
              key={index}
              className="relative py-4 px-4 border border-gray-200 bg-white shadow-sm grid grid-cols-1 md:grid-cols-[1.5fr_2fr_1fr_1fr_1fr_0.5fr] items-center gap-4"
            >
              {/* 🖼️ Product Image */}
              <div className="flex items-center gap-4">
                <img
                  className="w-20 h-24 object-cover border rounded-sm"
                  src={productData.image[0]}
                  alt=""
                />
              </div>

              {/* 📝 Title & Details */}
              <div className="flex flex-col">
                <p className="text-sm sm:text-base font-bold text-gray-800 uppercase">
                  {productData.name}
                </p>
                <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                  <p className="px-2 py-1 bg-gray-100 rounded border">
                    Size: {item.size}
                  </p>
                  {/* Agar color data ho to yahan show kar sakte hain */}
                </div>
              </div>

              {/* 💰 Price (Mobile me label dikhana hai, Desktop me nahi) */}
              <div className="flex items-center justify-between md:block">
                <span className="md:hidden font-bold text-gray-600 text-sm">Price:</span>
                <p className="text-sm sm:text-base font-medium">
                  {currency}{productData.price}
                </p>
              </div>

              {/* 🔢 Quantity Selector (Black Buttons Style) */}
              <div className="flex items-center justify-between md:justify-start">
                 <span className="md:hidden font-bold text-gray-600 text-sm">Quantity:</span>
                 <div className="flex items-center border border-gray-300">
                    <button
                      onClick={() =>
                        item.quantity > 1
                          ? updateQuantity(item._id, item.size, item.quantity - 1)
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
                        updateQuantity(item._id, item.size, item.quantity + 1)
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
                  {currency}{productData.price * item.quantity}
                </p>
              </div>

              {/* 🗑️ Delete Button (Red Box) */}
              <div className="flex justify-end md:justify-center mt-2 md:mt-0">
                <button
                  onClick={() => updateQuantity(item._id, item.size, 0)}
                  className="w-9 h-9 bg-red-600 text-white rounded hover:bg-red-700 transition flex items-center justify-center shadow-sm"
                  title="Remove Item"
                >
                  <img src={assets.bin_icon} className="w-4 h-4 invert filter brightness-0 invert-0" alt="delete" />
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
           {/* Note: 'Clear Cart' ki logic context me nahi thi isliye mene sirf UI banaya hai. 
               Agar logic add karni ho to bta dena */}
           <button 
             onClick={() => navigate('/collection')}
             className="w-full sm:w-auto py-3 px-6 bg-black text-white font-semibold text-sm uppercase hover:bg-gray-800 transition shadow-md"
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
              className="w-full bg-black text-white py-3 text-sm font-bold uppercase tracking-wide hover:bg-gray-800 transition-all mb-3 shadow-md"
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
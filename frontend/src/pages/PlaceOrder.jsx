import React, { useContext, useState, useEffect } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/frontend_assets/assets";
import { ShopContext } from "../contexts/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const {
    token,
    navigate,
    backendUrl,
    cartItems,
    setCartItems,
    getCartAmount,
    deliveryFee,
    products,
  } = useContext(ShopContext);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      toast.info("Please login to proceed to checkout");
    }
  }, [token, navigate]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item]) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        userId: token,
        address: formData,
        items: orderItems,
        amount: getCartAmount() + deliveryFee,
      };

      switch (method) {
        case "cod":
          const response = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            { headers: { token } }
          );
          if (response.data.success) {
            setCartItems({});
            navigate("/orders");
            toast.success("Order Placed Successfully!");
          } else {
            toast.error(response.data.message);
          }
          break;

        case "stripe":
          const responseStripe = await axios.post(
            backendUrl + "/api/order/stripe",
            orderData,
            { headers: { token } }
          );
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
          } else {
            toast.error(responseStripe.data.message);
          }
          break;

        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Reusable Input Class for Premium Look
  const inputStyle = "w-full bg-white border border-gray-200 px-4 py-3.5 outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]/20 transition-all text-sm text-gray-800 placeholder-gray-400 rounded-sm shadow-sm";

  return (
    <div className="bg-[#FAFAFA] min-h-screen py-10 sm:py-16">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Animated Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center sm:items-start mb-10 sm:mb-14"
        >
          <span className="text-[#C5A059] text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase mb-2">
            Secure Checkout
          </span>
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </motion.div>

        <form onSubmit={onSubmitHandler} className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          
          {/* Left Side: Delivery Form */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 w-full"
          >
            <h3 className="text-lg font-serif text-[#121212] mb-6 border-b border-gray-200 pb-3">Shipping Address</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <input required className={inputStyle} type="text" placeholder="First Name" onChange={onChangeHandler} name="firstName" value={formData.firstName} />
              <input required className={inputStyle} type="text" placeholder="Last Name" onChange={onChangeHandler} name="lastName" value={formData.lastName} />
              
              <div className="sm:col-span-2">
                <input required className={inputStyle} type="email" placeholder="Email Address" onChange={onChangeHandler} name="email" value={formData.email} />
              </div>
              
              <div className="sm:col-span-2">
                <input required className={inputStyle} type="text" placeholder="Street Address" onChange={onChangeHandler} name="street" value={formData.street} />
              </div>
              
              <input required className={inputStyle} type="text" placeholder="City" onChange={onChangeHandler} name="city" value={formData.city} />
              <input required className={inputStyle} type="text" placeholder="State / Province" onChange={onChangeHandler} name="state" value={formData.state} />
              
              <input required className={inputStyle} type="number" placeholder="Zip / Postal Code" onChange={onChangeHandler} name="zipcode" value={formData.zipcode} />
              <input required className={inputStyle} type="text" placeholder="Country" onChange={onChangeHandler} name="country" value={formData.country} />
              
              <div className="sm:col-span-2">
                <input required className={inputStyle} type="number" placeholder="Phone Number" onChange={onChangeHandler} name="phone" value={formData.phone} />
              </div>
            </div>
          </motion.div>

          {/* Right Side: Order Summary & Payment */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full lg:w-[45%] xl:w-[40%] lg:sticky lg:top-24"
          >
            <div className="bg-white p-6 sm:p-8 border border-gray-100 shadow-md rounded-sm">
              
              {/* Cart Totals Wrapper */}
              <div className="mb-8">
                <CartTotal />
              </div>

              {/* Payment Methods */}
              <div className="mt-8">
                <h3 className="text-sm font-bold tracking-widest text-[#121212] uppercase mb-5 border-b border-gray-200 pb-3">Payment Method</h3>
                
                <div className="flex flex-col gap-4">
                  {/* Stripe Option */}
                  <div
                    onClick={() => setMethod("stripe")}
                    className={`flex items-center gap-4 p-4 border rounded-sm cursor-pointer transition-all duration-300 ${
                      method === "stripe" ? "border-[#C5A059] bg-[#C5A059]/5 shadow-sm" : "border-gray-200 hover:border-[#C5A059]/50"
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${method === "stripe" ? "border-[#C5A059]" : "border-gray-300"}`}>
                      {method === "stripe" && <div className="w-2 h-2 rounded-full bg-[#C5A059]" />}
                    </div>
                    <img className="h-6 object-contain" src={assets.stripe_logo} alt="Stripe" />
                  </div>

                  {/* COD Option */}
                  <div
                    onClick={() => setMethod("cod")}
                    className={`flex items-center gap-4 p-4 border rounded-sm cursor-pointer transition-all duration-300 ${
                      method === "cod" ? "border-[#C5A059] bg-[#C5A059]/5 shadow-sm" : "border-gray-200 hover:border-[#C5A059]/50"
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${method === "cod" ? "border-[#C5A059]" : "border-gray-300"}`}>
                      {method === "cod" && <div className="w-2 h-2 rounded-full bg-[#C5A059]" />}
                    </div>
                    <p className="text-gray-700 text-sm font-medium tracking-wide uppercase">Cash on Delivery</p>
                  </div>
                </div>
              </div>

              {/* Submit Action */}
              <div className="mt-10">
                <button
                  type="submit"
                  className="group relative w-full h-14 bg-[#121212] text-white text-xs sm:text-sm font-bold tracking-widest uppercase overflow-hidden transition-all duration-300 shadow-xl hover:shadow-[#C5A059]/20"
                >
                  <span className="absolute inset-0 bg-[#C5A059] translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0"></span>
                  <span className="relative z-10 flex items-center justify-center gap-2 transition-colors duration-300">
                    Place Order
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </button>
              </div>

              {/* Security Badge */}
              <div className="mt-6 flex items-center justify-center gap-2 text-gray-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
                <span className="text-[10px] tracking-widest uppercase font-semibold">End-to-End Encrypted Checkout</span>
              </div>

            </div>
          </motion.div>
        </form>
      </div>
    </div>
  );
};

export default PlaceOrder;

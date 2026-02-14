import React, { useContext, useState, useEffect } from "react";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import { ShopContext } from "../contexts/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

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
    }
  }, [token]);

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

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]"
    >
      {/* ---------------- LEFT SIDE: DELIVERY INFO ---------------- */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        
        <div className="flex gap-3">
          <input
            required
            className="border border-gray-300 rounded py-2 px-3.5 w-full focus:outline-none focus:border-black transition-colors"
            type="text"
            placeholder="First Name"
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
          />
          <input
            required
            className="border border-gray-300 rounded py-2 px-3.5 w-full focus:outline-none focus:border-black transition-colors"
            type="text"
            placeholder="Last Name"
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
          />
        </div>
        
        <input
          required
          className="border border-gray-300 rounded py-2 px-3.5 w-full focus:outline-none focus:border-black transition-colors"
          type="email"
          placeholder="Email Address"
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
        />
        
        <input
          required
          className="border border-gray-300 rounded py-2 px-3.5 w-full focus:outline-none focus:border-black transition-colors"
          type="text"
          placeholder="Street"
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
        />
        
        <div className="flex gap-3">
          <input
            required
            className="border border-gray-300 rounded py-2 px-3.5 w-full focus:outline-none focus:border-black transition-colors"
            type="text"
            placeholder="City"
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
          />
          <input
            required
            className="border border-gray-300 rounded py-2 px-3.5 w-full focus:outline-none focus:border-black transition-colors"
            type="text"
            placeholder="State"
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
          />
        </div>
        
        <div className="flex gap-3">
          <input
            required
            className="border border-gray-300 rounded py-2 px-3.5 w-full focus:outline-none focus:border-black transition-colors"
            type="number"
            placeholder="Zipcode"
            onChange={onChangeHandler}
            name="zipcode"
            value={formData.zipcode}
          />
          <input
            required
            className="border border-gray-300 rounded py-2 px-3.5 w-full focus:outline-none focus:border-black transition-colors"
            type="text"
            placeholder="Country"
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
          />
        </div>
        
        <input
          required
          className="border border-gray-300 rounded py-2 px-3.5 w-full focus:outline-none focus:border-black transition-colors"
          type="number"
          placeholder="Phone"
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
        />
      </div>

      {/* ---------------- RIGHT SIDE: CART TOTALS & PAYMENT ---------------- */}
      <div className="mt-8 sm:mt-0 w-full sm:max-w-[400px]">
        
        {/* Cart Totals Box (Custom Styled like Reference) */}
        <div className="mt-8 min-w-80">
          <div className="text-2xl mb-3">
             <Title text1={"CART"} text2={"TOTALS"} />
          </div>
          <div className="flex flex-col gap-2 text-sm">
             <div className="flex justify-between border-b py-2">
                <p>Subtotal</p>
                <p className="font-medium">PKR {getCartAmount()}.00</p>
             </div>
             <div className="flex justify-between border-b py-2">
                <p>Shipping Fee</p>
                <p className="font-medium">PKR {deliveryFee}.00</p>
             </div>
             <div className="flex justify-between py-2 text-lg font-bold">
                <p>Total</p>
                <p>PKR {getCartAmount() === 0 ? 0 : getCartAmount() + deliveryFee}.00</p>
             </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          
          <div className="flex flex-col lg:flex-row gap-3 mt-4">
            
            {/* Stripe Option */}
            <div
              onClick={() => setMethod("stripe")}
              className={`flex items-center gap-3 border p-3 cursor-pointer rounded-sm hover:bg-gray-50 transition-colors ${method === "stripe" ? "border-green-400 bg-green-50" : "border-gray-200"}`}
            >
              <span className={`w-3.5 h-3.5 border rounded-full flex items-center justify-center ${method === "stripe" ? "border-green-400" : "border-gray-300"}`}>
                 {method === "stripe" && <span className="w-2 h-2 bg-green-400 rounded-full"></span>}
              </span>
              <img className="h-5" src={assets.stripe_logo} alt="Stripe" />
            </div>
            
            {/* COD Option */}
            <div
              onClick={() => setMethod("cod")}
              className={`flex items-center gap-3 border p-3 cursor-pointer rounded-sm hover:bg-gray-50 transition-colors ${method === "cod" ? "border-green-400 bg-green-50" : "border-gray-200"}`}
            >
              <span className={`w-3.5 h-3.5 border rounded-full flex items-center justify-center ${method === "cod" ? "border-green-400" : "border-gray-300"}`}>
                 {method === "cod" && <span className="w-2 h-2 bg-green-400 rounded-full"></span>}
              </span>
              <p className="text-gray-700 text-sm font-medium">CASH ON DELIVERY</p>
            </div>
          </div>

          {/* Place Order Button */}
          <div className="w-full text-end mt-8">
            <button
              type="submit"
              className="bg-black text-white w-full sm:w-auto px-10 py-3 text-sm font-semibold uppercase tracking-widest hover:bg-gray-800 transition-all shadow-md active:scale-95"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;

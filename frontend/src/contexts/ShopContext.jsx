import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "PKR ";
  const deliveryFee = 100;
const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState("");
  const [discountPrice, setDiscountPrice] = useState(0);
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );
  const navigate = useNavigate();

  const addToCart = async (itemId, size) => {
    if (!size) {
      return toast.error("Select Size");
    }

    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/add",
          { itemId, size },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {
          console.log("Error in getCartCount: ", error);
        }
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    
  if (quantity === 0) {
    delete cartData[itemId][size];

    // product ke ander koi size nahi bacha
    if (Object.keys(cartData[itemId]).length === 0) {
      delete cartData[itemId];
    }
  } else {
    cartData[itemId][size] = quantity;
  }
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/update",
          { itemId, size, quantity },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          try {
            totalAmount += itemInfo.price * cartItems[items][item];
          } catch (error) {}
        }
      }
    }
    return totalAmount;
  };

const getProductsData = async () => {
  try {
    const response = await axios.get(backendUrl + "/api/product/list");
    console.log("🛰️ API Raw Response:", response.data); // ✅ step 1

    if (response.data.success) {
      console.log("📦 Products fetched from backend:", response.data.products); // ✅ step 2
      // ek example product print karo
      if (response.data.products.length > 0) {
        console.log("💸 Sample Product Discount Price:", response.data.products[0].discountPrice);
      }

      setProducts(response.data.products);
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    console.log("❌ getProductsData Error:", error);
    toast.error(error.message);
  }
};



  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/cart/get",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

 useEffect(() => {
  const loadData = async () => {
    await getProductsData();
    if (token) {
      await getUserCart(token);
    }
    console.log("🧠 Products in state after fetch:", products);
  };
  loadData();
}, [token]);

console.log("🧩 ShopContext final products value:", products);
  const value = {
    products,
    currency,
    discountPrice,
    setDiscountPrice,
    deliveryFee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    token,
    setToken,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;

import { createContext, useEffect, useState ,useContext} from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "./ShopContext";


export const WishlistContext = createContext();

const WishlistContextProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
const { token } = useContext(ShopContext);


  // 🟢 Add Item to Wishlist
  const addToWishlist = async (productId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/wishlist/add",
        { productId },
        { headers: { token } }
      );

      if (response.data.success) {
        setWishlist(response.data.wishlist);
        toast.success("Added to wishlist");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // 🔴 Remove Item
  const removeFromWishlist = async (productId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/wishlist/remove",
        { productId },
        { headers: { token } }
      );

      if (response.data.success) {
        setWishlist(response.data.wishlist);
        toast.info("Removed from wishlist");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // 🟡 Get Wishlist (Auto Load on Login)
  const getWishlist = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/wishlist/get", {
        headers: { token },
      });

      if (response.data.success) {
        setWishlist(response.data.wishlist);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) getWishlist();
  }, [token]);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistContextProvider;

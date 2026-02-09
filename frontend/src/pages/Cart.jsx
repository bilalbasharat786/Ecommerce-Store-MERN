import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../contexts/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import CartTotal from "../components/CartTotal";
import { optimizeImage } from "../utils/imageConfig"; // <-- Ye new line add karo


const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } =
    useContext(ShopContext);
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

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>
      <div>
        {cartData.map((item, index) => {
          const productData = products.find(
            (product) => product._id === item._id
          );
          
if (!productData) {
  console.warn("Product not found for ID:", item._id);
  return null; // skip undefined product
}
          return (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className="flex items-start gap-6 min-h-[80px]">
             <img
  src={optimizeImage(productData.image[0], 200)} // <-- Function use kiya (Size 200px)
  className="w-20 h-20 object-cover" // <-- 'object-cover' add kiya taake image pichke nahi
  alt={productData.name} // <-- Alt tag zaroori hai
  loading="lazy" // <-- Lazy loading for speed
/>


                <div>
                  <p className="text-xs sm:text-lg font-medium">
                    {productData.name}
                  </p>
                  <div className="flex items-center gap-5 mt-2">
                    <p className="flex items-center gap-2">
  {/* Discount Price Logic */}
  {productData.discountPrice > 0 &&
  productData.discountPrice < productData.price ? (
    <>
      <span className="font-medium">
        {currency}{Number(productData.discountPrice).toLocaleString("en-PK")}
      </span>
      <span className="line-through text-gray-500 text-sm">
        {currency}{Number(productData.price).toLocaleString("en-PK")}
      </span>
    </>
  ) : (
    <span className="font-medium">
      {currency}{Number(productData.price).toLocaleString("en-PK")}
    </span>
  )}
</p>

                    <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                      {item.size}
                    </p>
                    <div
                      className="w-5 h-5 rounded-full border border-gray-300"
                      style={{ backgroundColor: item.color }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
  <button
    className="px-2 py-1 border rounded"
    onClick={() =>
      updateQuantity(
        item._id,
        `${item.size}-${item.color}`,
        item.quantity > 1 ? item.quantity - 1 : 1
      )
    }
  >
    -
  </button>

  <span className="px-3 py-1 border rounded">
    {item.quantity}
  </span>

  <button
    className="px-2 py-1 border rounded"
    onClick={() =>
      updateQuantity(
        item._id,
        `${item.size}-${item.color}`,
        item.quantity + 1
      )
    }
  >
    +
  </button>
</div>

             <img
  className="w-4 mr-4 sm:w-5 cursor-pointer min-w-[20px]"
  src={assets.bin_icon}
  alt="bin_icon"
  onClick={() => updateQuantity(item._id, `${item.size}-${item.color}`, 0)}
/>

            </div>
          );
        })}
      </div>
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className=" w-full text-end">
            <button
              onClick={() => navigate("/place-order")}
              className="bg-black text-white text-sm my-8 px-8 py-3 border border-transparent hover:bg-white hover:text-black hover:border-black transition-all duration-1000"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

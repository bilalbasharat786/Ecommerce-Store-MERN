import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../contexts/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller);
    setBestSeller(bestProduct.slice(0, 5));
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center py-6 text-xl sm:text-2xl md:text-3xl">
        <Title text1={"BEST"} text2={"SELLERS"} />
        <p className="w-[90%] sm:w-3/4 m-auto text-[10px] sm:text-sm md:text-base text-gray-600 leading-relaxed">
         Discover our most popular picks — loved by customers for their style,
          comfort, and unbeatable quality. Don’t miss out on the favorites
          everyone’s talking about!
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4 gap-y-4 sm:gap-y-6 px-2 sm:px-0">
        {bestSeller.map((item, index) => (
          <ProductItem
            key={index}
            id={item.id}
            image={item.image}
            name={item.name}
            price={item.price}
            discountPrice={item.discountPrice}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;

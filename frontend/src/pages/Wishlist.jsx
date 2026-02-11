import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../contexts/ShopContext';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Wishlist = () => {
  const { products, wishlist } = useContext(ShopContext);
  const [wishlistProducts, setWishlistProducts] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = products.filter((item) => wishlist[item._id]);
      setWishlistProducts(tempData);
    }
  }, [products, wishlist]);

  return (
    <div className='border-t pt-14 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <div className='text-2xl mb-3'>
        <Title text1={'MY'} text2={'WISHLIST'} />
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {wishlistProducts.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            name={item.name}
            image={item.image}
            price={item.price}
          />
        ))}
      </div>
      
      {wishlistProducts.length === 0 && (
          <p className='text-center text-gray-500 mt-10'>Your wishlist is empty.</p>
      )}
    </div>
  );
};

export default Wishlist;
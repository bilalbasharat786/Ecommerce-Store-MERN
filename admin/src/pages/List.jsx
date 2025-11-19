import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/product/remove",
        { id },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const updateProduct = async (item) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/product/update",
        {
          id: item._id,
          name: item.name,
          price: item.price,
          category: item.category,
          discountPrice: item.discountPrice,
          colors: JSON.stringify(item.colors),
        },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success("Product updated successfully!");
        fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error("Error updating product");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className="mb-2 font-semibold text-lg text-center md:text-left">All Products List</p>

      <div className="flex flex-col gap-3 overflow-y-auto max-h-[80vh] px-2">
        {/* List Header */}
        <div className="hidden sm:grid grid-cols-[1fr_2fr_2fr_1fr_1fr] items-center py-2 px-3 border bg-gray-100 text-xs sm:text-sm font-semibold min-w-[500px]">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Discount</b>
          <b className="text-center">Action</b>
        </div>

        {/* Product Rows */}
        {list.map((item, index) => (
        <div
  key={index}
  className="grid grid-cols-1 sm:grid-cols-[1fr_2fr_2fr_1fr_1fr] items-start gap-3 py-3 px-3 border rounded-md shadow-sm text-sm"
>

            {/* Image */}
            <div className="flex items-center justify-center sm:justify-start">
              <img
                className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded"
                src={item.image[0]}
                alt="product"
              />
            </div>

            {/* Editable name */}
            <input
              type="text"
              className="border px-2 py-1 rounded w-full"
              value={item.name}
              onChange={(e) => {
                const newList = [...list];
                newList[index].name = e.target.value;
                setList(newList);
              }}
            />

            {/* Editable category */}
            <input
              type="text"
              className="border px-2 py-1 rounded w-full"
              value={item.category}
              onChange={(e) => {
                const newList = [...list];
                newList[index].category = e.target.value;
                setList(newList);
              }}
            />

            {/* Editable price */}
            <input
              type="number"
              className="border px-2 py-1 w-16 sm:w-20 text-center rounded"
              value={item.price}
              onChange={(e) => {
                const newList = [...list];
                newList[index].price = e.target.value;
                setList(newList);
              }}
            />
             {/* Editable Discount Price */}
<input
  type="number"
  className="border px-2 py-1 w-16 sm:w-20 text-center rounded"
  value={item.discountPrice}
  onChange={(e) => {
    const newList = [...list];
    newList[index].discountPrice = e.target.value;
    setList(newList);
  }}
/>

            {/* Save + Delete buttons */}
            <div className="flex items-center justify-between sm:justify-end gap-3 mt-2">

              <button
                onClick={() => updateProduct(item)}
                className="bg-green-600 text-white px-2 py-1 rounded text-[10px] sm:text-xs hover:bg-green-700 transition"
              >
                Save
              </button>
              <button
                onClick={() => removeProduct(item._id)}
                className="text-red-500 text-lg font-bold hover:text-red-700 transition"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;



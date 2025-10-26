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
      <p className="mb-2 font-semibold text-lg">All Products List</p>
      <div className="flex flex-col gap-2 overflow-x-auto">
        {/* List Header */}
        <div className="hidden md:grid grid-cols-[1fr_2fr_2fr_1fr_1fr] items-center py-2 px-3 border bg-gray-100 text-sm font-semibold">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {/* Product Rows */}
        {list.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_2fr_2fr_1fr_1fr] items-center gap-2 py-2 px-3 border text-sm"
          >
            <img className="w-12 h-12 object-cover rounded" src={item.image[0]} alt="product" />

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
              className="border px-2 py-1 w-20 text-center rounded"
              value={item.price}
              onChange={(e) => {
                const newList = [...list];
                newList[index].price = e.target.value;
                setList(newList);
              }}
            />

            {/* Save + Delete buttons */}
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => updateProduct(item)}
                className="bg-green-600 text-white px-2 py-1 rounded text-xs hover:bg-green-700 transition"
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


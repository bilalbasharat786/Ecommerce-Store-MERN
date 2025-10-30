import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// function for adding product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      category,
      subCategory,
      bestseller,
      sizes,
    } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      category,
      price: Number(price),
      discountPrice: Number(discountPrice),

      subCategory,
      bestseller: bestseller === "true" ? true : false,
      sizes: JSON.parse(sizes.replace(/'/g, '"')),
      image: imagesUrl,
      date: Date.now(),
    };

    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: "Product Added" });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
    console.log(error);
  }
};

// function for listing product
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// function for removing product
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({
      success: true,
      message: "Product Removed",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};


// Update product price
// Update product details (name, price, category, etc.)
export const updateProduct = async (req, res) => {
  try {
    const { id, name, price, category } = req.body;

    // Optional fields ko filter karlo
    const updatedData = {};
    if (name) updatedData.name = name;
    if (price) updatedData.price = price;
    if (category) updatedData.category = category;

    const product = await productModel.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }
    );

    if (!product)
      return res.json({ success: false, message: "Product not found" });

    res.json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// function for getting single product info
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);

    res.json({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export { listProducts, addProduct, removeProduct, singleProduct };

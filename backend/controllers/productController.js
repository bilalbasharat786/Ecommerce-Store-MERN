import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// function for adding product
const addProduct = async (req, res) => {
  try {
    console.log("📩 Incoming product data:", req.body);

    const {
      name,
      description,
      price,
      category,
      discountPrice,
      subCategory,
      bestseller,
      sizes,
    } = req.body;

    // ⭐ NEW — COLORS PARSE
    let colors = [];
    if (req.body.colors) {
      try {
        colors = JSON.parse(req.body.colors);
        console.log("🎨 Colors received:", colors);
      } catch (err) {
        console.log("❌ Colors JSON parse error:", err);
      }
    }

    // IMAGES
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

    console.log("🖼 Uploaded Images:", imagesUrl);
    console.log("💰 Discount Price Received:", discountPrice);

    // SAVE TO DATABASE
    const productData = {
      name,
      description,
      category,
      price: Number(price),
      discountPrice:
        discountPrice && discountPrice > 0 ? Number(discountPrice) : null,
      subCategory,
      bestseller: bestseller === "true" ? true : false,
      sizes: JSON.parse(sizes.replace(/'/g, '"')),
      colors: colors,                 // ⭐ NEW FIELD
      image: imagesUrl,
      reviews: [],                   // ⭐ NEW FIELD
      date: Date.now(),
    };

    const product = new productModel(productData);
    await product.save();

    console.log("✅ Product Added Successfully:", product);

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
    const { id, name, price, category, discountPrice, colors } = req.body;

    // Optional fields ko filter karlo
    const updatedData = {};
    if (name) updatedData.name = name;
    if (price) updatedData.price = price;
    if (discountPrice) updatedData.discountPrice = discountPrice;
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
const addProductReview = async (req, res) => {
    try {
        const { rating, comment, productId } = req.body;
        
        // Product dhoondo
        const product = await productModel.findById(productId);
        
        // Check karo user ne pehle review to nahi diya?
        const alreadyReviewed = product.reviews.find(
            (r) => r.user.toString() === req.body.userId.toString()
        );

        if (alreadyReviewed) {
            return res.json({ success: false, message: "Product already reviewed" });
        }

        // Naya Review Object
        const review = {
            name: req.body.userName, // Middleware se naam ayega (ya database se fetch krna pdega)
            rating: Number(rating),
            comment,
            user: req.body.userId,
        };

        // Review array mein push karo
        product.reviews.push(review);
        product.numReviews = product.reviews.length;

        // ⭐ Average Rating Calculation Logic
        // Total stars ko number of reviews se divide karo
        product.rating =
            product.reviews.reduce((acc, item) => item.rating + acc, 0) /
            product.reviews.length;

        await product.save();
        res.json({ success: true, message: "Review Added" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export { listProducts, addProduct, removeProduct, singleProduct, addProductReview};

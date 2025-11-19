import mongoose, { mongo } from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  discountPrice: { type: Number, default: 0 },
  image: { type: Array, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  sizes: { type: Array, required: true },
  bestSeller: { type: Boolean },
  date: { type: Number, required: true },
    // ⭐ NEW FIELDS (Color Variants System)
  colors: {
    type: [String], // ["Black", "White", "Red"]
    default: [],
  },

  imagesByColor: {
    type: Object,
    default: {}, 
    // Example:
    // {
    //   Black: ["black1.jpg", "black2.jpg"],
    //   Red: ["red1.jpg", "red2.jpg"]
    // }
  },
});

const productModel =
  mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;

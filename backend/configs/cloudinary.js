import { v2 as cloundinary } from "cloudinary";
import Slider from "../models/sliderModel.js";

const connectCloudinary = async () => {
  cloundinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
};

export const addSlider = async (req, res) => {
  try {
    // req.file.path tab milega jab multer single() laga ho route pe
    const result = await cloundinary.uploader.upload(req.file.path, {
      folder: "sliders", // optional folder name
    });

    const newSlider = new Slider({
      image: result.secure_url,
      public_id: result.public_id, // helpful for deleting later
    });

    await newSlider.save();
    res.json(newSlider);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export default connectCloudinary;

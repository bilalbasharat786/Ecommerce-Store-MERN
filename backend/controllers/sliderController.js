import cloudinary, { connectCloudinary } from "../configs/cloudinary.js";
import Slider from "../models/sliderModel.js";

export const addSlider = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "sliders",
    });

    const newSlider = new Slider({
      image: result.secure_url,
      public_id: result.public_id,
    });

    await newSlider.save();
    res.json({ success: true, slider: newSlider });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};


import cloudinary from "../configs/cloudinary.js";
import Slider from "../models/sliderModel.js";

export const addSliderImage = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "sliders",
    });
    const newImage = new Slider({ image: result.secure_url });
    await newImage.save();
    res.status(201).json({ message: "Image uploaded successfully", newImage });
  } catch (error) {
    res.status(500).json({ message: "Error uploading image", error });
  }
};

export const getSliderImages = async (req, res) => {
  try {
    const images = await Slider.find();
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ message: "Error fetching images", error });
  }
};

export const deleteSliderImage = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Slider.findByIdAndDelete(id);
    res.status(200).json({ message: "Image deleted", deleted });
  } catch (error) {
    res.status(500).json({ message: "Error deleting image", error });
  }
};

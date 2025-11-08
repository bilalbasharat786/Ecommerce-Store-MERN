import sliderModel from "../models/sliderModel.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

export const addSliderImage = async (req, res) => {
  try {
    const imageFile = req.file;
    const upload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });

    const newImage = new sliderModel({ image: upload.secure_url });
    await newImage.save();

    fs.unlinkSync(imageFile.path); // local temp file delete
    res.json({ success: true, message: "Slider image added successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export const getSliderImages = async (req, res) => {
  try {
    const images = await sliderModel.find().sort({ createdAt: -1 });
    res.json({ success: true, images });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export const deleteSliderImage = async (req, res) => {
  try {
    const { id } = req.params;
    await sliderModel.findByIdAndDelete(id);
    res.json({ success: true, message: "Slider image deleted" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

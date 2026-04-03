import express from "express";
import {
  addSliderImage,
  getSliderImages,
  deleteSliderImage,
} from "../controllers/sliderController.js";
import upload from "../middlewares/multer.js";
import adminAuth from "../middlewares/adminAuth.js";

const sliderRouter = express.Router();

sliderRouter.post("/add", adminAuth, upload.single("image"), addSliderImage);
sliderRouter.get("/list", getSliderImages);
sliderRouter.delete("/delete/:id", adminAuth, deleteSliderImage);

export default sliderRouter;

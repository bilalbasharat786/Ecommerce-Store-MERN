import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import OTPModel from "../models/otpModel.js";
import nodemailer from "nodemailer";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const email = payload.email;
    const name = payload.name;
    let user = await userModel.findOne({ email });
    if (!user) {
      user = await userModel.create({
        name,
        email,
        password: "",
      });
    }
    const myToken = createToken(user._id);
    return res.json({ success: true, token: myToken, user });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Google Login Failed" });
  }
};

const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const exist = await userModel.findOne({ email });
    if (exist)
      return res.json({ success: false, message: "User already exists" });
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter a valid email" });
    }
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await OTPModel.create({ email, otp });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your E-Commerce Verification Code",
      text: `Aapka account verification code hai: ${otp}. Yeh 5 minute mein expire ho jayega.`,
    });

    res.json({ success: true, message: "OTP sent successfully!" });
  } catch (error) {
    console.log("Error details:", error);
    res.json({
      success: false,
      message: "Server Error: OTP send nahi ho saka",
    });
  }
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password, otp } = req.body;

    // 1. Verify OTP First
    const validOTP = await OTPModel.findOne({ email, otp });
    if (!validOTP) {
      return res.json({
        success: false,
        message: "Galat OTP ya Expire ho gaya hai!",
      });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be atleast 8 characters long",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({ name, email, password: hashedPassword });
    const user = await newUser.save();
    await OTPModel.deleteOne({ email });

    const token = createToken(user._id);

    res.json({
      success: true,
      token,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User doesn't exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = createToken(user._id);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const addToWishlist = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let wishlistData = userData.wishlist || {};
    if (wishlistData[req.body.itemId]) {
      delete wishlistData[req.body.itemId];
    } else {
      wishlistData[req.body.itemId] = true;
    }
    await userModel.findByIdAndUpdate(req.body.userId, {
      wishlist: wishlistData,
    });
    res.json({ success: true, message: "Wishlist Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const getUserWishlist = async (req, res) => {
  try {
    const userData = await userModel.findById(req.body.userId);
    let wishlistData = userData.wishlist || {};
    res.json({ success: true, wishlistData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  loginUser,
  registerUser,
  adminLogin,
  googleLogin,
  addToWishlist,
  getUserWishlist,
  sendOTP,
};

import userModel from "../models/userModel.js";
import productModel from "../models/productModel.js";

// ⭐ GET WISHLIST
export const getWishlist = async (req, res) => {
  try {
    const user = await userModel
      .findById(req.user.id)
      .populate("wishlist.product"); // product ki details lane ke liye

    res.json({
      success: true,
      wishlist: user.wishlist,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// ⭐ ADD TO WISHLIST
export const addToWishlist = async (req, res) => {
  try {
    const { productId, size } = req.body;

    const product = await productModel.findById(productId);
    if (!product) {
      return res.json({ success: false, message: "Product not found" });
    }

    const user = await userModel.findById(req.user.id);

    // Check duplicate
    const alreadyAdded = user.wishlist.find(
      (item) =>
        item.product.toString() === productId &&
        item.size === size
    );

    if (alreadyAdded) {
      return res.json({ success: false, message: "Already in wishlist" });
    }

    user.wishlist.push({
      product: productId,
      size,
      addedAt: Date.now(),
    });

    await user.save();

    res.json({ success: true, wishlist: user.wishlist });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// ⭐ REMOVE FROM WISHLIST
export const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;

    const user = await userModel.findById(req.user.id);

    user.wishlist = user.wishlist.filter(
      (item) => item.product.toString() !== productId
    );

    await user.save();

    res.json({
      success: true,
      wishlist: user.wishlist,
    });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

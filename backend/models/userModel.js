import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },

    // ⭐ GOOGLE USERS KE LIYE PASSWORD OPTIONAL
    password: { type: String, required: false },

    cartData: { type: Object, default: {} },

    // ⭐ WISHLIST FIELD (NEW)
    wishlist: {
      type: [
        {
          product: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
          size: { type: String }, // optional
          addedAt: { type: Date, default: Date.now }
        }
      ],
      default: []
    }
  },
  { minimize: false }
);

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;



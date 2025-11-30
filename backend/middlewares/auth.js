import jwt from "jsonwebtoken";

console.log("📌 [authUser] Middleware Loaded");

const authUser = async (req, res, next) => {
  console.log("➡️ [authUser] Checking token in headers...");
  console.log("📨 Headers Received:", req.headers);

  const { token } = req.headers;

  if (!token) {
    console.log("❌ [authUser] No token found in request headers");
    return res.json({
      success: false,
      message: "Not Authorized - Token Missing",
    });
  }

  try {
    console.log("🔐 [authUser] Verifying Token...");
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    console.log("✅ [authUser] Token Decoded:", tokenDecode);

    // ⭐ Your structure:
    req.user = { id: tokenDecode.id };

    console.log("👤 [authUser] User attached to req:", req.user);

    next();
  } catch (error) {
    console.log("🔥 [authUser ERROR]", error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export default authUser;



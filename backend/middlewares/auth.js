import jwt from "jsonwebtoken";

console.log("📌 [authUser] Middleware Loaded");

const authUser = async (req, res, next) => {
  console.log("➡️ [authUser] Checking token in headers...");
  console.log("📨 Headers Received:", req.headers);

  const token =
    req.headers.token ||
    req.headers.authorization?.replace("Bearer ", "") ||
    req.headers.Authorization?.replace("Bearer ", "");

  if (!token) {
    console.log("❌ [authUser] No token found in request headers");
    return res.status(401).json({
      success: false,
      message: "Not Authorized - Token Missing",
    });
  }

  try {
    console.log("🔐 [authUser] Verifying Token...");
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = tokenDecode.id;

    console.log("👤 [authUser] User ID:", req.userId);
    next();
  } catch (error) {
    console.log("🔥 [authUser ERROR]", error);
    res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};

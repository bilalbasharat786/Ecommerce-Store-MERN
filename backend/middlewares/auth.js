import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  console.log("➡️ [authUser] Checking token...");

  const rawAuth = req.headers.authorization; // ALWAYS lowercase
  const rawToken = req.headers.token;

  console.log("📨 Headers:", req.headers);

  let token = null;

  // If Authorization header exists
  if (rawAuth && rawAuth.startsWith("Bearer ")) {
    token = rawAuth.split(" ")[1];
  }

  // Fallback for old method
  if (!token && rawToken) {
    token = rawToken;
  }

  if (!token) {
    console.log("❌ No token found");
    return res.status(401).json({ success: false, message: "Token Missing" });
  }

  try {
    console.log("🔐 Verifying token...");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("👤 User ID:", decoded.id);

    req.userId = decoded.id;

    next();
  } catch (error) {
    console.log("🔥 Token Error:", error);
    return res.status(401).json({ success: false, message: "Invalid Token" });
  }
};

export default authUser;


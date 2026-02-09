// frontend/src/utils/imageConfig.js

export const optimizeImage = (url, width = 800) => {
  if (!url) return "";
  
  // Agar ye Cloudinary ki image nahi hai to wese hi wapis kardo
  if (!url.includes("cloudinary.com")) return url;

  // Magic Parameters:
  // q_auto: Quality automatically set karo (size kam, quality best)
  // f_auto: Format automatically set karo (Chrome ke liye WebP, Safari ke liye kuch aur)
  // w_${width}: Image ki chorayi (width) set karo taake 4k image load na ho mobile par
  
  return url.replace("/upload/", `/upload/q_auto,f_auto,w_${width}/`);
};
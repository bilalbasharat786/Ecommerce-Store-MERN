// frontend/src/utils/imageConfig.js

export const optimizeImage = (url, width = 800) => {
  if (!url) return "";

  if (!url.includes("cloudinary.com")) return url;

  
  return url.replace("/upload/", `/upload/q_auto,f_auto,w_${width}/`);
};
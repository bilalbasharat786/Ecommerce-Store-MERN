import multer from "multer";
import path from "path";

// Upload storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // uploads folder (root me hona chahiye)
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${Date.now()}-${file.fieldname}${path.extname(file.originalname)}`
    );
  },
});

// File filter (optional safety)
const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|webp/;
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowed.test(ext)) cb(null, true);
  else cb(new Error("Only image files are allowed"));
};

const upload = multer({
  storage,
  fileFilter,
});

export default upload;


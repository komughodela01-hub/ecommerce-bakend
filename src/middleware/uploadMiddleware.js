const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const createUploader = (folderName) => {
  const uploadPath = path.join(__dirname, "../uploads", folderName);  //folder ka path bna rhi h 

  // Create Folder If Not Exists
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadPath);
    },

    filename: (req, file, cb) => {
      const uniqueName = uuidv4() + path.extname(file.originalname);

      cb(null, uniqueName);
    },
  });

  const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only JPG, JPEG and PNG files are allowed."));
    }
  };

  return multer({
    storage,
    fileFilter,
  });
};

module.exports = createUploader
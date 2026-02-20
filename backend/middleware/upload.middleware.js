import multer from "multer";

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file format! Only images are allowed"), false);
  }
}

export const uploadUserAvatar = multer({ storage: storageConfig, fileFilter: fileFilter, limits: { fieldSize: 1024 * 1024 } }).single("image");
export const uploadTestImage = multer({ storage: storageConfig, fileFilter: fileFilter }).single("testImage");
export const uploadQuestionImage = multer({ storage: storageConfig, fileFilter: fileFilter, limits: {fieldSize: 512 * 1024}}).single("questionImage")
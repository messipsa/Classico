import multer from "multer";

/*const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("invalid image file!", false);
  }
};*/

export const ProfilPictureUpload = multer({
  storage: multer.diskStorage({}),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb("invalid image file!", false);
    }
  },
});

export const postPicturesUpload = multer({
  storage: multer.diskStorage({}),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb("invalid image file!", false);
    }
  },
});

export const commentPicturesUpload = multer({
  storage: multer.diskStorage({}),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb("invalid image file!", false);
    }
  },
});

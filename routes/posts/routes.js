import express from "express";
const router = express.Router();
import { postPicturesUpload } from "../../core/multer.js";
import { errorHandler } from "../../Middlewares/error.js";
import { addNewPost } from "./controllers.js";

router.post(
  "/add",
  postPicturesUpload.array("postPic"),
  addNewPost,
  errorHandler
);

export default router;

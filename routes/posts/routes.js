import express from "express";
const router = express.Router();
import { postPicturesUpload } from "../../core/multer.js";
import { errorHandler } from "../../Middlewares/error.js";
import { addNewPost, getAllPosts } from "./controllers.js";
import { validate, ValidationSource } from "../../Utils/validate.js";
import { postValidation } from "./schema.js";

router.post(
  "/add",
  postPicturesUpload.array("postPic"),
  validate(postValidation, ValidationSource.BODY),
  addNewPost,
  errorHandler
);

router.get("/", getAllPosts, errorHandler);

export default router;

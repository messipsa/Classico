import express from "express";
const router = express.Router();
import { postPicturesUpload } from "../../core/multer.js";
import { errorHandler } from "../../Middlewares/error.js";
import {
  addNewPost,
  getAllPosts,
  getPost_Id,
  getPost_UserId,
} from "./controllers.js";
import { validate, ValidationSource } from "../../Utils/validate.js";
import { postValidation, idValidation, userIdValidation } from "./schema.js";

router.post(
  "/add",
  postPicturesUpload.array("postPic"),
  validate(postValidation, ValidationSource.BODY),
  addNewPost,
  errorHandler
);

router.get("/", getAllPosts, errorHandler);

router.get(
  "/:id",
  validate(idValidation, ValidationSource.PARAMS),
  getPost_Id,
  errorHandler
);

router.get(
  "/user/:userId",

  validate(userIdValidation, ValidationSource.PARAMS),
  getPost_UserId,
  errorHandler
);

export default router;

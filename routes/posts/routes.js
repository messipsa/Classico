import express from "express";
const router = express.Router();
import { postPicturesUpload } from "../../core/multer.js";
import { errorHandler } from "../../Middlewares/error.js";
import {
  addNewPost,
  getAllPosts,
  getPost_Id,
  getPost_UserId,
  likePost,
  unlikePost,
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

router.put(
  "/likepost/:id",
  validate(idValidation, ValidationSource.PARAMS),
  validate(userIdValidation, ValidationSource.BODY),
  likePost,
  errorHandler
);

router.put(
  "/unlikepost/:id",
  validate(idValidation, ValidationSource.PARAMS),
  validate(userIdValidation, ValidationSource.BODY),
  unlikePost,
  errorHandler
);

export default router;

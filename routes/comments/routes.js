import express from "express";
const router = express.Router();

import { commentPicturesUpload } from "../../core/multer.js";
import { errorHandler } from "../../Middlewares/error.js";
import { validate, ValidationSource } from "../../Utils/validate.js";
import { addComment, deleteComment } from "./controllers.js";
import {
  commentValidation,
  idValidation,
  commentIdValidation,
} from "./schema.js";
import { userIdValidation } from "../posts/schema.js";

router.put(
  "/commentpost/:id",
  commentPicturesUpload.single("commentPic"),
  validate(idValidation, ValidationSource.PARAMS),
  validate(commentValidation, ValidationSource.BODY),
  addComment,
  errorHandler
);

router.delete(
  "/removecomment/:id",

  validate(idValidation, ValidationSource.PARAMS),
  validate(commentIdValidation, ValidationSource.BODY),
  deleteComment,
  errorHandler
);

export default router;

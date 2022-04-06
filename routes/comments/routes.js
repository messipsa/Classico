import express from "express";
const router = express.Router();

import { commentPicturesUpload } from "../../core/multer.js";
import { errorHandler } from "../../Middlewares/error.js";
import { validate, ValidationSource } from "../../Utils/validate.js";
import { addComment } from "./controllers.js";
import { commentValidation, idValidation } from "./schema.js";

router.put(
  "/commentpost/:id",
  commentPicturesUpload.single("commentPic"),
  validate(idValidation, ValidationSource.PARAMS),
  validate(commentValidation, ValidationSource.BODY),
  addComment,
  errorHandler
);

export default router;

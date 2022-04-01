import express from "express";
const router = express.Router();
import { errorHandler } from "../../Middlewares/error.js";
import { validate, ValidationSource } from "../../Utils/validate.js";
import {
  getCategory,
  getCategories,
  //addNewCategory,
  //updateCategory,
} from "./controllers.js";
import { idValidation } from "./schema.js";

router.get("", getCategories, errorHandler);

router.get(
  "/:id",
  validate(idValidation, ValidationSource.PARAMS),
  getCategory,
  errorHandler
);

//router.post("/add", addNewCategory, errorHandler);

//router.put("/updateCategory", updateCategory, errorHandler);

export default router;

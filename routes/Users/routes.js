import express from "express";
const router = express.Router();
import { register, suspend } from "./controllers.js";
import {
  validateEmail,
  validateUserName,
} from "../../Middlewares/Validation/userValidation.js";
import { errorHandler } from "../../Middlewares/error.js";
import { validate, ValidationSource } from "../../Utils/validate.js";
import { userSchemaValidation, idValidation } from "../Users/schema.js";

router.post(
  "/register",
  validate(userSchemaValidation, ValidationSource.BODY),
  register,
  errorHandler
);

router.put(
  "/suspend/:id",
  validate(idValidation, ValidationSource.PARAMS),
  suspend,
  errorHandler
);

export default router;

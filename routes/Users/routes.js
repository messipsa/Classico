import express from "express";
const router = express.Router();
import { register, suspend, allow, follow, unfollow } from "./controllers.js";
import {
  validateEmail,
  validateUserName,
} from "../../Middlewares/Validation/userValidation.js";
import { errorHandler } from "../../Middlewares/error.js";
import { validate, ValidationSource } from "../../Utils/validate.js";
import {
  userSchemaValidation,
  idValidation,
  idValidationRequired,
  codeValidation,
} from "../Users/schema.js";

router.post(
  "/register",
  validate(userSchemaValidation, ValidationSource.BODY),
  register,
  errorHandler
);

router.put(
  "/follow/:id",
  validate(idValidation, ValidationSource.PARAMS),
  validate(idValidationRequired, ValidationSource.BODY),
  follow,
  errorHandler
);

router.put(
  "/unfollow/:id",
  validate(idValidation, ValidationSource.PARAMS),
  validate(idValidationRequired, ValidationSource.BODY),
  unfollow,
  errorHandler
);

router.put(
  "/suspend/:id",
  validate(idValidation, ValidationSource.PARAMS),
  suspend,
  errorHandler
);

router.put(
  "/allow/:id",
  validate(idValidation, ValidationSource.PARAMS),
  allow,
  errorHandler
);

router.get(
  "/confirmation/verify",
  validate(codeValidation, ValidationSource.QUERY),
  (req, res) => {
    console.log(req.query);
    res.send("<p>Salim</p>");
  },
  errorHandler
);

export default router;

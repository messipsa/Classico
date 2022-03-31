import express from "express";
const router = express.Router();
import {
  register,
  suspend,
  allow,
  follow,
  unfollow,
  sendConfirmationEmail,
  verifyAccount,
  login,
  logout,
  getAllUsers,
  getUser,
  updateBiog,
  updateProfilPicture,
} from "./controllers.js";
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
  loginSchemaValidation,
  bioValidation,
} from "../Users/schema.js";
import { ProfilPictureUpload } from "../../core/multer.js";

router.post(
  "/register",
  validate(userSchemaValidation, ValidationSource.BODY),
  register,
  errorHandler
);

router.post(
  "/login",
  validate(loginSchemaValidation, ValidationSource.BODY),
  login,
  errorHandler
);

router.post("/logout", logout, errorHandler);

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

router.post(
  "/sendConfirmationEmail/:id",
  validate(idValidation, ValidationSource.PARAMS),
  sendConfirmationEmail,
  errorHandler
);

router.get(
  "/confirmation/verify",
  validate(codeValidation, ValidationSource.QUERY),
  verifyAccount,
  errorHandler
);

router.get("/", getAllUsers, errorHandler);

router.get(
  "/:id",
  validate(idValidation, ValidationSource.PARAMS),
  getUser,
  errorHandler
);

router.put(
  "/updateBio/:id",
  validate(idValidation, ValidationSource.PARAMS),
  validate(bioValidation, ValidationSource.BODY),
  updateBiog,
  errorHandler
);

router.put(
  "/upload/profilepicture/:id",
  validate(idValidation, ValidationSource.PARAMS),
  (req, res, next) => {
    console.log(req.params.id);
    next();
  },
  ProfilPictureUpload.single("profilePic"),
  updateProfilPicture,
  errorHandler
);

export default router;

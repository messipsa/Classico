import express from "express";
const router = express.Router();
import { register } from "./controllers.js";
import { validateEmail } from "../../Middlewares/Validation/userValidation.js";
import { errorHandler } from "../../Middlewares/error.js";

router.post("/register", validateEmail, register, errorHandler);

export default router;

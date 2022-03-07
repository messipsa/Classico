import express from "express";
const router = express.Router();
import { register } from "./controllers.js";

router.post("/register", register);

export default router;

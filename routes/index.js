import express from "express";
import usersRouter from "./Users/routes.js";
const router = express.Router();

router.use("/users", usersRouter);

export default router;

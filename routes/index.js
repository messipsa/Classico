import express from "express";
import usersRouter from "./Users/routes.js";
import categoryRouter from "./categories/routes.js";

const router = express.Router();

router.use("/users", usersRouter);

router.use("/categories", categoryRouter);

export default router;

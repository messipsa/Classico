import express from "express";
import usersRouter from "./Users/routes.js";
import categoryRouter from "./categories/routes.js";
import postRouter from "./posts/routes.js";
import commentRouter from "./comments/routes.js";

const router = express.Router();

router.use("/users", usersRouter);

router.use("/categories", categoryRouter);

router.use("/posts", postRouter);

router.use("/comments", commentRouter);

export default router;

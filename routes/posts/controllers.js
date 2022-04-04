import path from "path";
import { Post } from "../../models/post.js";
import ErrorResponse from "../../Utils/errorResponse.js";
import { createPost } from "./service.js";
import { findUserById } from "../Users/service.js";
import { getUserCategory } from "../categories/service.js";

export const addNewPost = async (req, res, next) => {
  try {
    console.log(req.body.userId + "    ci joint");

    const user = await findUserById(req.body.userId);
    if (!user) {
      throw new ErrorResponse("User not found", 404);
    }
    const category = await getUserCategory(req.body.category);
    if (!category) {
      throw new ErrorResponse("Category not found", 404);
    }
    if (!req.files) {
      req.files = [];
    }

    const post = await createPost(req.body, req.files);

    res
      .status(200)
      .json({ success: true, message: "post created successfully", post });
  } catch (err) {
    next(err);
  }
};

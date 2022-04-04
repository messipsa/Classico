import path from "path";
import { Post } from "../../models/post.js";
import ErrorResponse from "../../Utils/errorResponse.js";
import {
  createPost,
  getPosts,
  getPostById,
  getPostByUserId,
} from "./service.js";
import { findUserById } from "../Users/service.js";
import { getUserCategory } from "../categories/service.js";

export const addNewPost = async (req, res, next) => {
  try {
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

export const getAllPosts = async (req, res, next) => {
  try {
    const posts = await getPosts();
    if (!posts) {
      throw new ErrorResponse("No posts found", 404);
    }
    res.status(200).json({
      success: true,
      message: "getting all posts completed successfully",
      posts,
    });
  } catch (err) {
    next(err);
  }
};

export const getPost_Id = async (req, res, next) => {
  try {
    const post = await getPostById(req.params.id);
    if (!post) {
      throw new ErrorResponse("post not found", 404);
    }
    res.status(200).json({
      success: true,
      message: "getting post completed successfully",
      post,
    });
  } catch (err) {
    next(err);
  }
};

export const getPost_UserId = async (req, res, next) => {
  try {
    console.log(req.params.userId);
    const user = await findUserById(req.params.userId);
    if (!user) {
      throw new ErrorResponse("User not found", 404);
    }
    const post = await getPostByUserId(req.params.userId);
    if (post.length === 0) {
      throw new ErrorResponse("user's posts not found", 404);
    }
    res.status(200).json({
      success: true,
      message: "getting user's posts completed successfully",
      post,
    });
  } catch (err) {
    next(err);
  }
};

import ErrorResponse from "../../Utils/errorResponse.js";
import { getPostById } from "../posts/service.js";
import { findUserById } from "../Users/service.js";
import { addNewComment, pushCommentId } from "./service.js";

export const addComment = async (req, res, next) => {
  try {
    const user = await findUserById(req.body.userId);
    if (!user) {
      throw new ErrorResponse("User not found", 404);
    }
    const post = await getPostById(req.params.id);
    if (!post) {
      throw new ErrorResponse("Post not found", 404);
    }
    const comment = await addNewComment(req.body, req.file);
    const postWithNewComment = await pushCommentId(post, comment._id);
    res.status(200).json({
      success: true,
      message: "comment added successfully",
      comment,
      postWithNewComment,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const user = await findUserById(req.body.userId);
    if (!user) {
      throw new ErrorResponse("User not found", 404);
    }
    const post = await getPostById(req.params.id);
    if (!post) {
      throw new ErrorResponse("Post not found", 404);
    }
  } catch (err) {
    next(err);
  }
};

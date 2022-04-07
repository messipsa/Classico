import { Comment } from "../../models/comments.js";
import ErrorResponse from "../../Utils/errorResponse.js";
import cloudinary from "../../core/cloudinary.js";
import { Post } from "../../models/post.js";

export const findCommentById = async (id) => {
  try {
    const comment = Comment.findById(id);
    return comment;
  } catch (err) {
    throw new ErrorResponse("getting comment failed due to server error", 500);
  }
};

export const addNewComment = async (commentaire, image) => {
  try {
    let comment;

    if (!image) {
      comment = await Comment.create({
        commenterId: commentaire.userId,
        text: commentaire.text,
        picture: "",
      });

      return comment;
    }

    let result = await uploadImage(image);
    comment = await Comment.create({
      commenterId: commentaire.userId,
      text: commentaire.text,
      picture: result.url,
    });
    return comment;
  } catch (err) {
    throw new ErrorResponse(
      "adding new comment failed due to server error",
      500
    );
  }
};

const uploadImage = async (image) => {
  try {
    let result = await cloudinary.uploader.upload(image.path);

    return result;
  } catch (err) {
    throw new ErrorResponse("uploading image failed due to server error", 500);
  }
};

export const pushCommentId = async (post, commentId) => {
  try {
    const postCommented = await Post.findByIdAndUpdate(
      post._id,
      { $push: { comments: commentId }, nbComments: post.nbComments + 1 },
      { new: true }
    );
    return postCommented;
  } catch (err) {
    throw new ErrorResponse(
      "pushing comment id in post failed due to server error",
      500
    );
  }
};

export const removeCommentFromArray = async (post, commentId) => {
  try {
    const postRemoved = await Post.findByIdAndUpdate(
      post._id,
      {
        comments: post.comments.filter((e) => {
          return String(e) !== String(commentId);
        }),
        nbComments: post.nbComments - 1,
      },
      { new: true }
    );
    return postRemoved;
  } catch (err) {
    throw new ErrorResponse("deleting comment failed due to server error", 500);
  }
};

export const deleteCommentFromComments = async (commentId) => {
  try {
    await Comment.findByIdAndDelete(commentId);
  } catch (err) {
    throw new ErrorResponse("deleting comment failed due to server error", 500);
  }
};

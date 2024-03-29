import { Post } from "../../models/post.js";
import ErrorResponse from "../../Utils/errorResponse.js";
import cloudinary from "../../core/cloudinary.js";
import { deleteCommentFromComments } from "../comments/service.js";

export const createPost = async (postInput, images) => {
  try {
    let posted = images;

    const arrayOfUrls = await uploadImages(images);
    const post = await Post.create({
      userId: postInput.userId,
      title: postInput.title,
      snippet: postInput.snippet,
      body: postInput.body,
      category: postInput.category,
      likers: [],
      nbLikes: 0,
      comments: [],
      pictures: arrayOfUrls,
    });

    return post;
  } catch (err) {
    throw new ErrorResponse("Post creation failed due to server Error", 500);
  }
};

const uploadImages = async (images) => {
  try {
    let arrayOfUrls = [];
    if (images.length === 0) {
      return arrayOfUrls;
    }
    for (let i = 0; i < images.length; i++) {
      let result = await cloudinary.uploader.upload(images[i].path);
      arrayOfUrls.push(result.url);
    }
    return arrayOfUrls;
  } catch (err) {
    throw new ErrorResponse("Images upload failed due to server Error", 500);
  }
};

export const getPosts = async () => {
  try {
    const posts = await Post.find()
      .populate("category", "-__v")
      .populate(
        "userId",
        "-followers -following -password -verified -suspended -role -confirmationCode -createdAt -updatedAt -__v"
      )
      .populate(
        "likers",
        "-followers -following -password -verified -suspended -role -confirmationCode -createdAt -updatedAt -__v"
      )
      .populate("comments");

    return posts;
  } catch (err) {
    throw new ErrorResponse("get posts failed due to server Error", 500);
  }
};

export const getPostById = async (id) => {
  try {
    const post = await Post.findById(id)
      .populate("category", "-__v")
      .populate(
        "userId",
        "-followers -following -password -verified -suspended -role -confirmationCode -createdAt -updatedAt -__v"
      )
      .populate(
        "likers",
        "-followers -following -password -verified -suspended -role -confirmationCode -createdAt -updatedAt -__v"
      )
      .populate("comments");
    return post;
  } catch (err) {
    throw new ErrorResponse("get post failed due to server Error", 500);
  }
};

export const getPostByUserId = async (id) => {
  try {
    console.log(id);
    const post = await Post.find({ userId: id })
      .populate("category", "-__v")
      .populate(
        "userId",
        "-followers -following -password -verified -suspended -role -confirmationCode -createdAt -updatedAt -__v"
      )
      .populate(
        "likers",
        "-followers -following -password -verified -suspended -role -confirmationCode -createdAt -updatedAt -__v"
      )
      .populate("comments");
    return post;
  } catch (err) {
    throw new ErrorResponse("get post failed due to server Error", 500);
  }
};

export const getPostComments = async (id) => {
  try {
    const post = await Post.findById(id).populate("comments");
    return post;
  } catch (err) {
    throw new ErrorResponse(
      "getting post's comments failed due to server error",
      500
    );
  }
};

export const like_Post = async (post, userId) => {
  try {
    const postLiked = await Post.findByIdAndUpdate(
      post._id,
      { $push: { likers: userId }, nbLikes: post.nbLikes + 1 },
      { new: true }
    );

    return postLiked;
  } catch (err) {
    throw new ErrorResponse("like post failed due to server Error", 500);
  }
};

export const unlike_Post = async (post, userId) => {
  try {
    const postUnLiked = await Post.findByIdAndUpdate(
      post._id,
      {
        likers: post.likers.filter((e) => {
          return String(e) !== String(userId);
        }),
        nbLikes: post.nbLikes - 1,
      },
      { new: true }
    );

    return postUnLiked;
  } catch (err) {
    throw new ErrorResponse(
      "remove like from post failed due to server Error",
      500
    );
  }
};

export const removePost = async (post) => {
  try {
    if (post.comments.length > 0) {
      for (let i = 0; i < post.comments.length; i++) {
        await deleteCommentFromComments(post.comments[i]);
      }
    }
    await Post.findByIdAndDelete(post._id);
  } catch (err) {
    throw new ErrorResponse("deleting post failed due to server error ", 500);
  }
};

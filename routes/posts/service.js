import { Post } from "../../models/post.js";
import ErrorResponse from "../../Utils/errorResponse.js";
import cloudinary from "../../core/cloudinary.js";

export const createPost = async (postInput, images) => {
  try {
    let posted = images;

    const arrayOfUrls = await uploadImages(images);
    const post = await Post.create({
      userId: postInput.userId,
      title: "kARIM HENDAOUI",
      snippet: "karim",
      body: "Bst Egyprian Goalkeeper",
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

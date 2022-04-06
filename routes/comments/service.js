import { Comment } from "../../models/comments.js";
import ErrorResponse from "../../Utils/errorResponse.js";
import cloudinary from "../../core/cloudinary.js";

export const addNewComment = async (commentaire, image) => {
  try {
    let comment;
    console.log(image);
    if (!image) {
      console.log("le mafihachisme");
      comment = await Comment.create({
        commenterId: commentaire.userId,
        text: commentaire.text,
        picture: "",
      });
      console.log("kelb raged");
      console.log(comment);
      return comment;
    }
    console.log("le fihachisme");
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
    console.log(image);
    let result = await cloudinary.uploader.upload(image.path);
    console.log("akhla9i");
    console.log(result);
    return result;
  } catch (err) {
    throw new ErrorResponse("uploading image failed due to server error", 500);
  }
};

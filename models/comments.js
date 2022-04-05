import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
  {
    commenterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Utilisateur",
      required: true,
    },
    commenterUserName: {
      type: mongoose.Schema.Types.String,
      minlength: 4,
      maxlength: 255,
      required: true,
    },
    text: {
      type: mongoose.Schema.Types.String,
      minLength: 1,
      required: true,
    },
    picture: {
      type: mongoose.Schema.Types.String,
    },
  },
  {
    timestamps: true,
  }
);

export const Comment = mongoose.model("comment", commentSchema);

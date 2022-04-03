import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    title: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    snippet: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    body: {
      type: mongoose.Schema.Types.String,
      required: true,
    },

    likers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Utilisateur",
        required: true,
        default: [],
      },
    ],

    nbLikes: {
      type: mongoose.Schema.Types.Number,
      required: true,
      default: true,
    },

    category: {
      type: mongoose.Schema.Types.String,
      ref: "category",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Post = mongoose.model("post", postSchema);

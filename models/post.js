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
      ref: "Category",
      required: true,
    },

    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],

    pictures: {
      type: [mongoose.Schema.Types.String],
      required: true,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export const Post = mongoose.model("post", postSchema);

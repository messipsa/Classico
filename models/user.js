import mongoose from "mongoose";
import pkg from "validator";
const { isEmail } = pkg;

export const roleType = {
  ADMIN: "admin",
  UTILISATEUR: "utilisateur",
};
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: mongoose.Schema.Types.String,
      required: true,
      minlength: 4,
      maxlength: 255,
      unique: true,
    },

    email: {
      type: mongoose.Schema.Types.String,
      required: true,
      unique: true,
      trim: true,
      validate: [isEmail],
    },

    password: {
      type: mongoose.Schema.Types.String,
      required: true,
      minlength: 6,
      maxlength: 1024,
    },

    profilePic: {
      type: mongoose.Schema.Types.String,
      required: true,
    },

    role: {
      type: mongoose.Schema.Types.String,
      required: true,
      enum: [roleType.ADMIN, roleType.UTILISATEUR],
    },

    verified: {
      type: mongoose.Schema.Types.Boolean,
      required: true,
    },

    suspended: {
      type: mongoose.Schema.Types.Boolean,
      required: true,
    },

    followers: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
    },

    following: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
    },

    confirmationCode: {
      type: mongoose.Schema.Types.String,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("Utilisateur", userSchema);

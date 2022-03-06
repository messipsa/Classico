const mongoose = require("mongoose");
const { isEmail } = require("validator");

const roleType = {
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
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

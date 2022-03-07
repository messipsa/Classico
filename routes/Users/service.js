import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../../models/user.js";
import userSchemaValidation from "./schema.js";
import { emailValidation } from "./schema.js";
import joi from "joi";

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const passwordHashed = await bcrypt.hash(password, salt);
  return passwordHashed;
};

const verifyPassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, passwordHashed);
};

const createToken = (user) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN, {
    expiresIn: 24 * 60 * 60 * 1000,
  });
  return token;
};

const findUserByEmail = async (email) => {
  try {
    let user = await emailValidation.validateAsync(email);
    user = await User.findOne({ email: email });
    const result = await userSchemaValidation.email.validateAsync();
    if (!user) {
      return null;
    }
    return {
      userName: user.userName,
      password: user.password,
      email: user.email,
      _id: user._id,
      profilePic: user.profilePic,
      verified: user.verified,
      suspended: user.suspended,
      role: user.role,
    };
  } catch (error) {
    return error;
  }
};

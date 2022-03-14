import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../../models/user.js";
//import userSchemaValidation from "./schema.js";
import { emailValidation } from "./schema.js";
import joi from "joi";
import ErrorResponse from "../../Utils/errorResponse.js";

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

export const findUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email: email });
    return user;
  } catch (err) {
    throw new ErrorResponse("Server Error", 500);
  }
};

export const createUser = async (userName, email, motDePasse) => {};

export const uniqueUserName = async (userName) => {
  try {
    const user = await User.findOne({ userName: userName });
    return user;
  } catch (e) {
    throw new ErrorResponse("Server Error", 500);
  }
};

import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../../models/user.js";
import ErrorResponse from "../../Utils/errorResponse.js";
import { roleType } from "../../models/user.js";

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const passwordHashed = await bcrypt.hash(password, salt);
  return passwordHashed;
};

export const verifyPassword = async (password, hashedPassword) => {
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

export const createUser = async (username, email, motDePasse) => {
  try {
    const hashedPwd = await hashPassword(motDePasse);

    const user = await User.create({
      userName: username,
      email: email,
      password: hashedPwd,
      profilePic: "lyas.png",
      role: roleType.ADMIN,
      verified: false,
      suspended: false,
      followers: [],
      following: [],
    });
    return user;
  } catch (err) {
    console.log(err);
    throw new ErrorResponse("User creation failed due to server Error", 500);
  }
};

export const uniqueUserName = async (userName) => {
  try {
    const user = await User.findOne({ userName: userName });
    return user;
  } catch (e) {
    throw new ErrorResponse("Server Error", 500);
  }
};

export const findUserById = async (id) => {
  try {
    const user = await User.findOne({ _id: id });
    return user;
  } catch (err) {
    throw new ErrorResponse("Server Error", 500);
  }
};

export const followUser = async (id, idToFollow) => {
  try {
    const user = await findUserById(id);
    const utilisateur = await findUserById(idToFollow);
    console.log(user.followers);
    if (!user.followers.includes(idToFollow)) {
      user.following.push(idToFollow);
      utilisateur.followers.push(id);
      await user.save();
      await utilisateur.save();
    } else {
      throw new ErrorResponse("user already followed", 409);
    }
  } catch (err) {
    if (err.statusCode === 409)
      throw new ErrorResponse("user already followed", 409);
    else throw new ErrorResponse("Follow failed due to Server Error", 500);
  }
};

export const verifySameAccount = (id, idTwo) => {
  return id === idTwo;
};

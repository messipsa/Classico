import {
  findUserById,
  findUserByEmail,
  uniqueUserName,
  createUser,
  followUser,
  verifySameAccount,
} from "./service.js";
import { User } from "../../models/user.js";
import ErrorResponse from "../../Utils/errorResponse.js";

export const register = async (req, res, next) => {
  try {
    const result = await findUserByEmail(req.body.email);
    if (result) {
      next(new ErrorResponse("an account already exists with this email", 409));
    }
    const name = await uniqueUserName(req.body.userName);
    if (name) {
      next(
        new ErrorResponse("an account already exists with this userName", 409)
      );
    }

    const usr = await createUser(
      req.body.userName,
      req.body.email,
      req.body.password
    );
    console.log(usr);
    const user = await findB;
    return res
      .status(200)
      .json({ success: true, message: "user registration completed" });
  } catch (e) {
    console.log("salim");
    next(e);
  }
};

export const suspend = async (req, res, next) => {
  try {
    const user = await findUserById(req.params.id);
    console.log(user);
    if (!user) {
      throw new ErrorResponse("User not found", 404);
    }
    user.suspended = true;
    await user.save();
    return res
      .status(200)
      .json({ success: true, message: "user suspension completed" });
  } catch (err) {
    next(err);
  }
};

export const allow = async (req, res, next) => {
  try {
    const user = await findUserById(req.params.id);
    console.log(user);
    if (!user) {
      throw new ErrorResponse("User not found", 404);
    }
    user.suspended = false;
    await user.save();
    return res
      .status(200)
      .json({ success: true, message: "user suspension completed" });
  } catch (err) {
    next(err);
  }
};

export const follow = async (req, res, next) => {
  try {
    const user = await findUserById(req.params.id);
    if (!user) {
      throw new ErrorResponse("user not found", 404);
    }

    if (verifySameAccount(req.body.idToFollow, req.params.id) === true)
      throw new ErrorResponse("Impossible to auto follow your account", 409);

    const utilisateur = await findUserById(req.body.idToFollow);
    if (!utilisateur) {
      throw new ErrorResponse("user to follow not found", 404);
    }

    console.log(user);
    console.log(utilisateur);

    if (utilisateur === user) {
      throw new ErrorResponse("Impossible to auto follow your account", 409);
    }

    await followUser(req.params.id, req.body.idToFollow);
    return res.status(200).json({
      success: true,
      message: "following operation completed with success",
    });
  } catch (err) {
    next(err);
  }
};

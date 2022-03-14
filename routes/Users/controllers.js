import {
  findUserById,
  findUserByEmail,
  uniqueUserName,
  createUser,
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

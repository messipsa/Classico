import path from "path";
import lodash from "lodash";
import {
  findUserById,
  findUserByEmail,
  uniqueUserName,
  createUser,
  followUser,
  unfollowUser,
  verifySameAccount,
  sendURL,
  verifyPassword,
  createToken,
} from "./service.js";
import { User } from "../../models/user.js";
import ErrorResponse from "../../Utils/errorResponse.js";

export const login = async (req, res, next) => {
  try {
    const user = await findUserByEmail(req.body.email);
    if (!user) {
      throw new ErrorResponse("User not found", 404);
    }
    const match = verifyPassword(req.body.password, user.password);
    if (!match) {
      throw new ErrorResponse("Wrong password", 400);
    }
    const token = createToken(user);
    const options = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    return res
      .status(200)
      .cookie("token", token, options)
      .json({
        success: true,
        message: "Connexion established with success",
        token,
        options,
        user: lodash.omit(user, ["_id", "password"]),
      });
  } catch (err) {
    next(err);
  }
};

export const register = async (req, res, next) => {
  try {
    const result = await findUserByEmail(req.body.email);
    if (result) {
      throw new ErrorResponse("an account already exists with this email", 409);
    }
    const name = await uniqueUserName(req.body.userName);
    if (name) {
      throw new ErrorResponse(
        "an account already exists with this userName",
        409
      );
    }

    const usr = await createUser(
      req.body.userName,
      req.body.email,
      req.body.password
    );
    console.log(usr);
    //const user = await findB;
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

export const unfollow = async (req, res, next) => {
  try {
    const user = await findUserById(req.params.id);
    if (!user) {
      throw new ErrorResponse("user not found", 404);
    }

    if (verifySameAccount(req.body.idToFollow, req.params.id) === true)
      throw new ErrorResponse("Impossible to auto unfollow your account", 409);

    const utilisateur = await findUserById(req.body.idToFollow);
    if (!utilisateur) {
      throw new ErrorResponse("user to unfollow not found", 404);
    }

    if (utilisateur === user) {
      throw new ErrorResponse("Impossible to auto unfollow your account", 409);
    }

    await unfollowUser(req.params.id, req.body.idToFollow);
    return res.status(200).json({
      success: true,
      message: "unfollowing operation completed with success",
    });
  } catch (err) {
    next(err);
  }
};

export const sendConfirmationEmail = async (req, res, next) => {
  try {
    const user = await findUserById(req.params.id);
    if (!user) {
      throw new ErrorResponse("user not found", 404);
    }
    sendURL(user);
    res.status(200).json({
      success: true,
      message: "Confirmation email sent successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const verifyAccount = async (req, res, next) => {
  try {
    console.log(process.cwd());
    res.sendFile(path.join(process.cwd(), "/email.html"));
    //res.sendFile("../../static/verifyAccount.html");
    let user = await findUserById(req.query.id);
    console.log(req.query.id);
    if (!user) {
      throw new ErrorResponse("user not found", 404);
    }
    if (user.verified) {
      throw new ErrorResponse("email already verified", 400);
    }
    if (user.confirmationCode === req.query.code) {
      user = await User.findByIdAndUpdate(req.query.id, {
        verified: true,
      });
      res
        .status("200")
        .json({
          success: true,
          message: "Account verification completed successfullly",
        })
        .send("../../static/verifyAccount.html");
    } else {
      throw new ErrorResponse("Wrong confirmation code", 400);
    }
  } catch (err) {
    next(err);
  }
};

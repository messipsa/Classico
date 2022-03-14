import { findUserByEmail, uniqueUserName } from "./service.js";
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

    return res
      .status(200)
      .json({ success: true, message: "user registration completed" });
  } catch (e) {
    console.log("salim");
    next(e);
  }
};

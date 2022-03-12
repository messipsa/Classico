import { findUserByEmail } from "./service.js";
import { User } from "../../models/user.js";

/*export const register = async (err, req, res, next) => {
  try {
    return res.status(200).json({ message: "zz" });
    const result = await findUserByEmail(req.body.email);
    return res.status(200).json({ message: "zz" });
  } catch (err) {
    next(err);
  }
};*/

export const register = async (req, res, next) => {
  try {
    const result = await findUserByEmail(req.body.email);

    return res
      .status(200)
      .json({ success: true, message: "user registration completed" });
  } catch (e) {
    next(e);
  }
};

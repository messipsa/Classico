import { findUserByEmail } from "./service.js";
import { User } from "../../models/user.js";

export const register = async (req, res) => {
  try {
    console.log(req.body);
    const result = await findUserByEmail(req.body);
    return res.status(200).json({ message: "z" });
  } catch (err) {
    console.log(err);

    return res.status(500).json({ message: err.message });
  }
};

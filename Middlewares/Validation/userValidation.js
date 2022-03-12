import { emailValidation } from "../../routes/Users/schema.js";
import ErrorResponse from "../../Utils/errorResponse.js";

export const validateEmail = async (req, res, next) => {
  try {
    let user = await emailValidation.validateAsync(req.body);
    next();
  } catch (err) {
    next(new ErrorResponse("Invalid Email Adress ", 422));
    /*return res
      .status(422)
      .json({ success: false, message: "invalid email adress" });*/
  }
};

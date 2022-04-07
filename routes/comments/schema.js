import { Joi } from "express-validation";

import JoiObjectId from "joi-objectid";
const validateObjectId = JoiObjectId(Joi);

export const idValidation = Joi.object({
  id: validateObjectId().required(),
});

export const commentValidation = Joi.object({
  userId: validateObjectId().required(),
  text: Joi.string().min(1).required(),
});

export const commentIdValidation = Joi.object({
  commentId: validateObjectId().required(),
});

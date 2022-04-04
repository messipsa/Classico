import { Joi } from "express-validation";

import JoiObjectId from "joi-objectid";
const validateObjectId = JoiObjectId(Joi);

export const postValidation = Joi.object({
  userId: validateObjectId().required(),
  category: validateObjectId().required(),
  userName: Joi.string().min(4).max(255).required(),
  body: Joi.string().min(1).required(),
  snippet: Joi.string().min(1).required(),
  title: Joi.string().min(1).required(),
});

export const idValidation = Joi.object({
  id: validateObjectId().required(),
});

export const userIdValidation = Joi.object({
  userId: validateObjectId().required(),
});

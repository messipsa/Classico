import { Joi } from "express-validation";

import JoiObjectId from "joi-objectid";
import { roleType } from "../../models/user.js";

const validateObjectId = JoiObjectId(Joi);

export const idValidation = Joi.object({
  id: validateObjectId(),
});

export const idValidationRequired = Joi.object({
  idToFollow: validateObjectId().required(),
});

export const userSchemaValidation = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  userName: Joi.string().min(4).max(255).required(),
  password: Joi.string().min(6).max(255).required(),
});

export const emailValidation = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
});

export const userNameValidation = Joi.object({
  userName: Joi.string().min(4).max(255).required(),
});

export const codeValidation = Joi.object({
  id: validateObjectId(),
  code: Joi.string().hex().min(8).max(8).required(),
});

export const loginSchemaValidation = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().min(6).max(255).required(),
});

import { Joi } from "express-validation";

import JoiObjectId from "joi-objectid";

const validateObjectId = JoiObjectId(Joi);

export const idValidation = Joi.object({
  id: validateObjectId().required(),
});

export const nameValidation = Joi.object({
  name: Joi.string().required(),
});

import { Joi } from "express-validation";

import JoiObjectId from "joi-objectid";
import { roleType } from "../../models/user.js";

const validateObjectId = JoiObjectId(Joi);

export default {
  userSchemaValidation: Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }),
  }),
};

export const emailValidation = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
});

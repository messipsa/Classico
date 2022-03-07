import { Joi } from "express-validation";

import JoiObjectId from "joi-objectid";
import { roleType } from "../../models/user.js";

const validateObjectId = JoiObjectId(Joi);

export default {
  userSchemaValidation: Joi.object({
    // _id: validateObjectId(),
    email: Joi.string().email({ minDomainSegments: 2 }),
    //role: Joi.string().lowercase().valid(roleType.ADMIN, roleType.UTILISATEUR),
  }),
};

export const emailValidation = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
});

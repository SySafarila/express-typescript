import { Request } from "express";
import Joi, { ObjectSchema, ValidationError, ValidationResult } from "joi";

const loginValidator = (args: Request): ValidationError => {
  const loginValidation: ObjectSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  const validation: ValidationResult = loginValidation.validate(args.body);
  const isError: ValidationError = validation.error;
  return isError;
};

export default loginValidator;

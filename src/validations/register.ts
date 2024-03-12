import Joi, { ObjectSchema, ValidationError, ValidationResult } from "joi";

const registerValidator = (args: Request): ValidationError => {
  const loginValidation: ObjectSchema = Joi.object({
    email: Joi.string().max(255).email().required(),
    password: Joi.string().max(255).required(),
    name: Joi.string().max(255).required(),
  });
  const validation: ValidationResult = loginValidation.validate(args.body);
  const isError: ValidationError = validation.error;
  return isError;
};

export default registerValidator;

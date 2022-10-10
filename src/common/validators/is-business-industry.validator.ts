/* eslint-disable security/detect-object-injection */
import { registerDecorator, ValidationOptions } from "class-validator";
import { JOBCODE } from "../constants";

export const IsBusinessIndustry =
  (validationOptions?: ValidationOptions) =>
  (object: Record<string, any>, propertyName: string) => {
    registerDecorator({
      name: "isBusinessIndustry",
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate: (value: string) => JOBCODE.has(value),
        defaultMessage: () =>
          `${propertyName} must be a valid business industry code`
      }
    });
  };

/* eslint-disable security/detect-object-injection */
import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments
} from "class-validator";
import { UTC } from "../constants";

export const IsTimeZone =
  (validationOptions?: ValidationOptions) =>
  (object: Record<string, any>, propertyName: string) => {
    registerDecorator({
      name: "isTimeZone",
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate: (value: string) => UTC.has(value),
        defaultMessage: () => `${propertyName} must be a valid timezone`
      }
    });
  };

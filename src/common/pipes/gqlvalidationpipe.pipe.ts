/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/ban-types */
import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform
} from "@nestjs/common";
import { ApolloError, UserInputError } from "apollo-server-express";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { GraphQLError, GraphQLFormattedError } from "graphql";
import { MultiError } from "verror";

class MyError extends ApolloError {
  constructor(message: string, extensions?: Record<string, any>) {
    super(message, "BAD_USER_INPUT", extensions);

    Object.defineProperty(this, "name", { value: "UserInputError" });
  }
}

@Injectable()
export class GqlValidationPipe<T> implements PipeTransform<T> {
  async transform(value: T, { metatype, data, type }: ArgumentMetadata) {
    console.warn({ value, metatype, data, type });

    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToInstance(metatype, value);
    const errors = await validate(object);
    console.log(errors);

    if (errors.length) {
      const graphqlError = errors.map(({ property, constraints }) => ({
        property,
        constraints: Object.values(constraints as Record<string, any>)
      }));
      throw new GraphQLError("", {
        extensions: {
          code: "CUSTOM_BAD_USER_INPUT",
          validationErrors: graphqlError
        }
      });
    }
    return value;
  }

  private toValidate(metatype: Function) {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}

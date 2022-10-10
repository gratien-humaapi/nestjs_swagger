/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/ban-types */
import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { GraphQLError } from "graphql";
import { GQLErrorCode } from "../enums";

@Injectable()
export class GqlValidationPipe<T> implements PipeTransform<T> {
  async transform(value: T, { metatype, data, type }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToInstance(metatype, value);
    const errors = await validate(object);

    if (errors.length) {
      const graphqlError = errors.map(({ property, constraints }) => ({
        property,
        constraints: Object.values(constraints as Record<string, any>)
      }));
      throw new GraphQLError("Bad user input", {
        extensions: {
          code: GQLErrorCode.CUSTOM_BAD_USER_INPUT,
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

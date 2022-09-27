/* eslint-disable @typescript-eslint/no-inferrable-types */
import { InputType, ObjectType, OmitType, PickType } from "@nestjs/graphql";
import {
  IsString,
  IsInt,
  IsJSON,
  IsArray,
  IsEmail,
  IsBoolean
} from "class-validator";
import { AuthUser } from "../entities";

@InputType()
export class AdminCreateUserInput extends PickType(
  AuthUser,
  ["attributes", "username"] as const,
  InputType
) {
  @IsString()
  temporaryPassword: string | undefined;

  @IsBoolean()
  sendPassword: boolean = false;

  desiredDeliveryMediums: string[] | undefined;
}

// export class CreateCatDto {
//   name: string;
//   age: number;
//   breed: string;
// }

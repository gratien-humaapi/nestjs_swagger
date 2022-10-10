/* eslint-disable @typescript-eslint/no-inferrable-types */
import { InputType, ObjectType, OmitType, PickType } from "@nestjs/graphql";
import {
  IsString,
  IsInt,
  IsJSON,
  IsArray,
  IsEmail,
  IsBoolean,
  ValidateIf
} from "class-validator";
import { IAdminService } from "src/cognito";
import { AuthUser } from "../entities";

@InputType()
export class AdminSetUserPasswordInput extends PickType(
  AuthUser,
  ["username"] as const,
  InputType
) {
  @IsString()
  password: string;

  permanent: boolean = false;
}

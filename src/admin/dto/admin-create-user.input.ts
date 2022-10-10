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
export class AdminCreateUserInput extends PickType(
  AuthUser,
  ["attributes", "username"] as const,
  InputType
) {
  @IsString()
  temporaryPassword: string;

  /** whether the temporary password should be permanent or not */
  permanent: boolean = false;

  @IsBoolean()
  sendPassword: boolean = false;

  desiredDeliveryMediums?: string[];
}

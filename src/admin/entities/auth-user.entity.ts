/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-inferrable-types */

import { Field, HideField, ObjectType } from "@nestjs/graphql";
import { IsArray, IsEmail } from "class-validator";
import { CognitoUserStatusEnum } from "src/cognito";
import { AuthAttribute } from "src/user";

@ObjectType()
export class AuthUser {
  @IsEmail()
  username: string;

  @IsArray()
  attributes: AuthAttribute[];

  userStatus: CognitoUserStatusEnum;

  enabled: boolean;

  userCreateDate: string;

  userLastModifiedDate: string;
}

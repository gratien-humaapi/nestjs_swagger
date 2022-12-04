/* eslint-disable @typescript-eslint/no-inferrable-types */
import {
  InputType,
  IntersectionType,
  OmitType,
  PickType
} from "@nestjs/graphql";
import { IsBoolean, IsString } from "class-validator";
import { CreateUserInput } from "src/user/dto/create-user.input";
import { AuthUser } from "../entities";

const userInput = OmitType(CreateUserInput, ["authData"]);
const authInput = PickType(
  AuthUser,
  ["attributes", "username"] as const,
  InputType
);

@InputType()
export class AdminCreateUserInput extends IntersectionType(
  userInput,
  authInput
) {
  @IsString()
  temporaryPassword: string;

  /** whether the temporary password should be permanent or not */
  permanent: boolean = false;

  @IsBoolean()
  sendPassword: boolean = false;

  desiredDeliveryMediums?: string[];
}

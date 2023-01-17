/* eslint-disable @typescript-eslint/no-inferrable-types */
import {
  InputType,
  IntersectionType,
  OmitType,
  PickType
} from "@nestjs/graphql";
import { IsBoolean, IsString } from "class-validator";
import { AuthUser } from "src/admin/entities";
import { User } from "../entities/user.entity";

const userInput = OmitType(
  OmitType(
    User,
    ["createdAt", "updatedAt", "id", "isActive"] as const,
    InputType
  ),
  ["authData"]
);

const authInput = PickType(
  AuthUser,
  ["attributes", "username"] as const,
  InputType
);

@InputType()
export class CreateUserInput extends IntersectionType(userInput, authInput) {
  @IsString()
  temporaryPassword: string;

  /** whether the temporary password should be permanent or not */
  // @IsBoolean()
  permanent: boolean = false;

  companyId: string;

  ownerId: string;

  tenantId: string;

  @IsBoolean()
  sendPassword: boolean = false;

  desiredDeliveryMediums?: string[];
}

import { InputType, OmitType } from "@nestjs/graphql";
import { User } from "../entities/user.entity";

@InputType()
export class UpdateUserInput extends OmitType(
  User,
  ["createdAt", "updatedAt", "isActive"] as const,
  InputType
) {}

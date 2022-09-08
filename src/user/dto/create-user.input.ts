import { InputType, OmitType } from "@nestjs/graphql";
import { User } from "../entities/user.entity";

@InputType()
export class CreateUserInput extends OmitType(
  User,
  ["createdAt", "updatedAt", "id", "isActive"] as const,
  InputType
) {}

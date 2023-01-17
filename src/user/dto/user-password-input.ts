/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Field, InputType, PickType } from "@nestjs/graphql";
import { IsString } from "class-validator";
import { AuthUser } from "src/admin/entities";

@InputType()
export class SetUserPasswordInput extends PickType(
  AuthUser,
  ["username"] as const,
  InputType
) {
  @IsString()
  @Field()
  password: string;

  @Field()
  permanent: boolean = false;
}

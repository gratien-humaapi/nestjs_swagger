import { Embeddable, Property } from "@mikro-orm/core";
import { InputType, ObjectType } from "@nestjs/graphql";
import { AttributeCognitoNormalizedType } from "src/cognito";
import { UserStatusEnum } from "../enums";

@ObjectType()
@InputType("AuthAttributeInput")
@Embeddable()
export class AuthAttribute implements AttributeCognitoNormalizedType {
  @Property()
  name: string;

  @Property()
  value!: string;

  @Property()
  isVerified?: boolean;
}

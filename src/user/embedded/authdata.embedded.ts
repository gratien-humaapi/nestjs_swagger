import { Embeddable, Embedded, Property } from "@mikro-orm/core";
import { ObjectType, InputType, Field } from "@nestjs/graphql";
import {
  AttributeCognitoNormalizedType,
  CognitoUserStatusEnum
} from "src/cognito";
import { UserStatusEnum } from "../enums";
import { AuthAttribute } from "./attributes.embedded";

@ObjectType()
@InputType("AuthDataInput")
@Embeddable()
export class AuthData {
  @Property()
  username: string;

  @Embedded(() => AuthAttribute, { object: true })
  //   @Field(() => [AuthAttribute])
  attributes: AuthAttribute[];

  @Property()
  userGroup: string[];

  @Property()
  enabled: boolean;

  @Property()
  userStatus: CognitoUserStatusEnum;
}

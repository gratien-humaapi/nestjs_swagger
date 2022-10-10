import { registerEnumType } from "@nestjs/graphql";

export enum CognitoUserStatusEnum {
  UNCONFIRMED = "UNCONFIRMED",
  CONFIRMED = "CONFIRMED",
  ARCHIVED = "ARCHIVED",
  COMPROMISED = "COMPROMISED",
  UNKNOWN = "UNKNOWN",
  RESET_REQUIRED = "RESET_REQUIRED",
  FORCE_CHANGE_PASSWORD = "FORCE_CHANGE_PASSWORD"
}

registerEnumType(CognitoUserStatusEnum, {
  name: "CognitoUserStatusEnum"
});

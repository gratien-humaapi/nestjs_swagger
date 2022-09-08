import { registerEnumType } from "@nestjs/graphql";

export enum CommonStatusEnum {
  ACTIVE = "ACTIVE",
  PENDING = "PENDING",
  ARCHIVED = "ARCHIVED",
  BANNED = "BANNED"
}

registerEnumType(CommonStatusEnum, {
  name: "CommonStatusEnum"
});

// required for graphql

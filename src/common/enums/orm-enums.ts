import { registerEnumType } from "@nestjs/graphql";

export enum CommonStatusEnum {
  ACTIVE = "active",
  PENDING = "banned",
  ARCHIVED = "archived",
  BANNED = "banned"
}

// required for graphql
registerEnumType(CommonStatusEnum, {
  name: "CommonStatusEnum"
});

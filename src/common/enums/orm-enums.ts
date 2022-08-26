import { registerEnumType } from "@nestjs/graphql";

export enum CommonStatusEnum {
  active = "active",
  pending = "pending",
  archived = "archived",
  banned = "banned"
}

// required for graphql
registerEnumType(CommonStatusEnum, {
  name: "CommonStatusEnum"
});

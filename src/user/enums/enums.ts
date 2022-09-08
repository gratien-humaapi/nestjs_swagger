import { registerEnumType } from "@nestjs/graphql";

export enum UserStatusEnum {
  ACTIVE = "ACTIVE",
  PENDING = "PENDING",
  ARCHIVED = "ARCHIVED",
  BANNED = "BANNED",
  COMPROMISED = "COMPROMISED"
}

registerEnumType(UserStatusEnum, {
  name: "UserStatusEnum"
});

export enum OnlineStatusEnum {
  ONLINE = "ONLINE",
  BUSY = "BUSY",
  ABSENT = "ABSENT",
  DO_NOT_DISTURB = "DO_NOT_DISTURB",
  OFFLINE = "OFFLINE"
}

registerEnumType(OnlineStatusEnum, { name: "OnlineStatusEnum" });

export enum UserTypeEnum {
  ADMIN = "ADMIN",
  ARRIS = "ARRIS",
  CONTRACTOR = "CONTRACTOR",
  CUSTOMER = "CUSTOMER"
}

registerEnumType(UserTypeEnum, {
  name: "UserTypeEnum"
});

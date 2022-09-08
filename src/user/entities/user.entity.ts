/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Entity, Property, Enum, ManyToOne } from "@mikro-orm/core";
import { ObjectType } from "@nestjs/graphql";
import { MaxLength, ValidateIf } from "class-validator";
import { BaseEntityWithTenantUser, UTC } from "../../common";
import { OnlineStatusEnum, UserStatusEnum, UserTypeEnum } from "../enums";
import { UserRepository } from "../user.repository";

type CustomOptionalProps = "isActive" | "description";

@ObjectType()
@Entity({ customRepository: () => UserRepository })
export class User extends BaseEntityWithTenantUser<
  UserRepository,
  CustomOptionalProps
> {
  @Property({
    onCreate: (e: User) => e.status === "ACTIVE",
    onUpdate: (e: User) => e.status === "ACTIVE"
  })
  isActive: boolean;

  @Enum()
  type: UserTypeEnum;

  @Enum()
  status: UserStatusEnum;

  @Enum()
  onlineStatus: OnlineStatusEnum = OnlineStatusEnum.OFFLINE;

  @ValidateIf((e: User) => UTC.has(e.timeZone))
  timeZone: string;

  @Property()
  photoURL: string;

  @Property()
  @MaxLength(50)
  firstName: string;

  @Property()
  @MaxLength(50)
  lastName: string;

  @Property({ persist: false })
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  @Property()
  @MaxLength(256)
  description: string = "";
}

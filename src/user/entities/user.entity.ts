/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Embedded, Entity, Enum, Property } from "@mikro-orm/core";
import { HideField, ObjectType } from "@nestjs/graphql";
import { MaxLength, ValidateIf } from "class-validator";
import { BaseEntityWithTU, UTC } from "../../common";
import { AuthData } from "../embedded";
import { OnlineStatusEnum, UserStatusEnum, UserTypeEnum } from "../enums";
import { UserRepository } from "../user.repository";

type CustomOptionalProps = "isActive" | "description";

@ObjectType()
@Entity({ customRepository: () => UserRepository })
export class User extends BaseEntityWithTU<
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

  @Property()
  @HideField()
  email: string;

  @Enum()
  onlineStatus: OnlineStatusEnum = OnlineStatusEnum.OFFLINE;

  @Property()
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

  // @Embedded(() => AuthAttribute, { object: true })
  // authAttribute: AuthAttribute;

  @Embedded(() => AuthData, { object: true })
  authData: AuthData;
}

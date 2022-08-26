/* eslint-disable @typescript-eslint/no-inferrable-types */
import {
  Entity,
  EntityRepositoryType,
  OptionalProps,
  Property,
  Enum
} from "@mikro-orm/core";
import { ObjectType, Field, ID } from "@nestjs/graphql";
import { IsUppercase, Length, MaxLength } from "class-validator";
import { CustomBaseEntity, CommonStatusEnum } from "../../common";
// eslint-disable-next-line import/no-cycle
import { TenantRepository } from "../tenant.repository";

type CustomOptionalProps = "isActive" | "description";

@ObjectType()
@Entity({ customRepository: () => TenantRepository })
export class Tenant extends CustomBaseEntity<CustomOptionalProps> {
  [EntityRepositoryType]?: TenantRepository;

  @Property({
    onCreate: (e: Tenant) => e.status === "active",
    onUpdate: (e: Tenant) => e.status === "active"
  })
  readonly isActive: boolean;

  @Enum()
  status: CommonStatusEnum;

  @Property()
  @MaxLength(30)
  name: string;

  @Property()
  @MaxLength(256)
  description: string = "";
}

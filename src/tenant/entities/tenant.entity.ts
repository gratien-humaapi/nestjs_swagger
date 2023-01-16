/* eslint-disable @typescript-eslint/no-inferrable-types */
import {
  Entity,
  EntityRepositoryType,
  OptionalProps,
  Property,
  Enum
} from "@mikro-orm/core";
import { ObjectType, Field, ID, InputType } from "@nestjs/graphql";
import { IsUppercase, Length, MaxLength } from "class-validator";
import { CustomBaseEntity, CommonStatusEnum } from "../../common";
// eslint-disable-next-line import/no-cycle
import { TenantRepository } from "../tenant.repository";

type CustomOptionalProps = "isActive" | "description";

/**
 * @InputType is needed for nested object
 * @see https://stackoverflow.com/questions/64736891/error-cannot-determine-a-graphql-input-type-while-using-nestjs-graphql-typ
 */
// @InputType("TenantInput")
@ObjectType()
@Entity({ customRepository: () => TenantRepository })
export class Tenant extends CustomBaseEntity<
  TenantRepository,
  CustomOptionalProps
> {
  @Property({
    onCreate: (e: Tenant) => e.status === "ACTIVE",
    onUpdate: (e: Tenant) => e.status === "ACTIVE"
  })
  isActive: boolean;

  @Enum()
  status: CommonStatusEnum;

  @Property()
  @MaxLength(30)
  name: string;

  @Property()
  @MaxLength(256)
  description: string = "";

  @Property()
  parentId?: string;
}

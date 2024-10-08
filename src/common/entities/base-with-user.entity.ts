/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Property, Filter, Entity } from "@mikro-orm/core";
import { IsUUID } from "class-validator";
import { CustomBaseEntity } from "./base.entity";

// https://taxsummaries.pwc.com/glossary/currency-codes

type OptionalProps = "modifiedBy" | "tenantId" | "ownerId";
@Filter({
  name: "currentUser",
  cond: ({ tenant, owner }) => ({
    ownerId: { $eq: owner }
    // tenant: { $eq: tenant },
  }),
  default: true
})
@Entity({ abstract: true })
export abstract class BaseEntityWithTU<
  Repository = "",
  T extends string = ""
> extends CustomBaseEntity<Repository, T | OptionalProps> {
  @Property({
    type: "uuid",
    onCreate: (entity: BaseEntityWithTU) => entity.ownerId
  })
  @IsUUID()
  modifiedBy: string;

  @Property({ type: "uuid" })
  // @HideField()
  @IsUUID()
  ownerId: string;

  @Property({ type: "uuid" })
  @IsUUID()
  tenantId: string;
}

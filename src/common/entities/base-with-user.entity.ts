/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Property, Filter } from "@mikro-orm/core";
import { HideField } from "@nestjs/graphql";
import { IsUUID } from "class-validator";
import { CustomBaseEntity } from "./base.entity";

// https://taxsummaries.pwc.com/glossary/currency-codes

// @ObjectType({ isAbstract: true })
// @Entity({ abstract: true })

type OptionalProps = "modifiedBy" | "tenantId" | "ownerId";
@Filter({
  name: "currentUser",
  cond: ({ company, owner }) => ({
    company: { $eq: company },
    owner: { $eq: owner }
  }),
  default: true
})
export abstract class BaseEntityWithTU<
  Repository = "",
  T extends string = ""
> extends CustomBaseEntity<Repository, T | OptionalProps> {
  @Property({ onCreate: (entity: BaseEntityWithTU) => entity.ownerId })
  @IsUUID()
  modifiedBy: string;

  @Property()
  @HideField()
  @IsUUID()
  ownerId: string;

  @Property()
  @HideField()
  @IsUUID()
  tenantId: string;
}

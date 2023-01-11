/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Entity, Property, Filter } from "@mikro-orm/core";
import { ObjectType, HideField } from "@nestjs/graphql";
import { IsUUID } from "class-validator";
import { CustomBaseEntity } from "./base.entity";

// https://taxsummaries.pwc.com/glossary/currency-codes

type OptionalProps = "modifiedBy" | "tenantId" | "ownerId" | "companyId";
@ObjectType({ isAbstract: true })
@Entity({ abstract: true })
// @Filter({
//   name: "currentUser",
//   cond: ({ company, owner }) => ({
//     company: { $eq: company },
//     owner: { $eq: owner }
//   }),
//   default: true
// })

// Throw this error
// {
//   message: "No arguments provided for filter 'currentUser'",
//   extensions: undefined
// }
export abstract class BaseEntityWithTUC<
  Repository = "",
  T extends string = ""
> extends CustomBaseEntity<Repository, T | OptionalProps> {
  @Property({ onCreate: (entity: BaseEntityWithTUC) => entity.ownerId })
  @IsUUID()
  modifiedBy: string;

  @Property()
  @HideField()
  @IsUUID()
  ownerId: string;

  @Property()
  @HideField()
  @IsUUID()
  companyId: string;

  @Property()
  @HideField()
  @IsUUID()
  tenantId: string;
}

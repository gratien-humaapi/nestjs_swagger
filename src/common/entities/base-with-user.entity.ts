/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import {
  Entity,
  OptionalProps,
  PrimaryKey,
  Property,
  Filter,
  ManyToOne,
  EntityRepositoryType
} from "@mikro-orm/core";
import { ObjectType, Field, HideField } from "@nestjs/graphql";
import { IsUUID } from "class-validator";
import { GraphQLUUID } from "graphql-scalars";
import { v4 } from "uuid";
import { IBaseEntity } from "./base.entity";

// https://taxsummaries.pwc.com/glossary/currency-codes

@ObjectType({ isAbstract: true })
@Entity({ abstract: true })
@Filter({
  name: "currentUser",
  cond: ({ company, owner }) => ({
    company: { $eq: company },
    owner: { $eq: owner }
  }),
  default: true
})
export abstract class BaseEntityWithTenantUser<
  Repository = "",
  T extends string = ""
> implements IBaseEntity
{
  [EntityRepositoryType]?: Repository;
  [OptionalProps]?: T | "createdAt" | "updatedAt" | "modifiedBy";
  @Field(() => GraphQLUUID)
  @PrimaryKey({ type: "uuid", onCreate: () => v4() })
  id: string;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Property({ onCreate: (entity: BaseEntityWithTenantUser) => entity.owner })
  @IsUUID()
  modifiedBy: string;

  @Property()
  @HideField()
  @IsUUID()
  owner: string;

  @Property()
  @HideField()
  @IsUUID()
  company: string;
}

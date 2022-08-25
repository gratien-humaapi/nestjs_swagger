/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import {
  Entity,
  EntityRepositoryType,
  OptionalProps,
  PrimaryKey,
  Property,
  ManyToOne,
  Constructor,
  Filter
} from "@mikro-orm/core";
import { Type } from "@nestjs/common";
import { ObjectType, Field, ID, Int } from "@nestjs/graphql";
import { IsUppercase, Length, MaxLength } from "class-validator";
import { v4 } from "uuid";
// eslint-disable-next-line import/no-cycle

// https://taxsummaries.pwc.com/glossary/currency-codes

export interface IBaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

@ObjectType({ isAbstract: true })
@Entity({ abstract: true })
@Filter({
  name: "currentUser",
  cond: ({ tenant, owner }) => ({
    tenant: { $eq: tenant },
    owner: { $eq: owner }
  }),
  default: true
})
export abstract class CustomBaseEntity<T extends string = "">
  implements IBaseEntity
{
  [OptionalProps]?: T | "createdAt" | "updatedAt" | "modifiedBy";
  @Field(() => ID)
  @PrimaryKey({ type: "uuid" })
  id: string = v4();

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}

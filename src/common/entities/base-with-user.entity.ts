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
import { IBaseEntity } from "./base.entity";
// eslint-disable-next-line import/no-cycle

// https://taxsummaries.pwc.com/glossary/currency-codes

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
export abstract class BaseEntityWithUser implements IBaseEntity {
  [OptionalProps]?: "createdAt" | "updatedAt" | "modifiedBy";
  @Field(() => ID)
  @PrimaryKey({ onCreate: () => v4() })
  id: string;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  // @Property({ onCreate: (entity: BaseEntityWithUser) => entity.owner })
  // modifiedBy: string;

  // @ManyToOne(() => User, { mapToPk: true })
  // owner: string;

  // @ManyToOne(() => User, { mapToPk: true })
  // tenant: string;
}

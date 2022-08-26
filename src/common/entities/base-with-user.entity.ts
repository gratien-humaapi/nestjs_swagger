/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import {
  Entity,
  OptionalProps,
  PrimaryKey,
  Property,
  Filter
} from "@mikro-orm/core";
import { ObjectType, Field } from "@nestjs/graphql";
import { GraphQLUUID } from "graphql-scalars";
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
  @Field(() => GraphQLUUID)
  @PrimaryKey({ type: "uuid", onCreate: () => v4() })
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

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import {
  Entity,
  EntityRepositoryType,
  OptionalProps,
  PrimaryKey,
  Property
} from "@mikro-orm/core";
import { ObjectType, Field } from "@nestjs/graphql";
import { GraphQLUUID } from "graphql-scalars";
import { v4 } from "uuid";

// https://taxsummaries.pwc.com/glossary/currency-codes

export interface IBaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

@ObjectType({ isAbstract: true })
@Entity({ abstract: true })
export abstract class CustomBaseEntity<Repository, T extends string = "">
  implements IBaseEntity
{
  [EntityRepositoryType]?: Repository;
  [OptionalProps]?: T | "createdAt" | "updatedAt";
  @Field(() => GraphQLUUID)
  @PrimaryKey({ type: "uuid", onCreate: () => v4() })
  id: string;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}

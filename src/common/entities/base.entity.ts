/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Entity, OptionalProps, PrimaryKey, Property } from "@mikro-orm/core";
import { ObjectType, Field } from "@nestjs/graphql";
import { GraphQLUUID } from "graphql-scalars";
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
export abstract class CustomBaseEntity<T extends string = "">
  implements IBaseEntity
{
  [OptionalProps]?: T | "createdAt" | "updatedAt" | "modifiedBy";
  @Field(() => GraphQLUUID)
  @PrimaryKey({ type: "uuid", onCreate: () => v4() })
  id: string;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}

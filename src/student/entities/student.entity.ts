import {
  Entity,
  EntityRepositoryType,
  OptionalProps,
  PrimaryKey,
  Property
} from "@mikro-orm/core";
import { ObjectType, Field, Int, ID } from "@nestjs/graphql";
import { v4 } from "uuid";
// eslint-disable-next-line import/no-cycle
import { StudentRepository } from "../student.repository";

@ObjectType()
@Entity({ customRepository: () => StudentRepository })
export class Student {
  [EntityRepositoryType]?: StudentRepository;
  [OptionalProps]?: "createdAt" | "updatedAt";

  @Field(() => ID)
  @PrimaryKey()
  id: string = v4();

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Property()
  name: string;

  @Property()
  email: string;

  @Property()
  age?: number;
}

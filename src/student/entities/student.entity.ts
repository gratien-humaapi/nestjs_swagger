import {
  Entity,
  EntityRepositoryType,
  OptionalProps,
  PrimaryKey,
  Property,
  EntityValidator
} from "@mikro-orm/core";
import { ObjectType, Field, Int, ID } from "@nestjs/graphql";
import { IsEmail, MinLength } from "class-validator";
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
  @MinLength(3)
  name: string;

  @Property()
  @IsEmail()
  email: string;

  @Property()
  age?: number;
}

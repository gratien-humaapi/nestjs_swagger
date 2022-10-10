import { Entity, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "@nestjs/graphql";
import { IsEmail, MinLength } from "class-validator";
import { CustomBaseEntity } from "../../common";
// eslint-disable-next-line import/no-cycle
import { StudentRepository } from "../student.repository";

type CustomOptionalProps = "isActive" | "description";

@ObjectType()
@Entity({ customRepository: () => StudentRepository })
export class Student extends CustomBaseEntity<
  StudentRepository,
  CustomOptionalProps
> {
  @Property()
  @MinLength(3)
  @Field()
  name: string;

  @Property()
  @IsEmail()
  @Field()
  email: string;

  @Property()
  @Field()
  age?: number;
}

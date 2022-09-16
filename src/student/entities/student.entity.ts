import { Entity, Property } from "@mikro-orm/core";
import { ObjectType } from "@nestjs/graphql";
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
  name: string;

  @Property()
  @IsEmail()
  email: string;

  @Property()
  age?: number;
}

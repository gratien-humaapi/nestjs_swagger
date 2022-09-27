import { Entity, Property } from "@mikro-orm/core";
import { Field, ObjectType, PartialType } from "@nestjs/graphql";
import { IsEmail, MinLength } from "class-validator";
import { CustomBaseEntity } from "../../common";
// eslint-disable-next-line import/no-cycle
import { StudentRepository } from "../student.repository";
import { Student } from "./student.entity";

type CustomOptionalProps = "isActive" | "description";

@ObjectType()
export class PartialStudent extends PartialType(Student, ObjectType) {}

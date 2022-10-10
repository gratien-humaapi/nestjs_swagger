import { InputType, Field, Int, PartialType, ArgsType } from "@nestjs/graphql";
import { IsEmail, MinLength } from "class-validator";
import { CreateStudentInput } from "./create-student.input";

@ArgsType()
export class StudentArgs {
  id: number;

  @MinLength(3)
  @IsEmail()
  other: string;
}

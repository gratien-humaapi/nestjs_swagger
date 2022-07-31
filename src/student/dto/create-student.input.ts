import { InputType, Int, Field, OmitType } from "@nestjs/graphql";
import { Student } from "../entities/student.entity";

@InputType()
export class CreateStudentInput extends OmitType(
  Student,
  ["createdAt", "updatedAt", "id"] as const,
  InputType
) {}

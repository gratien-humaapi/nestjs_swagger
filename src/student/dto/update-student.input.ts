import { InputType, OmitType } from "@nestjs/graphql";
import { Student } from "../entities/student.entity";

@InputType()
export class UpdateStudentInput extends OmitType(
  Student,
  ["createdAt", "updatedAt"] as const,
  InputType
) {}

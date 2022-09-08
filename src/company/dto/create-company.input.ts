import { InputType, OmitType } from "@nestjs/graphql";
import { Company } from "../entities/company.entity";

@InputType()
export class CreateCompanyInput extends OmitType(
  Company,
  ["createdAt", "updatedAt", "id", "isActive"] as const,
  InputType
) {}

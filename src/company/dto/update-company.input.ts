import { InputType, OmitType } from "@nestjs/graphql";
import { Company } from "../entities/company.entity";

@InputType()
export class UpdateCompanyInput extends OmitType(
  Company,
  ["createdAt", "updatedAt", "isActive"] as const,
  InputType
) {}

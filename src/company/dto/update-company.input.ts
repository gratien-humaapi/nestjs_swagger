import { InputType, OmitType } from "@nestjs/graphql";
import { Company } from "../entities/company.entity";

@InputType()
export class UpdateCompanyInput extends OmitType(
  Company,
  [
    "createdAt",
    "updatedAt",
    "isActive",
    "currency",
    "headOffice",
    "headOfficeName",
    "isGroup",
    "tenant",

    "modifiedBy",
    // "tenantId",
    "companyId",
    "ownerId"
    // "tenant"
  ] as const,
  InputType
) {}

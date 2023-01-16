import { Field, InputType, OmitType } from "@nestjs/graphql";
import { GraphQLUUID } from "graphql-scalars";
import { Company } from "../entities/company.entity";

@InputType()
export class CreateCompanyInput extends OmitType(
  Company,
  [
    "createdAt",
    "updatedAt",
    "id",
    "isActive",
    "currency",
    "headOffice",
    "headOfficeName",
    "companyId",
    // Add this to fix it
    // "tenantId",
    "ownerId",
    "modifiedBy",
    "isGroup",
    "tenant"
  ] as const,
  InputType
) {
  @Field(() => GraphQLUUID)
  currencyId: string;

  @Field(() => GraphQLUUID)
  headOfficeId?: string;
}

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
    "currency"
    // "tenantId",
    // "companyId",
    // "ownerId"
    // "tenant"
  ] as const,
  InputType
) {
  @Field(() => GraphQLUUID)
  currencyId: string;
}

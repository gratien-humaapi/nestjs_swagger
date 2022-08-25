import { InputType, OmitType } from "@nestjs/graphql";
import { Tenant } from "../entities/tenant.entity";

@InputType()
export class CreateTenantInput extends OmitType(
  Tenant,
  ["createdAt", "updatedAt", "id", "isActive"] as const,
  InputType
) {}

import { InputType, OmitType } from "@nestjs/graphql";
import { Tenant } from "../entities/tenant.entity";

@InputType()
export class UpdateTenantInput extends OmitType(
  Tenant,
  ["createdAt", "updatedAt", "isActive"] as const,
  InputType
) {}

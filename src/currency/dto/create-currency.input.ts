import { InputType, OmitType } from "@nestjs/graphql";
import { Currency } from "../entities/currency.entity";

@InputType()
export class CreateCurrencyInput extends OmitType(
  Currency,
  // ["createdAt", "updatedAt", "owner", "modifiedBy", "id", "tenant"] as const,
  ["createdAt", "updatedAt", "id"] as const,

  InputType
) {}

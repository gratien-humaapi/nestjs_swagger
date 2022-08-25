import { InputType, Field, Int, PartialType, OmitType } from "@nestjs/graphql";
import { Currency } from "../entities/currency.entity";

@InputType()
export class UpdateCurrencyInput extends OmitType(
  Currency,
  // ["createdAt", "updatedAt", "owner", "modifiedBy", "tenant"] as const,
  ["createdAt", "updatedAt"] as const,

  InputType
) {}

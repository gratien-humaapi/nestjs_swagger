/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Entity, Index, Property, Unique } from "@mikro-orm/core";
import { ObjectType, Field, ID } from "@nestjs/graphql";
import { IsUppercase, Length, MaxLength } from "class-validator";
import { CustomBaseEntity } from "../../common";
import { CurrencyRepository } from "../currency.repository";

type CustomOptionalProps = "isActive" | "description";
// https://taxsummaries.pwc.com/glossary/currency-codes
@ObjectType()
@Entity({ customRepository: () => CurrencyRepository })
export class Currency extends CustomBaseEntity<
  CurrencyRepository,
  CustomOptionalProps
> {
  @Property()
  isActive: boolean = true;

  @Property()
  @Length(3)
  @IsUppercase()
  @Unique()
  code: string;

  @Property()
  @MaxLength(30)
  @IsUppercase()
  @Unique()
  name: string;

  @Property()
  @MaxLength(5)
  symbol: string;

  @Property()
  // exemple 100, 1000 (100 centimes euro)
  fractionUnit: number;

  @Property()
  @MaxLength(30)
  // centimes for euro, cents for dollard
  fraction: string;

  @Property()
  @MaxLength(30)
  // #,###.## or #,###.### or #,### ...
  format: string;
}

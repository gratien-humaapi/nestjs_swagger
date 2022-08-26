/* eslint-disable @typescript-eslint/no-inferrable-types */
import {
  Entity,
  EntityRepositoryType,
  OptionalProps,
  PrimaryKey,
  Property,
  ManyToOne
} from "@mikro-orm/core";
import { ObjectType, Field, ID } from "@nestjs/graphql";
import { IsUppercase, Length, MaxLength } from "class-validator";
import { BaseEntityWithUser } from "../../common";
// eslint-disable-next-line import/no-cycle
import { CurrencyRepository } from "../currency.repository";

// https://taxsummaries.pwc.com/glossary/currency-codes
@ObjectType()
@Entity({ customRepository: () => CurrencyRepository })
export class Currency extends BaseEntityWithUser {
  [EntityRepositoryType]?: CurrencyRepository;

  @Property()
  isActive: boolean = true;

  @Property()
  @Length(3)
  @IsUppercase()
  code: string;

  @Property()
  @MaxLength(30)
  @IsUppercase()
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

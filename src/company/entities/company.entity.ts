/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Entity, Property, Enum, ManyToOne } from "@mikro-orm/core";
import { ObjectType } from "@nestjs/graphql";
import { MaxLength } from "class-validator";
import { User } from "../../user/entities/user.entity";
import { Currency } from "../../currency/entities/currency.entity";
import { BaseEntityWithTenantUser, CommonStatusEnum } from "../../common";
import { CompanyRepository } from "../company.repository";

type CustomOptionalProps = "isActive" | "description";

@ObjectType()
@Entity({ customRepository: () => CompanyRepository })
export class Company extends BaseEntityWithTenantUser<
  CompanyRepository,
  CustomOptionalProps
> {
  @Property({
    onCreate: (e: Company) => e.status === "ACTIVE",
    onUpdate: (e: Company) => e.status === "ACTIVE"
  })
  isActive: boolean;

  @Enum()
  status: CommonStatusEnum;

  @Property()
  name: string;

  @Property()
  abbreviation: string;

  @Property()
  isGroup: boolean;

  @ManyToOne(() => Company, { mapToPk: true })
  headoffice: string;

  @Property()
  @MaxLength(30)
  industry: string;

  @Property()
  @MaxLength(256)
  description: string = "";

  @ManyToOne(() => Currency, { mapToPk: true })
  defaultCurrency: string;
}

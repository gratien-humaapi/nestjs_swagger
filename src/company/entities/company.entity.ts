/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import {
  Entity,
  Enum,
  Index,
  ManyToOne,
  Property,
  Unique
} from "@mikro-orm/core";
import { Field, HideField, ObjectType } from "@nestjs/graphql";
import { IsUUID, MaxLength } from "class-validator";
import {
  BaseEntityWithTU,
  CommonStatusEnum,
  CustomBaseEntity,
  IsBusinessIndustry
} from "../../common";
import { Currency } from "../../currency/entities/currency.entity";
import { Tenant } from "../../tenant";
import { CompanyRepository } from "../company.repository";

type CustomOptionalProps =
  | "isActive"
  | "description"
  | "tenantId"
  | "companyId"
  | "ownerId"
  | "modifiedBy"
  | "tenantEntity"
  | "headOfficeName"
  | "isGroup";

@ObjectType()
@Entity({ customRepository: () => CompanyRepository })
export class Company extends BaseEntityWithTU<
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
  @Unique()
  @Index()
  name: string;

  @Property()
  abbreviation: string;

  @Property({
    onCreate: (e: Company) => !e.headOffice
  })
  isGroup: boolean;

  @Field()
  @Property({ persist: false })
  get headOfficeName(): string {
    return this.headOffice?.name ?? "";
  }

  @ManyToOne()
  @HideField()
  headOffice?: Company;

  @Property()
  @IsBusinessIndustry()
  @MaxLength(30)
  industryCode: string;

  @Property()
  @MaxLength(256)
  description: string = "";

  @ManyToOne()
  currency: Currency;

  @ManyToOne()
  // @Property()
  @HideField()
  tenantEntity?: Tenant;
}

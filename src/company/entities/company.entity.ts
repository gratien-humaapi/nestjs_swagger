/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Entity, Property, Enum, ManyToOne } from "@mikro-orm/core";
import { Field, HideField, ObjectType } from "@nestjs/graphql";
import { IsUUID, MaxLength } from "class-validator";
import { GraphQLUUID } from "graphql-scalars";
import { Tenant } from "../../tenant";
import { Currency } from "../../currency/entities/currency.entity";
import {
  BaseEntityWithTUC,
  CommonStatusEnum,
  CustomBaseEntity
} from "../../common";
import { CompanyRepository } from "../company.repository";

type CustomOptionalProps =
  | "isActive"
  | "description"
  | "tenantId"
  | "companyId"
  | "ownerId"
  | "tenant";

@ObjectType()
@Entity({ customRepository: () => CompanyRepository })
export class Company extends CustomBaseEntity<
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

  // @ManyToOne(() => Company, {
  //   mapToPk: true
  //   // onCreate: (e: Company) => (e.isGroup ? "" : e.headOffice)
  // })
  // headOffice: string;

  @Property()
  @MaxLength(30)
  industry: string;

  @Property()
  @MaxLength(256)
  description: string = "";

  @ManyToOne()
  currency: Currency;

  // @Property({ onCreate: (e: Company) => (e.isGroup ? e.id : e.headOffice) })
  // @Property()
  // @HideField()
  // @IsUUID()
  // companyId: string;

  // @Property({ onCreate: (e: Company) => e.id })
  // @HideField()
  // @IsUUID()
  // tenantId: string;

  // @ManyToOne()
  // @HideField()
  // tenant: Tenant;
}

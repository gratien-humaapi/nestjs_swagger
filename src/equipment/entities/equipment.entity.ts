/* eslint-disable import/no-cycle */
import { Entity, Property } from "@mikro-orm/core";
import { ObjectType } from "@nestjs/graphql";
import { CustomBaseEntity } from "src/common";
import { Company } from "src/company";
import { EquipmentRepository } from "../equipment.repository";

@ObjectType()
@Entity()
export class Equipment extends CustomBaseEntity<EquipmentRepository> {
  @Property()
  ref: string;

  @Property()
  name: string;

  @Property()
  description: string;

  @Property()
  category: string;

  @Property()
  location: string;

  // To edit after
  @Property()
  owner: Company;

  // to edit after
  @Property()
  technician: string | [];

  @Property()
  contractor: string;

  @Property()
  maintenanceRequired: boolean;

  @Property()
  isActive: string;
}

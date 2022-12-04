import { EntityRepository } from "@mikro-orm/postgresql";
import { Equipment } from "./entities/equipment.entity";

export class EquipmentRepository extends EntityRepository<Equipment> {}

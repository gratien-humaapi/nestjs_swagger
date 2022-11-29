/* eslint-disable import/no-cycle */
import { EntityRepository } from "@mikro-orm/postgresql";
import { Industry } from "./entities/industry.entity";

export class IndustryRepository extends EntityRepository<Industry> {}

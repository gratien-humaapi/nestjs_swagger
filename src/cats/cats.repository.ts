import { EntityRepository } from "@mikro-orm/postgresql";
import { Cat } from "./entities/cats.entity";

export class CatRepository extends EntityRepository<Cat> {}

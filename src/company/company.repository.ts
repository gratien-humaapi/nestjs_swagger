import { EntityRepository } from "@mikro-orm/postgresql";
// eslint-disable-next-line import/no-cycle
import { Company } from "./entities/company.entity";

export class CompanyRepository extends EntityRepository<Company> {}

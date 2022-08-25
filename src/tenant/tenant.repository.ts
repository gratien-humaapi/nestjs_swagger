import { EntityRepository } from "@mikro-orm/postgresql";
// eslint-disable-next-line import/no-cycle
import { Tenant } from "./entities/tenant.entity";

export class TenantRepository extends EntityRepository<Tenant> {}

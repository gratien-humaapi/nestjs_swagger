import { Dictionary, EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { Company } from "src/company";
import { TenantFactory } from "./tenant.factory";

export class TenantSeeder extends Seeder {
  async run(
    em: EntityManager,
    context: Dictionary<{ companies: Company[] }>
  ): Promise<void> {
    const {
      allCompanies: { companies }
    } = context;
    const tenantFactory = new TenantFactory(em);
    // eslint-disable-next-line array-callback-return
    companies.map((value: Company) => {
      if (value.headOffice) {
        const {
          headOffice: { name, description, status, isActive }
        } = value;
        tenantFactory.createOne({ name, description, status, isActive });
      }
    });
  }
}

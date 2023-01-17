import { Dictionary, EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { CommonStatusEnum } from "src/common";
import { Currency } from "src/currency/entities/currency.entity";
import { TenantFactory } from "src/tenant/entities/tenant.factory";
import { CompanyFactory } from "./company.factory";

const companies = [
  {
    status: CommonStatusEnum.ACTIVE
  },
  {
    status: CommonStatusEnum.ACTIVE
  },
  {
    status: CommonStatusEnum.ACTIVE
  }
];

export class CompanySeeder extends Seeder {
  async run(
    em: EntityManager,
    context: Dictionary<{ currencies: Currency[] }>
  ): Promise<void> {
    const { currencies } = context;
    const companyFactory = new CompanyFactory(em);
    const tenantFactory = new TenantFactory(em);
    const tenant = await tenantFactory.createOne();
    const headOffice = await companyFactory.createOne({
      currency: currencies[0],
      name: tenant.name,
      description: tenant.description,
      status: tenant.status,
      isActive: tenant.isActive,
      ownerId: "d77f8478-3fb7-4610-84ee-04fe44a9eb0f",
      tenant
    });
    companies.map(async (value) => {
      const tenantWithParent = await tenantFactory.createOne({
        parentId: tenant.id
      });
      companyFactory.createOne({
        ...value,
        name: tenantWithParent.name,
        description: tenantWithParent.description,
        isActive: tenantWithParent.isActive,
        status: tenantWithParent.status,
        headOffice,
        tenant: tenantWithParent,
        ownerId: "d77f8478-3fb7-4610-84ee-04fe44a9eb0f",
        currency: currencies[0]
      });
    });
  }
}

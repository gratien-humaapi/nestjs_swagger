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
    // const tenantFactory = new TenantFactory(em);
    // const tenant = tenantFactory.createOne()
    const headOffice = await companyFactory.createOne({
      currency: currencies[0]
    });
    companies.map((value) =>
      companyFactory.createOne({
        ...value,
        headOffice,
        currency: currencies[0]
      })
    );
  }
}

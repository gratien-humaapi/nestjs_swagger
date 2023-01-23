/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-shadow */
import { Dictionary, EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { CommonStatusEnum, wait } from "src/common";
import { Currency } from "src/currency/entities/currency.entity";
import { TenantFactory } from "src/tenant/entities/tenant.factory";
import { Company } from "./company.entity";
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
    // const tenant = await tenantFactory.createOne();
    const books: Company[] = new CompanyFactory(em)
      .each((company) => {
        const tenant = new TenantFactory(em).makeOne();
        company.tenantEntity = tenant;
        company.name = tenant.name;
        company.tenantId = tenant.id;
      })
      .make(5, {
        currency: currencies[0]
      });
  }
}

import { Dictionary, EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { CommonStatusEnum } from "src/common";
import { Currency } from "src/currency/entities/currency.entity";
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

    companies.map((value) =>
      new CompanyFactory(em).createOne({ ...value, currency: currencies[0] })
    );
  }
}

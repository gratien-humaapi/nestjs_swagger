import { EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { CommonStatusEnum, industries } from "src/common";
import { Company } from "src/company";
import { CompanySeeder } from "src/company/entities/company.seeder";
import { CurrencySeeder } from "src/currency/entities/currency.seeder";
import { Currency } from "src/currency/entities/currency.entity";
import { Industry } from "src/industry/entities/industry.entity";

const currenciesInput = [
  {
    isActive: true,
    code: "EUR",
    name: "EURO",
    symbol: "€",
    fractionUnit: 100,
    fraction: "centimes",
    format: "#,###.##"
  },
  {
    isActive: true,
    code: "USD",
    name: "DOLLARS",
    symbol: "$",
    fractionUnit: 100,
    fraction: "centimes",
    format: "#,###.##"
  },
  {
    isActive: true,
    code: "XOF",
    name: "FRANC CFA",
    symbol: "FCFA",
    fractionUnit: 100,
    fraction: "centimes",
    format: "#,###"
  }
];

const companiesInput = [
  {
    // currency: listCurrencies[0],
    abbreviation: "Ebay",
    description: "E-commerce and more...",
    industryCode: "58.2",
    name: "Ebay",
    status: CommonStatusEnum.ACTIVE
  },
  {
    // currency: listCurrencies[1],
    abbreviation: "Google",
    description: "Google search...",
    industryCode: "58.2",
    name: "Google",
    status: CommonStatusEnum.ACTIVE
  },
  {
    // currency: listCurrencies[2],
    abbreviation: "Snapchat",
    description: "Picture and more...",
    industryCode: "58.2",
    name: "Snapchat",
    status: CommonStatusEnum.ACTIVE
  }
];

export class DatabaseSeeder extends Seeder {
  listCurrencies: Currency[] = [];

  async run(em: EntityManager): Promise<void> {
    return this.call(em, [CurrencySeeder, CompanySeeder]);

    // Industries
    // industries.map(async ({ section, code, level, name, categoryName }) => {
    //   const industry = em.create(Industry, {
    //     section,
    //     code,
    //     name,
    //     level,
    //     categoryName
    //   });
    //   await em.persistAndFlush(industry);
    // });
    // // Currencies
    // currenciesInput.map(
    //   async ({
    //     code,
    //     format,
    //     fraction,
    //     fractionUnit,
    //     isActive,
    //     name,
    //     symbol
    //   }) => {
    //     const currency = em.create(Currency, {
    //       code,
    //       format,
    //       fraction,
    //       fractionUnit,
    //       isActive,
    //       name,
    //       symbol
    //     });
    //     this.listCurrencies.push(currency);
    //     await em.persistAndFlush(currency);
    //   }
    // );
    // // Companies
    // companiesInput.map(
    //   async ({ abbreviation, description, industryCode, name, status }) => {
    //     const company = em.create(Company, {
    //       abbreviation,
    //       currency: this.listCurrencies[0],
    //       description,
    //       industryCode,
    //       name,
    //       status
    //     });
    //     await em.persistAndFlush(company);
    //   }
    // );
  }
}

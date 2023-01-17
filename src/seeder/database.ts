import { EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { CompanySeeder } from "src/company/entities/company.seeder";
import { CurrencySeeder } from "src/currency/entities/currency.seeder";
import { IndustrySeeder } from "src/industry/entities/industry.seeder";

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    return this.call(em, [CurrencySeeder, CompanySeeder, IndustrySeeder]);

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

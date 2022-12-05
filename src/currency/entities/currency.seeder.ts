import { Dictionary, EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { CurrencyFactory } from "./currency.factory";

const currencies = [
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

export class CurrencySeeder extends Seeder {
  async run(em: EntityManager, context: Dictionary): Promise<void> {
    const promiseData = currencies.map(async (value) => {
      const currencyFactory = new CurrencyFactory(em);
      const currency = await currencyFactory.createOne({ ...value });
      return currency;
    });
    const currenciesCtx = await Promise.all(promiseData);

    context.currencies = currenciesCtx;
  }
}

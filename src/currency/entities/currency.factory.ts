import { Factory, Faker } from "@mikro-orm/seeder";
import { Currency } from "./currency.entity";

export class CurrencyFactory extends Factory<Currency> {
  model = Currency;

  definition(faker: Faker): Partial<Currency> {
    return {
      isActive: true,
      code: "EUR",
      name: "EURO",
      symbol: "€",
      fractionUnit: 100,
      fraction: "centimes",
      format: "#,###.##"
    };
  }
}

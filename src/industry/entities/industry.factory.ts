import { Factory, Faker } from "@mikro-orm/seeder";
import { Industry } from "./industry.entity";

export class IndustryFactory extends Factory<Industry> {
  model = Industry;

  definition(faker: Faker): Partial<Industry> {
    return {
      section: "Place holder",
      code: "Place holder",
      name: "Place holder",
      level: "Place holder",
      categoryName: "Place holder"
    };
  }
}

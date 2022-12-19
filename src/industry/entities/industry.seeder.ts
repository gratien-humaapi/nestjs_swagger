import { Dictionary, EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { industries } from "src/common";
import { IndustryFactory } from "./industry.factory";

export class IndustrySeeder extends Seeder {
  async run(em: EntityManager, context: Dictionary): Promise<void> {
    const industryFactory = new IndustryFactory(em);
    industries.map(async (value) => {
      industryFactory.createOne({ ...value });
    });
  }
}

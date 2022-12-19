import { EntityData } from "@mikro-orm/core";
import { Factory, Faker } from "@mikro-orm/seeder";
import { CommonStatusEnum } from "src/common";
import { v4 } from "uuid";
import { Company } from "./company.entity";

export class CompanyFactory extends Factory<Company> {
  model = Company;

  definition(faker: Faker): Partial<Company> {
    const name = faker.company.companyName();
    return {
      name,
      abbreviation: name.substring(0, 3),
      status: CommonStatusEnum.ACTIVE,
      industryCode: "58.2",
      description: "This is a place holder",
      isActive: true
    };
  }
}

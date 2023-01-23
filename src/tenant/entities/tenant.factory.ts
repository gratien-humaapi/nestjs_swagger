import { Factory, Faker } from "@mikro-orm/seeder";
import { CommonStatusEnum } from "src/common";
import { v4 } from "uuid";
import { Tenant } from "./tenant.entity";

export class TenantFactory extends Factory<Tenant> {
  model = Tenant;

  definition(faker: Faker): Partial<Tenant> {
    const name = faker.name.findName();
    return {
      id: v4(),
      name,
      status: CommonStatusEnum.ACTIVE,
      description: "This is a place holder",
      isActive: true
    };
  }
}

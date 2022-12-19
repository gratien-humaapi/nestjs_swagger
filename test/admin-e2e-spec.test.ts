/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { INestApplication } from "@nestjs/common";
import type { PartialDeep } from "type-fest";
import { Connection, IDatabaseDriver, MikroORM } from "@mikro-orm/core";
import { ConfigService } from "@nestjs/config";
import { CommonStatusEnum } from "./API";
import { sessionFactory } from "./services";
import { ApolloSdk, createTestingModule, errorResponse } from "./utils";
// import "dotenv/config";
const configService = new ConfigService();
describe("GraphQL AdminResolver (e2e)", () => {
  let app: INestApplication;
  // let client: GraphqlClient;
  let client: ApolloSdk;
  let orm: MikroORM<IDatabaseDriver<Connection>>;

  beforeAll(async () => {
    const { nestApp, url } = await createTestingModule();
    orm = await MikroORM.init({
      entities: ["src/**/*.entity.ts"],
      dbName: configService.get("POSTGRES_DB"),
      user: configService.get("POSTGRES_USER"),
      password: configService.get("POSTGRES_PASSWORD"),
      type: "postgresql"
      // ...
    });
    const generator = orm.getSchemaGenerator();
    await generator.clearDatabase();

    app = nestApp;
    client = await sessionFactory({
      url,
      authParams: {
        username: "test@mail.com",
        password: "AA7f526bef140a.."
      }
    });
    // client = graphqlClient(url);
  });
  beforeAll(async () => {
    const input: Parameters<typeof client.createCurrency>["0"]["input"] = {
      code: "EUR",
      name: "EURO",
      symbol: "€",
      fractionUnit: 100,
      fraction: "centimes",
      format: "#,###.##",
      isActive: true
    };
    const { createCurrency } = await client.createCurrency({
      input
    });
  });

  afterAll(async () => {
    // if (!process.env.LOCAL_TEST) {
    orm.close();
    await app.close();
    // }
  });

  // eslint-disable-next-line arrow-body-style
  it("should create a head office Company", async () => {
    const { currencyByCode } = await client.currencyByCode({
      code: "EUR"
    });

    const input: Parameters<typeof client.adminCreateCompany>["0"]["input"] = {
      status: CommonStatusEnum.ACTIVE,
      name: "Humaapi",
      abbreviation: "Hm",
      industryCode: "58.2",
      description: "description test",
      currencyId: currencyByCode.id
    };
    const { adminCreateCompany } = await client.adminCreateCompany({
      input
    });
    expect(adminCreateCompany).toMatchObject<
      PartialDeep<typeof adminCreateCompany>
    >({
      isActive: true,
      headOfficeName: "",
      status: CommonStatusEnum.ACTIVE,
      name: input.name,
      abbreviation: input.abbreviation,
      isGroup: true,
      industryCode: input.industryCode,
      description: input.description!,
      currency: {
        id: currencyByCode.id
      }
    });
  });

  it("should create a subsidiary Company", async () => {
    const { currencyByCode } = await client.currencyByCode({
      code: "EUR"
    });

    const { companyByName } = await client.companyByName({
      name: "Humaapi"
    });
    const input: Parameters<typeof client.adminCreateCompany>["0"]["input"] = {
      status: CommonStatusEnum.ACTIVE,
      name: "Humaapi Subsidiary",
      abbreviation: "HmS",
      industryCode: "58.2",
      description: "description test",
      currencyId: currencyByCode.id,
      headOfficeId: companyByName.id
    };
    const { adminCreateCompany } = await client.adminCreateCompany({
      input
    });
    expect(adminCreateCompany).toMatchObject<
      PartialDeep<typeof adminCreateCompany>
    >({
      isActive: true,
      headOfficeName: companyByName.name,
      status: input.status,
      name: input.name,
      abbreviation: input.abbreviation,
      isGroup: false,
      industryCode: input.industryCode,
      description: input.description!,
      currency: {
        id: input.currencyId
      }
    });
  });
});

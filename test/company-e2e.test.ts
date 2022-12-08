import { Connection, IDatabaseDriver, MikroORM } from "@mikro-orm/core";
import { INestApplication } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import { CommonStatusEnum } from "src/common";
import { ApolloSdk } from "test/utils";
import { sessionFactory } from "./services";

async function createTestingModule() {
  let moduleFixture;
  // eslint-disable-next-line prefer-const
  moduleFixture = await Test.createTestingModule({
    imports: [AppModule]
  }).compile();

  const nestApp = moduleFixture.createNestApplication();
  if (process.env.LOCAL_TEST) {
    const url = "http://localhost:3001";
    return { nestApp, url };
  }

  await nestApp.listen(3002);
  const url = (await nestApp.getUrl()).replace("[::1]", "localhost");
  // const bootstrappedApp = await app.init();
  return { nestApp, url };
}

const configService = new ConfigService();
describe("Company Test", () => {
  let app: INestApplication;
  // let client: GraphqlClient;
  let client: ApolloSdk;
  let orm: MikroORM<IDatabaseDriver<Connection>>;

  beforeEach(async () => {
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
        username: "kenagbad@live.fr",
        password: "AKinnoth99.#"
      }
    });
  });

  beforeAll(async () => {
    // const input = {
    //   code: "EUR",
    //   name: "EURO",
    //   symbol: "€",
    //   fractionUnit: 100,
    //   fraction: "centimes",
    //   format: "#,###.##",
    //   isActive: true
    // };
    // const { createCurrency } = await client.createCurrency({
    //   input
    // });
  });

  // eslint-disable-next-line arrow-body-style
  it("should create a head office Company", async () => {
    const { currencyByCode } = await client.currencyByCode({
      code: "EUR"
    });

    const input = {
      currencyId: currencyByCode.id,
      abbreviation: "Ebay",
      description: "E-commerce and more...",
      industryCode: "58.2",
      name: "Ebay",
      status: CommonStatusEnum.ACTIVE
    };
    const { adminCreateCompany } = await client.adminCreateCompany({
      input
    });

    console.log(adminCreateCompany);

    // expect(adminCreateCompany).toBeDefined();
  });

  it("should be defined", async () => {
    const { company } = await client.company({
      id: "879aba11-5d74-48a1-bed9-ca8e880113e2"
    });

    console.log(company);

    expect(company).toBeDefined();
  });
});

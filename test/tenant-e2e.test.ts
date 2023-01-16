import { Connection, IDatabaseDriver, MikroORM } from "@mikro-orm/core";
import { INestApplication } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import { CommonStatusEnum } from "src/common";
import { DatabaseSeeder } from "src/seeder/database";
import { ApolloSdk } from "test/utils";
import { PartialDeep } from "type-fest";
import { Company, UpdateCompanyInput } from "./API";
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

async function initApp(configService: ConfigService) {
  let orm: MikroORM<IDatabaseDriver<Connection>>;
  let myClient: ApolloSdk;
  const { nestApp, url } = await createTestingModule();
  // eslint-disable-next-line prefer-const
  orm = await MikroORM.init({
    entities: ["src/**/*.entity.ts"],
    dbName: configService.get("POSTGRES_DB"),
    user: configService.get("POSTGRES_USER"),
    password: configService.get("POSTGRES_PASSWORD"),
    type: "postgresql"
    // ...
  });

  // eslint-disable-next-line prefer-const
  myClient = await sessionFactory({
    url,
    authParams: {
      // username: "kenagbad@live.fr",
      // password: "AKinnoth99.#"
      username: "johndoe@gmail.com",
      password: "AA7f526bef140a.."
    }
  });
  return { orm, myClient };
}

const configService = new ConfigService();
describe("Tenant", () => {
  // let client: GraphqlClient;
  let myOrm: MikroORM<IDatabaseDriver<Connection>>;
  let client: ApolloSdk;

  beforeAll(async () => {
    // A mettre dans une fonction
    const { orm, myClient } = await initApp(configService);
    client = myClient;
    const seeder = orm.getSeeder();

    // Clear the database to start clean
    // await orm.getSchemaGenerator().clearDatabase();

    // // Create some new data using a seeder
    // await seeder.seed(DatabaseSeeder);
  });

  beforeEach(async () => {
    // A mettre dans une fonction
    const { orm, myClient } = await initApp(configService);
    client = myClient;
    // myOrm = orm;
  });

  it("Get a Tenant", async () => {
    const { tenants } = await client.tenants({});

    // console.log(adminCreateCompany);

    // expect(adminCreateCompany).toMatchObject<
    //   PartialDeep<typeof adminCreateCompany>
    // >({

    // });
  });
});

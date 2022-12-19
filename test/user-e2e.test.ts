import { UserStatusType } from "@aws-sdk/client-cognito-identity-provider";
import { Connection, IDatabaseDriver, MikroORM } from "@mikro-orm/core";
import { INestApplication } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import { CommonStatusEnum } from "src/common";
import { DatabaseSeeder } from "src/seeder/database";
import { ApolloSdk, HMAuthSDK } from "test/utils";
import { PartialDeep } from "type-fest";
import fetch from "cross-fetch";
import {
  CognitoUserStatusEnum,
  Company,
  UpdateCompanyInput,
  UserStatusEnum,
  UserTypeEnum
} from "./API";
import { authService, sessionFactory } from "./services";

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
  // const generator = orm.getSchemaGenerator();
  // const seeder = orm.getSeeder();
  // await seeder.seed();

  // eslint-disable-next-line prefer-const
  myClient = await sessionFactory({
    url,
    authParams: {
      username: "kenagbad@live.fr",
      password: "AKinnoth99.#"
    }
  });
  return { orm, myClient, url };
}

const configService = new ConfigService();
describe("User", () => {
  // let client: GraphqlClient;
  let myOrm: MikroORM<IDatabaseDriver<Connection>>;
  let client: ApolloSdk;
  let authClient: HMAuthSDK;

  beforeAll(async () => {
    // A mettre dans une fonction
    const { orm, myClient, url } = await initApp(configService);
    client = myClient;
    const seeder = orm.getSeeder();
    // Clear the database to start clean
    await orm.getSchemaGenerator().clearDatabase();

    // Create some new data using a seeder
    await seeder.seed(DatabaseSeeder);
    authClient = authService({ url, fetch });
    // client = await sessionFactory({
    //   url,
    //   authParams: {
    //     username: "kenagbad@live.fr",
    //     password: "AKinnoth99.#"
    //   }
    // });
  });

  beforeEach(async () => {
    // A mettre dans une fonction
    const { orm, myClient } = await initApp(configService);
    client = myClient;
    // myOrm = orm;
  });

  it("create the first user", async () => {
    const { companies } = await client.companies();
    const input = {
      username: "paul@gmail.com",
      firstName: "Paul",
      lastName: "Doe",
      modifiedBy: "",
      companyId: companies[0].id,
      // Raison why you don't use tenant.id
      tenantId: companies[0].id,
      attributes: [
        {
          name: "email",
          value: "paul@gmail.com",
          isVerified: true
        },
        {
          name: "custom:tenantId",
          value: companies[0].id
        }
      ],
      status: UserStatusEnum.ACTIVE,
      photoURL: "",
      timeZone: "Africa/Porto-Novo",
      temporaryPassword: "AA7f526bef140a..",
      sendPassword: false,
      permanent: true,
      type: UserTypeEnum.ADMIN
    };
    const { adminCreateUser } = await client.adminCreateUser({
      input
    });

    // console.log(adminCreateCompany);

    expect(adminCreateUser).toMatchObject<PartialDeep<typeof adminCreateUser>>({
      authData: {
        attributes: [
          {
            name: "email",
            value: input.attributes[0].value,
            isVerified: true
          }
          // {
          //   name: "sub",
          //   value: "f8150b2d-160e-4fb1-bd94-0b28179f2259",
          //   isVerified: false
          // }
        ],
        enabled: true,
        // username: "f8150b2d-160e-4fb1-bd94-0b28179f2259",
        userStatus: CognitoUserStatusEnum.FORCE_CHANGE_PASSWORD
      },
      firstName: input.firstName,
      lastName: input.lastName,
      isActive: true,
      modifiedBy: input.modifiedBy,
      status: input.status,
      timeZone: "Africa/Porto-Novo",
      type: input.type
    });
  });
});

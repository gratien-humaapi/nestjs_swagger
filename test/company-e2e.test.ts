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

export interface ICurrentUser {
  owner: string;
  company: string;
  tenant: string;
  role: string;
}

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
  // let orm: MikroORM<IDatabaseDriver<Connection>>;
  // let myClient: ApolloSdk;
  const { nestApp, url } = await createTestingModule();
  // eslint-disable-next-line prefer-const
  const orm = await MikroORM.init({
    entities: ["src/**/*.entity.ts"],
    dbName: configService.get("POSTGRES_DB"),
    user: configService.get("POSTGRES_USER"),
    password: configService.get("POSTGRES_PASSWORD"),
    type: "postgresql"
    // ...
  });

  // eslint-disable-next-line prefer-const
  const { apolloClient, ...rest } = await sessionFactory({
    url,
    authParams: {
      // username: "kenagbad@live.fr",
      // password: "AKinnoth99.#"
      username: "johndoe@gmail.com",
      password: "AA7f526bef140a.."
    }
  });
  return { orm, apolloClient, rest };
}

const configService = new ConfigService();
describe("Head Office Company", () => {
  // let client: GraphqlClient;
  let myOrm: MikroORM<IDatabaseDriver<Connection>>;
  let client: ApolloSdk;
  let currentUser: ICurrentUser;

  beforeAll(async () => {
    // A mettre dans une fonction
    const { orm, apolloClient, rest } = await initApp(configService);
    client = apolloClient;
    currentUser = rest;
    const seeder = orm.getSeeder();

    console.log(currentUser);

    // Clear the database to start clean
    // await orm.getSchemaGenerator().clearDatabase();

    // // Create some new data using a seeder
    // await seeder.seed(DatabaseSeeder);
  });

  // beforeEach(async () => {
  //   // A mettre dans une fonction
  //   const { orm, myClient } = await initApp(configService);
  //   client = myClient;
  //   // myOrm = orm;
  // });

  it("create a head office Company", async () => {
    const { currencyByCode } = await client.currencyByCode({
      code: "EUR"
    });

    const input = {
      currencyId: currencyByCode.id,
      abbreviation: "Amazon",
      description: "E-commerce and more...",
      industryCode: "58.2",
      name: "Amazon",
      status: CommonStatusEnum.ACTIVE
    };
    const { adminCreateCompany } = await client.adminCreateCompany({
      input
    });

    // console.log(adminCreateCompany);

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
      ownerId: currentUser.owner,
      modifiedBy: currentUser.owner,
      description: input.description,
      currency: {
        id: currencyByCode.id
      }
    });
  });

  // eslint-disable-next-line arrow-body-style
  it("create a Company", async () => {
    const { currencyByCode } = await client.currencyByCode({
      code: "USD"
    });

    const { companies } = await client.companies();

    console.log(companies);
    const input = {
      currencyId: currencyByCode.id,
      headOfficeId: companies[0].id,
      abbreviation: "Paypal",
      description: "Money tranfert and more...",
      industryCode: "58.2",
      name: "Paypal",
      status: CommonStatusEnum.ACTIVE
    };
    const { adminCreateCompany } = await client.adminCreateCompany({
      input
    });

    console.log(adminCreateCompany);

    expect(adminCreateCompany).toMatchObject<
      PartialDeep<typeof adminCreateCompany>
    >({
      isActive: true,
      headOfficeName: companies[0].name,
      status: CommonStatusEnum.ACTIVE,
      name: input.name,
      abbreviation: input.abbreviation,
      isGroup: false,
      industryCode: input.industryCode,
      // tenant: null,
      description: input.description,
      currency: {
        id: currencyByCode.id
      }
    });
  });

  it("create a second Company", async () => {
    const { currencyByCode } = await client.currencyByCode({
      code: "EUR"
    });

    const { companies } = await client.companies();

    const input = {
      currencyId: currencyByCode.id,
      headOfficeId: companies[0].id,
      abbreviation: "Snapchat",
      description: "Pictures and more...",
      industryCode: "58.2",
      name: "Snapchat",
      status: CommonStatusEnum.ACTIVE
    };
    const { adminCreateCompany } = await client.adminCreateCompany({
      input
    });

    // console.log(adminCreateCompany);

    expect(adminCreateCompany).toMatchObject<
      PartialDeep<typeof adminCreateCompany>
    >({
      isActive: true,
      headOfficeName: companies[0].name,
      status: CommonStatusEnum.ACTIVE,
      name: input.name,
      abbreviation: input.abbreviation,
      isGroup: false,
      industryCode: input.industryCode,
      // tenant: null,
      description: input.description,
      currency: {
        id: currencyByCode.id
      }
    });
  });

  it("Update a Company", async () => {
    const { companies } = await client.companies();

    const input: UpdateCompanyInput = {
      abbreviation: "UE",
      description: "Food, delevery and more...",
      id: companies[3].id,
      industryCode: "55",
      name: "Uber Eats",
      status: CommonStatusEnum.ACTIVE
    };
    const { updateCompany } = await client.updateCompany({
      input
    });

    expect(updateCompany).toMatchObject<PartialDeep<typeof updateCompany>>({
      isActive: true,
      // headOfficeName: companies[3].name,
      status: CommonStatusEnum.ACTIVE,
      name: input.name,
      abbreviation: input.abbreviation,
      isGroup: false,
      industryCode: input.industryCode,
      // tenant: null,
      description: input.description!
      // currency: {
      //   id: currencyByCode.id
      // }
    });
  });

  it("Delete a Company", async () => {
    const { companies } = await client.companies();

    const { removeCompany } = await client.removeCompany({
      id: companies[2].id
    });

    expect(removeCompany).toMatchObject<PartialDeep<typeof removeCompany>>({
      isActive: true,
      // headOfficeName: companies[2].headOfficeName,
      status: CommonStatusEnum.ACTIVE,
      name: companies[2].name,
      abbreviation: companies[2].abbreviation,
      isGroup: companies[2].isGroup,
      industryCode: companies[2].industryCode,
      // tenant: null,
      description: companies[2].description,
      currency: companies[2].currency
    });
  });
});

//

// describe("Affiliate Company", () => {
//   // let client: GraphqlClient;
//   let myOrm: MikroORM<IDatabaseDriver<Connection>>;
//   let client: ApolloSdk;

//   beforeAll(async () => {
//     // A mettre dans une fonction
//     const { orm, myClient } = await initApp(configService);
//     client = myClient;
//     const seeder = orm.getSeeder();

//     // Clear the database to start clean
//     await orm.getSchemaGenerator().clearDatabase();

//     // Create some new data using a seeder
//     await seeder.seed(DatabaseSeeder);
//   });

//   beforeEach(async () => {
//     // A mettre dans une fonction
//     const { orm, myClient } = await initApp(configService);
//     client = myClient;
//     // myOrm = orm;
//   });

//   it("create a head office Company", async () => {
//     // Waiting for order ...
//   });
// });

/* eslint-disable @typescript-eslint/no-non-null-assertion */
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

async function initApp(configService: ConfigService, loginData) {
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
      username: loginData.username,
      password: loginData.password
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
    const { orm, apolloClient, rest } = await initApp(configService, {
      username: "johndoe@gmail.com",
      password: "AA7f526bef140a.."
    });
    client = apolloClient;
    currentUser = rest;
    const seeder = orm.getSeeder();

    console.log(currentUser);

    // Clear the database to start clean
    await orm.getSchemaGenerator().clearDatabase();

    // Create some new data using a seeder
    await seeder.seed(DatabaseSeeder);
  });

  it("create a head office Company", async () => {
    const { currencyByCode } = await client.currencyByCode({
      code: "EUR"
    });

    const input = {
      currencyId: currencyByCode.id,
      abbreviation: "Uber",
      description: "Transports and more...",
      industryCode: "58.2",
      name: "Uber",
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
      isGroup: expect.any(Boolean),
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
  it("create a subsidiary company", async () => {
    const { currencyByCode } = await client.currencyByCode({
      code: "USD"
    });

    const { companies } = await client.companies();

    console.log(companies);
    const input = {
      currencyId: currencyByCode.id,
      headOfficeId: companies[0].id,
      abbreviation: "UE",
      description: "Food, delivery and more...",
      industryCode: "58.2",
      name: "Uber Eats",
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
      isGroup: expect.any(Boolean),
      industryCode: input.industryCode,
      ownerId: currentUser.owner,
      modifiedBy: currentUser.owner,
      description: input.description,
      currency: {
        id: currencyByCode.id
      }
    });
  });

  it("Update a Company", async () => {
    const { companies } = await client.companies();

    const input: UpdateCompanyInput = {
      abbreviation: "MTN",
      description: "Communications and more...",
      id: companies[2].id,
      industryCode: "55",
      name: "MTN Benin",
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
      isGroup: expect.any(Boolean),
      industryCode: input.industryCode,
      ownerId: companies[2].ownerId,
      modifiedBy: currentUser.owner,
      description: input.description!
      // currency: {
      //   id: currencyByCode.id
      // }
    });
  });

  it("Delete a Company", async () => {
    const { companies } = await client.companies();

    const { removeCompany } = await client.removeCompany({
      id: companies[3].id
    });

    expect(removeCompany).toMatchObject<PartialDeep<typeof removeCompany>>({
      isActive: true,
      // headOfficeName: companies[2].headOfficeName,
      status: CommonStatusEnum.ACTIVE,
      name: companies[3].name,
      abbreviation: companies[3].abbreviation,
      isGroup: companies[3].isGroup,
      industryCode: companies[3].industryCode,
      // tenant: null,
      description: companies[3].description,
      currency: companies[3].currency
    });
  });
});

//

describe("Create Company with a new user", () => {
  // let client: GraphqlClient;
  let myOrm: MikroORM<IDatabaseDriver<Connection>>;
  let client: ApolloSdk;
  let currentUser: ICurrentUser;

  beforeAll(async () => {
    // A mettre dans une fonction
    const { orm, apolloClient, rest } = await initApp(configService, {
      username: "pauldoe@gmail.com",
      password: "AA7f526bef140a.."
    });
    client = apolloClient;
    currentUser = rest;
    const seeder = orm.getSeeder();

    console.log("user2: ", currentUser);

    // Clear the database to start clean
    await orm.getSchemaGenerator().clearDatabase();

    // Create some new data using a seeder
    await seeder.seed(DatabaseSeeder);
  });

  it("create a Company Moov", async () => {
    const { currencyByCode } = await client.currencyByCode({
      code: "XOF"
    });

    const { companies } = await client.companies();

    const input = {
      currencyId: currencyByCode.id,
      headOfficeId: companies[2].id,
      abbreviation: "Moov",
      description: "Communications and more...",
      industryCode: "58.2",
      name: "Moov",
      status: CommonStatusEnum.ACTIVE
    };
    const { adminCreateCompany } = await client.adminCreateCompany({
      input
    });

    // console.log(adminCreateCompany);

    expect(adminCreateCompany).toMatchObject<
      PartialDeep<typeof adminCreateCompany>
    >({
      isActive: expect.any(Boolean),
      headOfficeName: companies[2].name,
      status: CommonStatusEnum.ACTIVE,
      name: input.name,
      abbreviation: input.abbreviation,
      isGroup: expect.any(Boolean),
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
  it("create a company under Moov", async () => {
    const { currencyByCode } = await client.currencyByCode({
      code: "XOF"
    });

    // const { companyByName } = await client.companyByName({ name: "Moov" });

    // console.log(companyByName);
    const input = {
      currencyId: currencyByCode.id,
      // headOfficeId: companyByName.id,
      abbreviation: "MGC",
      description: "Games, enjoy and more...",
      industryCode: "58.2",
      name: "Moov Games Center",
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
      // headOfficeName: companyByName.name,
      status: CommonStatusEnum.ACTIVE,
      name: input.name,
      abbreviation: input.abbreviation,
      isGroup: expect.any(Boolean),
      industryCode: input.industryCode,
      ownerId: currentUser.owner,
      modifiedBy: currentUser.owner,
      description: input.description,
      currency: {
        id: currencyByCode.id
      }
    });
  });

  it("Update a Company and his status", async () => {
    const { companies } = await client.companies();

    const input: UpdateCompanyInput = {
      abbreviation: "Humaapi",
      description: "Technologie and more...",
      id: companies[3].id,
      industryCode: "55",
      name: "Humaapi",
      status: CommonStatusEnum.PENDING
    };
    const { updateCompany } = await client.updateCompany({
      input
    });

    expect(updateCompany).toMatchObject<PartialDeep<typeof updateCompany>>({
      isActive: expect.any(Boolean),
      // headOfficeName: companies[3].name,
      status: input.status,
      name: input.name,
      abbreviation: input.abbreviation,
      isGroup: expect.any(Boolean),
      industryCode: input.industryCode,
      ownerId: companies[3].ownerId,
      modifiedBy: currentUser.owner,
      description: input.description!
      // currency: {
      //   id: currencyByCode.id
      // }
    });

    // });

    // it("Delete a Company", async () => {
    //   const { companies } = await client.companies();

    //   const { removeCompany } = await client.removeCompany({
    //     id: companies[3].id
    //   });

    //   expect(removeCompany).toMatchObject<PartialDeep<typeof removeCompany>>({
    //     isActive: true,
    //     // headOfficeName: companies[2].headOfficeName,
    //     status: CommonStatusEnum.ACTIVE,
    //     name: companies[3].name,
    //     abbreviation: companies[3].abbreviation,
    //     isGroup: companies[3].isGroup,
    //     industryCode: companies[3].industryCode,
    //     // tenant: null,
    //     description: companies[3].description,
    //     currency: companies[3].currency
    //   });
  });
});

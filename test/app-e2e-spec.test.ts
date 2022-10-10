import { INestApplication } from "@nestjs/common";
import { sessionFactory } from "./services";
import { GraphqlClient } from "./services/graphql-client";
import { ApolloSdk, createTestingModule, errorResponse } from "./utils";

describe("GraphQL AppResolver (e2e)", () => {
  let app: INestApplication;
  // let client: GraphqlClient;
  let client: ApolloSdk;

  beforeAll(async () => {
    const { nestApp, url } = await createTestingModule();

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

  afterAll(async () => {
    await app.close();
  });

  // eslint-disable-next-line arrow-body-style
  it("/ test", async () => {
    try {
      // const res = await client.asyncQueryGet({
      //   id: "879aba11-5d74-48a1-bed9-ca8e880113e2",
      //   inputgql: `#graphql
      // query Company($id: UUID!) {
      //   company(id: $id) {
      //     id
      //     createdAt
      //     updatedAt
      //     isActive
      //     status
      //     name
      //     abbreviation
      //     isGroup
      //     industryCode
      //     description
      //     headOfficeName
      //     currency {
      //       id
      //       createdAt
      //       updatedAt
      //       isActive
      //       code
      //       name
      //       symbol
      //       fractionUnit
      //       fraction
      //       format
      //     }
      //   }
      // }
      // `
      // });

      const { company } = await client.company({
        id: "879aba11-5d74-48a1-bed9-ca8e880113e2"
      });

      console.log(company);

      expect(company).toBeTruthy();
    } catch (error) {
      errorResponse(error);
    }
  });
});

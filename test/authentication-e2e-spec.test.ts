/* eslint-disable no-plusplus */
import { INestApplication } from "@nestjs/common";
import fetch from "cross-fetch";
import { CognitoUserStatusEnum } from "./API";
import { sessionFactory, authService } from "./services";
import {
  ApolloSdk,
  createTestingModule,
  errorResponse,
  HMAuthSDK
} from "./utils";

describe("Authentification Controller with user status = (FORCE_CHANGE_PASSWORD) (e2e)", () => {
  let app: INestApplication;
  // let client: GraphqlClient;
  let authClient: HMAuthSDK;
  let client: ApolloSdk;
  let username: string;
  let password: string;

  beforeAll(async () => {
    const { nestApp, url } = await createTestingModule();
    app = nestApp;
    authClient = authService({ url, fetch });
    username = "maeke@humaapi.com";
    password = "Azerty123..";
    client = await sessionFactory({
      url,
      authParams: {
        username: "kenagbad@live.fr",
        password: "AKinnoth99.#"
      }
    });
  });

  beforeAll(async () => {
    const createUser = async () => {
      const input: Parameters<typeof client.adminCreateUser>["0"]["input"] = {
        username,
        temporaryPassword: password,
        sendPassword: false,
        attributes: [
          {
            name: "email",
            value: username,
            isVerified: true
          },
          {
            name: "custom:tenantId",
            value: "659153d0-6a11-48d7-ab6b-3183247bc1fd"
          }
        ]
      };
      await client.adminCreateUser({ input });
    };

    try {
      const { adminGetUser } = await client.adminGetUser({ username });

      await client.adminDeleteUser({ username });

      await createUser();
    } catch (error) {
      const { message } = error;
      switch (message) {
        case "User does not exist.":
          await createUser();
          break;
        case "Unauthorized":
          console.log("Unauthorized");
          process.exit(1);
          break;
        default:
          console.log(JSON.stringify(error));
          break;
      }
    }
  });

  afterAll(async () => {
    await app.close();
    // await client.adminDeleteUser({ username });
  });

  // eslint-disable-next-line arrow-body-style
  it("should ask 'new password required' for a user", async () => {
    const { adminGetUser } = await client.adminGetUser({ username });
    expect(adminGetUser).toMatchObject<Partial<typeof adminGetUser>>({
      userStatus: CognitoUserStatusEnum.FORCE_CHANGE_PASSWORD
    });

    const res = await authClient.signIn({
      username,
      password
    });

    expect(res).toMatchObject<NonNullable<typeof res>>({
      challengeName: "NEW_PASSWORD_REQUIRED",
      session: expect.any(String)
    });
  });

  it("should let user change his password based on 'new password required", async () => {
    const { adminGetUser } = await client.adminGetUser({ username });

    expect(adminGetUser).toMatchObject<Partial<typeof adminGetUser>>({
      userStatus: CognitoUserStatusEnum.FORCE_CHANGE_PASSWORD
    });

    const res = await authClient.newPasswordRequired({
      username,
      newPassword: password
    });

    expect(res).toMatchObject<NonNullable<typeof res>>({
      authenticationResult: {
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
        accessTokenExpiresIn: expect.any(Number),
        tokenType: expect.any(String)
      }
    });

    // expect(res).toMatchObject<typeof res>({
    //   challengeName: "NEW_PASSWORD_REQUIRED",
    //   session: expect.any(String)
    // });
  });

  // it("should let user change password", async () => {
  //   const res = await authClient.forgotPassword(username);

  //   expect(res).toMatchObject<typeof res>({
  //     attributeName: expect.any(String),
  //     deliveryMedium: expect.any(String),
  //     destination: expect.any(String)
  //   });
  // });

  // it("should let a new user sign out", async () => {
  //   const res = await authClient.signOut();

  //   expect(res).toEqual(true);
  // });
});

describe("Authentification Controller with user status = (CONFIRMED) (e2e)", () => {
  let app: INestApplication;
  // let client: GraphqlClient;
  let authClient: HMAuthSDK;
  let client: ApolloSdk;
  let username: string;
  let password: string;

  beforeAll(async () => {
    const { nestApp, url } = await createTestingModule();
    app = nestApp;
    authClient = authService({ url, fetch });
    username = "maeke@humaapi.com";
    password = "Azerty123..";
    client = await sessionFactory({
      url,
      authParams: {
        username: "kenagbad@live.fr",
        password: "AKinnoth99.#"
      }
    });
  });

  beforeAll(async () => {
    const createUser = async () => {
      const input: Parameters<typeof client.adminCreateUser>["0"]["input"] = {
        username,
        temporaryPassword: password,
        sendPassword: false,
        permanent: true,
        attributes: [
          {
            name: "email",
            value: username,
            isVerified: true
          },
          {
            name: "custom:tenantId",
            value: "659153d0-6a11-48d7-ab6b-3183247bc1fd"
          }
        ]
      };
      await client.adminCreateUser({ input });
    };

    try {
      const { adminGetUser } = await client.adminGetUser({ username });

      await client.adminDeleteUser({ username });

      await createUser();
    } catch (error) {
      const { message } = error;
      switch (message) {
        case "User does not exist.":
          await createUser();
          break;
        case "Unauthorized":
          console.log("Unauthorized");
          process.exit(1);
          break;
        default:
          console.log(JSON.stringify(error));
          break;
      }
    }
  });

  afterAll(async () => {
    await app.close();
    // await client.adminDeleteUser({ username });
  });

  // eslint-disable-next-line arrow-body-style

  it("should let an existing user to sign in ( login )", async () => {
    const { adminGetUser } = await client.adminGetUser({ username });

    expect(adminGetUser).toMatchObject<Partial<typeof adminGetUser>>({
      userStatus: CognitoUserStatusEnum.CONFIRMED
    });

    const res = await authClient.signIn({
      username,
      password
    });

    expect(res).toMatchObject<NonNullable<typeof res>>({
      authenticationResult: {
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
        accessTokenExpiresIn: expect.any(Number),
        tokenType: expect.any(String)
      }
    });
  });

  it("should let user change password", async () => {
    const res = await authClient.forgotPassword(username);

    expect(res).toMatchObject<NonNullable<typeof res>>({
      attributeName: expect.any(String),
      deliveryMedium: expect.any(String),
      destination: expect.any(String)
    });
  });

  it("should let a user refresh the access token", async () => {
    const res = await authClient.refreshToken();

    expect(res).toMatchObject({
      accessToken: expect.any(String),
      accessTokenExpiresIn: expect.any(Number),
      tokenType: expect.any(String)
    });
  });

  // it("should let a user sign out", async () => {
  //   const res = await authClient.signOut();

  //   expect(res).toEqual(true);
  // });
});

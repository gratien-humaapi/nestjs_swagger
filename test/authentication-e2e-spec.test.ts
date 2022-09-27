import { INestApplication } from "@nestjs/common";
import fetch from "cross-fetch";
import { sessionFactory, authService } from "./services";
import {
  ApolloSdk,
  createTestingModule,
  errorResponse,
  HMAuthSDK,
  StatusConfirmation
} from "./utils";

describe("Authentification Controller (e2e)", () => {
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
    username = "monmail@mail.com";
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
  });

  // eslint-disable-next-line arrow-body-style
  it("should ask for NEW_PASSWORD_REQUIRED ", async () => {
    const res = await authClient.signIn({
      username,
      password
    });
    // console.log(res);

    expect(res).toMatchObject<typeof res>({
      challengeName: "NEW_PASSWORD_REQUIRED",
      session: expect.any(String)
    });
  });

  it("should let user change the password", async () => {
    const res = await authClient.newPasswordRequired({
      username,
      newPassword: password
    });

    expect(res).toMatchObject<typeof res>({
      authenticationResult: {
        accessToken: expect.any(String),
        expiresIn: expect.any(Number),
        refreshToken: expect.any(String)
      }
    });

    // expect(res).toMatchObject<typeof res>({
    //   challengeName: "NEW_PASSWORD_REQUIRED",
    //   session: expect.any(String)
    // });
  });

  // it("/ authentication of user with confirmation_status ='confirmed' ", async () => {
  //   const { authenticationResult } = await authClient.signIn({
  //     username: "test@mail.com",
  //     password: "AA7f526bef140a.."
  //   });

  //   expect(authenticationResult).toMatchObject({
  //     idToken: expect.any(String),
  //     refreshToken: expect.any(String),
  //     tokenType: "Bearer"
  //   });
  // });

  // it("/ authentication of user with confirmation_status ='NEW_PASSWORD_REQUIRED' ", async () => {
  //   const res = await authClient.signIn({
  //     username: "admins@mail.com",
  //     password: "Azerty123.."
  //   });
  //   expect(res).toMatchObject({
  //     challengeName: StatusConfirmation.NEW_PASSWORD_REQUIRED,
  //     session: expect.any(String)
  //   });
  // });

  // it("/ change password in newPasswordRequired flow ", async () => {
  //   const res = await authClient.signIn({
  //     username: "admins@mail.com",
  //     password: "Azerty123.."
  //   });
  //   expect(res).toMatchObject({
  //     challengeName: StatusConfirmation.NEW_PASSWORD_REQUIRED,
  //     session: expect.any(String)
  //   });
  // });
});

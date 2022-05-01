import { CognitoIdentityProvider } from "@aws-sdk/client-cognito-identity-provider";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { errorResponse, response } from "src/common";
import camelcaseKeys from "camelcase-keys";
import { createHmac } from "crypto";
// eslint-disable-next-line import/no-cycle
import { AuthClientErrorType } from "../../helpers";

import { ICognitoConfig } from "../../cognito.config";
import { ICognitoService } from "./types";

const camelCase = <T>(data: T) => camelcaseKeys(data, { deep: true });

@Injectable()
export class CognitoService {
  private _client: CognitoIdentityProvider;
  private _userPoolID: string;
  private _clientId: string;
  private _clientSecret: string;
  constructor(private configService: ConfigService) {
    const cognitoConfig =
      this.configService.get<ICognitoConfig>("cognitoConfig");
    if (!cognitoConfig) {
      throw new Error("auth config not initialized");
    }
    const { region, userPoolId, clientId, clientSecret } = cognitoConfig;
    this._client = new CognitoIdentityProvider({
      region
    });
    this._userPoolID = userPoolId;
    this._clientId = clientId;
    this._clientSecret = clientSecret;
  }
  /**
   *  @see https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_AdminInitiateAuth.html
   *  @see https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-authentication-flow.html#amazon-cognito-user-pools-admin-authentication-flow
   */
  login = async (params: ICognitoService["login"]) => {
    const {
      authParameters: { username, password }
    } = params;
    try {
      const cognitoParams = {
        UserPoolId: this._userPoolID,
        ClientId: this._clientId,
        AuthFlow: "ADMIN_USER_PASSWORD_AUTH",
        AuthParameters: {
          USERNAME: username,
          PASSWORD: password,
          SECRET_HASH: this._hashSecret(
            username,
            this._clientId,
            this._clientSecret
          )
        }
      };
      const { $metadata, ...rest } = await this._client.adminInitiateAuth(
        cognitoParams
      );

      const resCamelCase = camelCase({
        ...rest
      });
      console.log(resCamelCase);

      const data = { ...resCamelCase };
      return response(data);
    } catch (err) {
      return errorResponse(<AuthClientErrorType>err);
    }
  };

  private _hashSecret = (
    username: string,
    clientId: string,
    clientSecret: string
  ): string =>
    createHmac("sha256", clientSecret)
      .update(username + clientId)
      .digest("base64");
}

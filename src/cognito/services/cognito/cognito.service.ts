/* eslint-disable import/no-cycle */
import { CognitoIdentityProvider } from "@aws-sdk/client-cognito-identity-provider";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import camelcaseKeys from "camelcase-keys";
import { createHmac } from "crypto";
import { errorResponse, response } from "src/common";
// eslint-disable-next-line import/no-cycle
import { ICurrentUser } from "src/authentification";
import { CognitoErrorType } from "../../helpers";

import { ICognitoConfig } from "../../cognito.config";
import { ICognitoService } from "./types";

const camelCase = <T extends Record<string, any> | T[]>(data: T) =>
  camelcaseKeys(data, { deep: true });

@Injectable()
export class CognitoService {
  private _client: CognitoIdentityProvider;
  private _userPoolID: string;
  public clientId: string;
  private _clientSecret: string;
  public authority: string;
  public currentUser: ICurrentUser;
  constructor(private configService: ConfigService) {
    const cognitoConfig =
      this.configService.get<ICognitoConfig>("cognitoConfig");
    if (!cognitoConfig) {
      throw new Error("auth config not initialized");
    }
    const { region, userPoolId, clientId, clientSecret, authority } =
      cognitoConfig;
    this._client = new CognitoIdentityProvider({
      region
    });
    this._userPoolID = userPoolId;
    this.clientId = clientId;
    this._clientSecret = clientSecret;
    this.authority = authority;
  }
  /**
   *  @see https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_AdminInitiateAuth.html
   *  @see https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-authentication-flow.html#amazon-cognito-user-pools-admin-authentication-flow
   */
  signIn = async (params: ICognitoService["signIn"]) => {
    const { username, password } = params;
    try {
      const cognitoParams = {
        UserPoolId: this._userPoolID,
        ClientId: this.clientId,
        AuthFlow: "ADMIN_USER_PASSWORD_AUTH",
        AuthParameters: {
          USERNAME: username,
          PASSWORD: password,
          SECRET_HASH: this._hashSecret({
            username,
            clientId: this.clientId,
            clientSecret: this._clientSecret
          })
        }
      };
      const { $metadata, ...rest } = await this._client.adminInitiateAuth(
        cognitoParams
      );

      const { authenticationResult, ...resCamelCase } = camelCase({
        ...rest
      });

      const data = {
        ...resCamelCase,
        authenticationResult: {
          accessToken: authenticationResult?.idToken,
          accessTokenExpiresIn: authenticationResult?.expiresIn,
          tokenType: authenticationResult?.tokenType,
          refreshToken: authenticationResult?.refreshToken
        }
      };
      return response(data);
    } catch (err) {
      return errorResponse(<CognitoErrorType>err);
    }
  };
  newPasswordRequired = async (
    params: ICognitoService["newPasswordRequired"]
  ) => {
    const { username, session, newPassword } = params;
    try {
      const cognitoParams = {
        UserPoolId: this._userPoolID,
        ClientId: this.clientId,
        ChallengeName: "NEW_PASSWORD_REQUIRED",
        Session: session,
        ChallengeResponses: {
          USERNAME: username,
          NEW_PASSWORD: newPassword,
          SECRET_HASH: this._hashSecret({
            username,
            clientId: this.clientId,
            clientSecret: this._clientSecret
          })
        }
      };
      const { $metadata, ...rest } =
        await this._client.adminRespondToAuthChallenge(cognitoParams);

      const { authenticationResult, ...resCamelCase } = camelCase({
        ...rest
      });
      const data = {
        ...resCamelCase,
        authenticationResult: {
          accessToken: authenticationResult?.idToken,
          accessTokenExpiresIn: authenticationResult?.expiresIn,
          tokenType: authenticationResult?.tokenType,
          refreshToken: authenticationResult?.refreshToken
        }
      };

      return response(data);
    } catch (err) {
      return errorResponse(<CognitoErrorType>err);
    }
  };

  globalSignOut = async (accessToken: string) => {
    const accessTokenWithoutBearer = accessToken.replace("Bearer", "").trim();
    try {
      const cognitoParams = {
        AccessToken: accessTokenWithoutBearer
      };
      await this._client.globalSignOut(cognitoParams);
      const data = { done: true };
      return response(data);
    } catch (err) {
      return errorResponse(<CognitoErrorType>err);
    }
  };

  forgotPassword = async (username: string) => {
    try {
      const cognitoParams = {
        ClientId: this.clientId,
        Username: username,
        SecretHash: this._hashSecret({
          username,
          clientId: this.clientId,
          clientSecret: this._clientSecret
        })
      };
      const { $metadata, ...rest } = await this._client.forgotPassword(
        cognitoParams
      );
      const resCamelCase = camelCase({
        ...rest
      });
      const { codeDeliveryDetails } = resCamelCase;
      const data = { ...codeDeliveryDetails };
      return response(data);
    } catch (err) {
      return errorResponse(<CognitoErrorType>err);
    }
  };

  confirmForgotPassword = async (
    params: ICognitoService["confirmForgotPassword"]
  ) => {
    const { username, confirmationCode, newPassword } = params;

    try {
      const cognitoParams = {
        ClientId: this.clientId,
        Username: username,
        Password: newPassword,
        ConfirmationCode: confirmationCode,
        SecretHash: this._hashSecret({
          username,
          clientId: this.clientId,
          clientSecret: this._clientSecret
        })
      };
      await this._client.confirmForgotPassword(cognitoParams);
      const data = { done: true };
      return response(data);
    } catch (err) {
      return errorResponse(<CognitoErrorType>err);
    }
  };

  revokeRefreshToken = async (refreshToken: string) => {
    try {
      const cognitoParams = {
        Token: refreshToken,
        ClientId: this.clientId,
        ClientSecret: this._clientSecret
      };
      await this._client.revokeToken(cognitoParams);
      const data = { done: true };
      // const data = { done: false };
      return response(data);
    } catch (err) {
      return errorResponse(<CognitoErrorType>err);
    }
  };

  refreshAccessAndIDToken = async (
    params: ICognitoService["refreshAccessAndIDToken"]
  ) => {
    const { sub, refreshToken } = params;
    try {
      const cognitoParams = {
        UserPoolId: this._userPoolID,
        ClientId: this.clientId,
        AuthFlow: "REFRESH_TOKEN_AUTH",
        AuthParameters: {
          REFRESH_TOKEN: refreshToken,
          SECRET_HASH: this._hashSecret({
            username: sub,
            clientId: this.clientId,
            clientSecret: this._clientSecret
          })
        }
      };
      const { $metadata, ...rest } = await this._client.adminInitiateAuth(
        cognitoParams
      );

      const resCamelCase = camelCase({
        ...rest
      });
      const { authenticationResult } = resCamelCase;
      const data = {
        accessToken: authenticationResult?.idToken,
        accessTokenExpiresIn: authenticationResult?.expiresIn,
        tokenType: authenticationResult?.tokenType
      };

      return response(data);
    } catch (err) {
      return errorResponse(<CognitoErrorType>err);
    }
  };

  getUserAttributeVerificationCode = async (
    params: ICognitoService["getUserAttributeVerificationCode"]
  ) => {
    const { accessToken, attributeName } = params;
    const accessTokenWithoutBearer = accessToken.replace("Bearer", "").trim();
    try {
      const cognitoParams = {
        AccessToken: accessTokenWithoutBearer,
        AttributeName: attributeName
      };
      const { $metadata, ...rest } =
        await this._client.getUserAttributeVerificationCode(cognitoParams);
      const resCamelCase = camelCase({
        ...rest
      });
      const { codeDeliveryDetails } = resCamelCase;
      const data = { ...codeDeliveryDetails };
      return response(data);
    } catch (err) {
      return errorResponse(<CognitoErrorType>err);
    }
  };

  verifyUserAttribute = async (
    params: ICognitoService["verifyUserAttribute"]
  ) => {
    const { accessToken, code, attributeName } = params;
    const accessTokenWithoutBearer = accessToken.replace("Bearer", "").trim();
    try {
      const cognitoParams = {
        AccessToken: accessTokenWithoutBearer,
        AttributeName: attributeName,
        Code: code
      };
      await this._client.verifyUserAttribute(cognitoParams);
      const data = { done: true };
      return response(data);
    } catch (err) {
      return errorResponse(<CognitoErrorType>err);
    }
  };

  private _hashSecret = (params: ICognitoService["_hashSecret"]) => {
    const { username, clientId, clientSecret } = params;
    return createHmac("sha256", clientSecret)
      .update(username + clientId)
      .digest("base64");
  };
}

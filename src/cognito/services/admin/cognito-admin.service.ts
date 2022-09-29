/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {
  CognitoIdentityProvider,
  ExplicitAuthFlowsType,
  TimeUnitsType
} from "@aws-sdk/client-cognito-identity-provider";

import camelcaseKeys from "camelcase-keys";
import { DeepNonNullable, errorResponse, response } from "src/common";

import { CognitoUserStatusEnum } from "src/cognito";
// eslint-disable-next-line import/no-cycle
import {
  attributesToCognitoFormat,
  attributesToStandard,
  CognitoErrorType
} from "../../helpers";
import { IAdminService } from "./types";
import { ICognitoConfig } from "../../cognito.config";

const camelCase = <T extends Record<string, any> | T[]>(data: T) =>
  camelcaseKeys(data, { deep: true });

@Injectable()
export class CognitoAdminService {
  private _client: CognitoIdentityProvider;
  private _userPoolID: string;
  private _clientId: string;

  constructor(private configService: ConfigService) {
    const cognitoConfig =
      this.configService.get<ICognitoConfig>("cognitoConfig");
    if (!cognitoConfig) {
      throw new Error("auth config not initialized");
    }
    const { region, userPoolId, clientId } = cognitoConfig;
    this._client = new CognitoIdentityProvider({
      region
    });
    this._userPoolID = userPoolId;
    this._clientId = clientId;
  }

  adminCreateUser = async (params: IAdminService["adminCreateUserParams"]) => {
    const cognitoParams = {
      UserPoolId: this._userPoolID,
      Username: params.username, // if email set UserAttributes
      UserAttributes: attributesToCognitoFormat(params.attributes),
      MessageAction: params.sendPassword ? undefined : "SUPPRESS",
      TemporaryPassword: params.temporaryPassword
    };
    try {
      const { $metadata, ...rest } = await this._client.adminCreateUser(
        cognitoParams
      );
      const authUserData = rest.User as NonNullable<
        DeepNonNullable<typeof rest.User>
      >;

      const {
        MFAOptions,
        UserCreateDate,
        UserLastModifiedDate,
        Attributes,
        UserStatus,
        ...Other
      } = authUserData;
      const attributes = attributesToStandard(Attributes!);
      const userStatus = UserStatus as CognitoUserStatusEnum;
      const other = camelCase({
        attributes,
        userStatus,
        userCreateDate: new Date(),
        userLastModifiedDate: new Date(),
        ...Other
      });
      const data = { ...(other as DeepNonNullable<typeof other>) };

      return response(data);
    } catch (err) {
      return errorResponse(<CognitoErrorType>err);
    }
  };

  adminDeleteUser = async (params: IAdminService["adminDeleteUserParams"]) => {
    const cognitoParams = {
      UserPoolId: this._userPoolID,
      Username: params.username
    };
    try {
      const { $metadata, ...rest } = await this._client.adminDeleteUser(
        cognitoParams
      );
      const data = { done: true };
      return response(data);
    } catch (err) {
      return errorResponse(<CognitoErrorType>err);
    }
  };

  adminGetUser = async (params: IAdminService["adminGetUserParams"]) => {
    const cognitoParams = {
      UserPoolId: this._userPoolID,
      Username: params.username
    };
    try {
      const {
        $metadata,
        UserAttributes,
        MFAOptions,
        PreferredMfaSetting,
        UserMFASettingList,
        ...rest
      } = await this._client.adminGetUser(cognitoParams);
      const nonNullData = rest as NonNullable<DeepNonNullable<typeof rest>>;
      const camelCaseData = camelCase(nonNullData);
      const newUserAttributes = UserAttributes! as NonNullable<
        DeepNonNullable<typeof UserAttributes>
      >;

      const attributes = attributesToStandard(newUserAttributes);
      const username = attributes.find(({ name }) => name === "email")?.value;
      const data = {
        ...camelCaseData,
        attributes,
        username
      };
      return response(data);
    } catch (err) {
      return errorResponse(<CognitoErrorType>err);
    }
  };

  adminConfirmSignUp = async (
    params: IAdminService["adminConfirmSignUpParams"]
  ) => {
    const cognitoParams = {
      UserPoolId: this._userPoolID,
      Username: params.username
    };
    try {
      const { $metadata, ...rest } = await this._client.adminConfirmSignUp(
        cognitoParams
      );
      const data = { done: true };
      return response(data);
    } catch (err) {
      return errorResponse(<CognitoErrorType>err);
    }
  };

  adminAddUsertoGroup = async (
    params: IAdminService["adminAddUsertoGroupParams"]
  ) => {
    try {
      const cognitoParams = {
        UserPoolId: this._userPoolID,
        Username: params.username,
        GroupName: params.groupName
      };
      // this request don't send back a payload
      await this._client.adminAddUserToGroup(cognitoParams);
      const data = { done: true };
      return response(data);
    } catch (err) {
      return errorResponse(<CognitoErrorType>err);
    }
  };

  adminRemoveUserFromGroup = async (
    params: IAdminService["adminRemoveUserFromGroupParams"]
  ) => {
    try {
      const cognitoParams = {
        UserPoolId: this._userPoolID,
        Username: params.username,
        GroupName: params.groupName
      };
      // this request don't send back a payload
      await this._client.adminRemoveUserFromGroup(cognitoParams);
      const data = { done: true };
      return response(data);
    } catch (err) {
      return errorResponse(<CognitoErrorType>err);
    }
  };

  adminListGroupsForUser = async (
    params: IAdminService["adminListGroupsForUserParams"]
  ) => {
    try {
      const cognitoParams = {
        UserPoolId: this._userPoolID,
        Username: params.username,
        Limit: undefined, // Todo add mechanism
        NextToken: undefined // Todo add mechanism
      };
      // this request don't send back a payload
      const { $metadata, ...rest } = await this._client.adminListGroupsForUser(
        cognitoParams
      );
      const resCamelCase = camelCase({
        ...rest
      });
      const { groups, nextToken } = resCamelCase;
      let normalizedGroupsRes: string[] = [];
      if (groups) {
        normalizedGroupsRes = groups.map((value) => value.groupName as string);
      }
      const newRes = { groups: normalizedGroupsRes, nextToken };
      const data = { ...newRes };
      return response(data);
    } catch (err) {
      return errorResponse(<CognitoErrorType>err);
    }
  };

  adminEnableUser = async (params: IAdminService["adminEnableUserParams"]) => {
    const { username } = params;
    try {
      const cognitoParams = {
        UserPoolId: this._userPoolID,
        Username: username
      };
      // this request don't send back a payload
      await this._client.adminEnableUser(cognitoParams);
      const data = { done: true };
      return response(data);
    } catch (err) {
      return errorResponse(<CognitoErrorType>err);
    }
  };

  adminDisableUser = async (
    params: IAdminService["adminDisableUserParams"]
  ) => {
    try {
      const cognitoParams = {
        UserPoolId: this._userPoolID,
        Username: params.username
      };
      // this request don't send back a payload
      await this._client.adminDisableUser(cognitoParams);
      const data = { done: true };
      return response(data);
    } catch (err) {
      return errorResponse(<CognitoErrorType>err);
    }
  };

  adminResetUserPassword = async (
    params: IAdminService["adminResetUserPasswordParams"]
  ) => {
    try {
      const cognitoParams = {
        UserPoolId: this._userPoolID,
        Username: params.username
      };
      // this request don't send back a payload
      const { $metadata, ...rest } = await this._client.adminResetUserPassword(
        cognitoParams
      );
      console.log("reset", rest);

      const data = { done: true };
      return response(data);
    } catch (err) {
      return errorResponse(<CognitoErrorType>err);
    }
  };

  adminSetUserPassword = async (
    params: IAdminService["adminSetUserPasswordParams"]
  ) => {
    try {
      const cognitoParams = {
        UserPoolId: this._userPoolID,
        Username: params.username,
        Password: params.password,
        Permanent: params.permanent
      };
      // this request don't send back a payload
      await this._client.adminSetUserPassword(cognitoParams);
      const data = { done: true };
      return response(data);
    } catch (err) {
      return errorResponse(<CognitoErrorType>err);
    }
  };

  adminUpdateTokensExpireIn = async (
    params: IAdminService["adminUpdateTokensExpireIn"]
  ) => {
    const { refreshTokenValidity, accessTokenValidity } = params;
    try {
      const cognitoParams: Parameters<
        typeof this._client.updateUserPoolClient
      >["0"] = {
        UserPoolId: this._userPoolID,
        ClientId: this._clientId,
        RefreshTokenValidity: refreshTokenValidity,
        AccessTokenValidity: accessTokenValidity,
        IdTokenValidity: accessTokenValidity,
        ExplicitAuthFlows: [
          ExplicitAuthFlowsType.ALLOW_ADMIN_USER_PASSWORD_AUTH,
          ExplicitAuthFlowsType.ALLOW_CUSTOM_AUTH,
          ExplicitAuthFlowsType.ALLOW_USER_SRP_AUTH,
          ExplicitAuthFlowsType.ALLOW_REFRESH_TOKEN_AUTH
        ],
        TokenValidityUnits: {
          RefreshToken: TimeUnitsType.MINUTES,
          AccessToken: TimeUnitsType.MINUTES,
          IdToken: TimeUnitsType.MINUTES
        }
      };
      await this._client.updateUserPoolClient(cognitoParams);
      const data = { done: true };
      return response(data);
    } catch (err) {
      return errorResponse(<CognitoErrorType>err);
    }
  };

  /**
   *  Update user attributes In addition to updating user attributes,
   * this API can also be used to mark phone email as verified
   */
  adminUpdateUserAttributes = async (
    params: IAdminService["adminUpdateUserAttributesParams"]
  ) => {
    try {
      const cognitoParams = {
        UserPoolId: this._userPoolID,
        Username: params.username,
        UserAttributes: attributesToCognitoFormat(params.attributes)
      };
      // this request don't send back a payload
      await this._client.adminUpdateUserAttributes(cognitoParams);
      const data = { done: true };
      return response(data);
    } catch (err) {
      return errorResponse(<CognitoErrorType>err);
    }
  };
}

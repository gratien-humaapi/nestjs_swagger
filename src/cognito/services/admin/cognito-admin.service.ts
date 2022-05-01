/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CognitoIdentityProvider } from "@aws-sdk/client-cognito-identity-provider";
import { errorResponse, response } from "src/common/utils";
import camelcaseKeys from "camelcase-keys";
import { DeepNonNullable } from "src/common";
// eslint-disable-next-line import/no-cycle
import {
  attributesToCognitoFormat,
  attributesToStandard,
  AuthClientErrorType
} from "../../helpers";
import { IAdminService, UserStatusEnum } from "./types";
import { ICognitoConfig } from "../../cognito.config";

const camelCase = <T>(data: T) => camelcaseKeys(data, { deep: true });

@Injectable()
export class CognitoAdminService {
  private _client: CognitoIdentityProvider;
  private _userPoolID: string;
  constructor(private configService: ConfigService) {
    const cognitoConfig =
      this.configService.get<ICognitoConfig>("cognitoConfig");
    if (!cognitoConfig) {
      throw new Error("auth config not initialized");
    }
    const { region, userPoolId } = cognitoConfig;
    this._client = new CognitoIdentityProvider({
      region
    });
    this._userPoolID = userPoolId;
  }

  adminCreateUser = async (params: IAdminService["adminCreateUserParams"]) => {
    const cognitoParams = {
      UserPoolId: this._userPoolID,
      Username: params.username, // if email set UserAttributes
      UserAttributes: attributesToCognitoFormat(params.attributes),
      MessageAction: params.messageAction,
      TemporaryPassword: params.temporaryPassword
    };
    console.log("marche");
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
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      console.log(Attributes);
      const attributes = attributesToStandard(Attributes!);
      const userStatus = UserStatus as UserStatusEnum;
      const other = camelCase({
        attributes,
        userStatus,
        ...Other
      });
      const data = { ...(other as DeepNonNullable<typeof other>) };
      console.log("marche");

      return response(data);
    } catch (err) {
      return errorResponse(<AuthClientErrorType>err);
    }
  };

  adminDeleteUser = async (params: IAdminService["adminDeleteUserParams"]) => {
    const cognitoParams = {
      UserPoolId: this._userPoolID,
      Username: params.username
    };
    console.log("marche");
    try {
      const { $metadata, ...rest } = await this._client.adminDeleteUser(
        cognitoParams
      );
      const data = { done: true };
      console.log("marche");

      return response(data);
    } catch (err) {
      return errorResponse(<AuthClientErrorType>err);
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
      return errorResponse(<AuthClientErrorType>err);
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
      return errorResponse(<AuthClientErrorType>err);
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
      return errorResponse(<AuthClientErrorType>err);
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
      return errorResponse(<AuthClientErrorType>err);
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
      return errorResponse(<AuthClientErrorType>err);
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
      return errorResponse(<AuthClientErrorType>err);
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
      return errorResponse(<AuthClientErrorType>err);
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
      return errorResponse(<AuthClientErrorType>err);
    }
  };
}

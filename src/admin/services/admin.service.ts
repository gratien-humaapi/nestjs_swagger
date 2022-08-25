import { Injectable } from "@nestjs/common";
import {
  AuthClientError,
  CognitoAdminService,
  IAdminService
} from "src/cognito";

import { isResolved } from "src/common";

@Injectable()
export class AdminService {
  constructor(private _cognitoAdminService: CognitoAdminService) {}

  adminEnableUser = async (params: IAdminService["adminEnableUserParams"]) => {
    const { username } = params;
    const res = await this._cognitoAdminService.adminEnableUser({ username });
    if (!isResolved(res)) {
      const { error } = res;
      throw new AuthClientError(error);
    }

    return res.data;
  };

  adminDisableUser = async (
    params: IAdminService["adminDisableUserParams"]
  ) => {
    const { username } = params;
    const res = await this._cognitoAdminService.adminDisableUser({ username });
    if (!isResolved(res)) {
      const { error } = res;
      throw new AuthClientError(error);
    }

    return res.data;
  };

  adminUpdateTokensExpireIn = async (
    params: IAdminService["adminUpdateTokensExpireIn"]
  ) => {
    const res = await this._cognitoAdminService.adminUpdateTokensExpireIn(
      params
    );
    if (!isResolved(res)) {
      const { error } = res;
      throw new AuthClientError(error);
    }

    return res.data;
  };

  adminCreateUser = async (params: IAdminService["adminCreateUserParams"]) => {
    const res = await this._cognitoAdminService.adminCreateUser(params);
    if (!isResolved(res)) {
      const { error } = res;
      throw new AuthClientError(error);
    }
    return res.data;
  };
}

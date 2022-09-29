/* eslint-disable arrow-body-style */
import { Injectable } from "@nestjs/common";
import { CognitoError, CognitoAdminService, IAdminService } from "src/cognito";

import { isResolved } from "src/common";
import { CompanyService, CreateCompanyInput } from "src/company";
import { AdminCreateUserInput } from "../dto";

@Injectable()
export class AdminService {
  constructor(
    private _cognitoAdminService: CognitoAdminService,
    private _companyService: CompanyService
  ) {}

  adminCreateCompany = async (input: CreateCompanyInput) => {
    return this._companyService.create(input);
  };

  adminCreateUser = async (params: AdminCreateUserInput) => {
    const { temporaryPassword, permanent, username } = params;
    const res = await this._cognitoAdminService.adminCreateUser(params);
    if (!isResolved(res)) {
      const { error } = res;
      throw new CognitoError(error);
    }

    if (params.permanent) {
      await this.adminSetUserPassword({
        password: temporaryPassword,
        permanent,
        username
      });
    }
    return res.data;
  };

  adminSetUserPassword = async (
    params: IAdminService["adminSetUserPasswordParams"]
  ) => {
    const res = await this._cognitoAdminService.adminSetUserPassword(params);
    if (!isResolved(res)) {
      const { error } = res;
      throw new CognitoError(error);
    }
    return res.data;
  };

  adminDeleteUser = async (params: IAdminService["adminDeleteUserParams"]) => {
    const res = await this._cognitoAdminService.adminDeleteUser(params);
    if (!isResolved(res)) {
      const { error } = res;
      throw new CognitoError(error);
    }
    return res.data;
  };

  adminConfirmSignUp = async (
    params: IAdminService["adminConfirmSignUpParams"]
  ) => {
    const res = await this._cognitoAdminService.adminConfirmSignUp(params);
    if (!isResolved(res)) {
      const { error } = res;
      throw new CognitoError(error);
    }
    return res.data;
  };

  adminGetUser = async (params: IAdminService["adminGetUserParams"]) => {
    const res = await this._cognitoAdminService.adminGetUser(params);
    if (!isResolved(res)) {
      const { error } = res;
      throw new CognitoError(error);
    }
    return res.data;
  };

  adminEnableUser = async (params: IAdminService["adminEnableUserParams"]) => {
    const { username } = params;
    const res = await this._cognitoAdminService.adminEnableUser({ username });
    if (!isResolved(res)) {
      const { error } = res;
      throw new CognitoError(error);
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
      throw new CognitoError(error);
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
      throw new CognitoError(error);
    }

    return res.data;
  };
}

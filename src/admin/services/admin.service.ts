/* eslint-disable arrow-body-style */
import { Injectable } from "@nestjs/common";
import to from "await-to-js";
import {
  CognitoAdminService,
  CognitoError,
  CognitoService,
  IAdminService
} from "src/cognito";

import { isResolved } from "src/common";
import { CompanyService, CreateCompanyInput } from "src/company";
import { CreateUserInput } from "src/user/dto/create-user.input";
import { UserService } from "src/user/user.service";
import { AdminCreateUserInput } from "../dto";

@Injectable()
export class AdminService {
  constructor(
    private _cognitoAdminService: CognitoAdminService,
    private _companyService: CompanyService,
    private _userService: UserService,
    private _cognitoService: CognitoService
  ) {}

  // adminCreateCompany = async (input: CreateCompanyInput) => {
  //   return this._companyService.create(input);
  // };

  // adminCreateUser = async (params: AdminCreateUserInput) => {
  //   const {
  //     temporaryPassword,
  //     permanent,
  //     username,
  //     sendPassword,
  //     attributes,
  //     desiredDeliveryMediums,
  //     companyId,
  //     tenantId,
  //     ownerId,
  //     type,
  //     ...rest
  //   } = params;
  //   attributes.push(
  //     {
  //       name: "custom:tenant",
  //       value: tenantId
  //     },
  //     {
  //       name: "custom:owner",
  //       value: ownerId
  //     },
  //     {
  //       name: "custom:role",
  //       value: type
  //     },
  //     {
  //       name: "custom:company",
  //       value: companyId
  //     }
  //   );
  //   const cognitoData = {
  //     temporaryPassword,
  //     username,
  //     sendPassword,
  //     attributes
  //   };
  //   console.log(cognitoData);

  //   const res = await this._cognitoAdminService.adminCreateUser(cognitoData);
  //   if (!isResolved(res)) {
  //     const { error } = res;
  //     throw new CognitoError(error);
  //   }

  //   if (params.permanent) {
  //     await this.adminSetUserPassword({
  //       password: temporaryPassword,
  //       permanent,
  //       username
  //     });
  //   }

  //   const userGroup = await this.adminListGroupsForUser({
  //     username,
  //     limit: undefined,
  //     nextToken: undefined
  //   });
  //   const {
  //     data: { userCreateDate, userLastModifiedDate, ...otherData }
  //   } = res;

  //   const authData: CreateUserInput["authData"] = {
  //     ...otherData,
  //     userGroup
  //   };

  //   const userData: CreateUserInput = {
  //     ...rest,
  //     companyId,
  //     tenantId,
  //     ownerId,
  //     type,
  //     // companyId: this._cognitoService.currentUser
  //     authData
  //   };
  //   // console.log(userData);
  //   const [err, user] = await to(
  //     this._userService.create({
  //       ...userData
  //     })
  //   );

  //   if (err) {
  //     this.adminDeleteUser({ username });
  //     throw err;
  //   }

  //   return user;
  // };

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

  adminListGroupsForUser = async (
    params: IAdminService["adminListGroupsForUserParams"]
  ) => {
    const res = await this._cognitoAdminService.adminListGroupsForUser(params);
    if (!isResolved(res)) {
      const { error } = res;
      throw new CognitoError(error);
    }
    const { groups } = res.data;
    return groups;
  };
}

import { Injectable } from "@nestjs/common";
import { InputType, OmitType } from "@nestjs/graphql";
import to from "await-to-js";
import { AdminCreateUserInput } from "src/admin/dto";
import {
  CognitoAdminService,
  CognitoError,
  CognitoService,
  IAdminService
} from "src/cognito";
import { isResolved } from "src/common";
import { CompanyService } from "src/company";
import { CreateUserInput } from "./dto/create-user.input";
import { DBUserInput } from "./dto/db-user-input";
import { UpdateUserInput } from "./dto/update-user.input";
import { User } from "./entities/user.entity";
import { UserRepository } from "./user.repository";

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private _cognitoAdminService: CognitoAdminService
  ) {}

  adminCreateUser = async (params: CreateUserInput) => {
    const {
      temporaryPassword,
      permanent,
      username,
      sendPassword,
      attributes,
      desiredDeliveryMediums,
      companyId,
      tenantId,
      ownerId,
      type,
      ...rest
    } = params;
    attributes.push(
      {
        name: "custom:tenant",
        value: tenantId
      },
      {
        name: "custom:owner",
        value: ownerId
      },
      {
        name: "custom:role",
        value: type
      },
      {
        name: "custom:company",
        value: companyId
      }
    );
    const cognitoData = {
      temporaryPassword,
      username,
      sendPassword,
      attributes
    };
    console.log(cognitoData);

    const res = await this._cognitoAdminService.adminCreateUser(cognitoData);
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

    const userGroup = await this.adminListGroupsForUser({
      username,
      limit: undefined,
      nextToken: undefined
    });
    const {
      data: { userCreateDate, userLastModifiedDate, ...otherData }
    } = res;

    const authData: User["authData"] = {
      ...otherData,
      userGroup
    };

    // I remove it's type
    const userData = {
      ...rest,
      companyId,
      tenantId,
      ownerId,
      type,
      email: username,
      authData
    };
    // console.log(userData);
    const [err, user] = await to(
      this.create({
        ...userData
      })
    );

    if (err) {
      this.adminDeleteUser({ username });
      throw err;
    }

    return user;
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
    this.remove(params.username);
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

  adminGetUser = async (params: IAdminService["adminGetUserParams"]) => {
    const res = await this._cognitoAdminService.adminGetUser(params);
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

  // To manage user in the the database

  async create(input: DBUserInput) {
    const user = this.userRepository.create({
      ...input
    });

    // eslint-disable-next-line max-len
    await this.userRepository.persistAndFlush(user);
    console.log({ user });
    return user;
  }

  async update(input: UpdateUserInput) {
    const { id, ...rest } = input;

    const user = await this.userRepository.findOneOrFail({ id });

    this.userRepository.assign(user, rest);
    await this.userRepository.flush();
    return user;
  }

  async remove(email: string) {
    // const user = await this.userRepository.findOneOrFail({ id });
    const user = await this.userRepository.findOneOrFail({ email });
    await this.userRepository.removeAndFlush(user);
    return user;
  }

  /**
   * List all User
   */
  async findAll() {
    const users = await this.userRepository.findAll();
    return users;
  }

  /**
   * Get User by Email
   */
  async findOneByEmail(email: string) {
    const user = await this.userRepository.findOneOrFail({ email });
    return user;
  }
  /**
   * Get User by ID
   */
  async findOne(id: string) {
    const user = await this.userRepository.findOneOrFail({ id });
    return user;
  }
}

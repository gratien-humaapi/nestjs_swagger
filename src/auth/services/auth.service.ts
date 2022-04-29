import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import {
  CognitoIdentityProvider,
  InternalErrorException
} from "@aws-sdk/client-cognito-identity-provider";
import { errorResponse, response } from "src/common/utils";
import camelcaseKeys from "camelcase-keys";
import { IAuthService, AuthClientErrorType } from "src/cognito/types";
import { UsersService } from "../../users/users.service";
import { IAuthConfig } from "../auth.config";

const camelCase = <T>(data: T) => camelcaseKeys(data, { deep: true });

@Injectable()
export class AuthService {
  private _client: CognitoIdentityProvider;
  private _userPoolID: string;
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {
    const authConfig = this.configService.get<IAuthConfig>("authConfig");
    if (!authConfig) {
      throw new Error("auth config not initialized");
    }
    const { region, userPoolId } = authConfig;
    this._client = new CognitoIdentityProvider({
      region
    });
    this._userPoolID = userPoolId;
  }

  async validateUser(username: string, pass: string) {
    const authConfig = this.configService.get<IAuthConfig>("authConfig");
    if (!authConfig) {
      throw new Error("auth config not initialized");
    }
    const { userPoolId } = authConfig;
    console.log({ userPoolId });

    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async adminEnableUser(params: IAuthService["adminEnableUserParams"]) {
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
  }
  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload)
    };
  }
}

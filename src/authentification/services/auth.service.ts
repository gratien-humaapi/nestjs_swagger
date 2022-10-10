import { Injectable } from "@nestjs/common";
// import { JwtService } from "@nestjs/jwt";
import { ICognitoService, CognitoService, CognitoError } from "src/cognito";
import { isResolved } from "src/common";

@Injectable()
export class AuthService {
  constructor(private _cognitoService: CognitoService) {}

  async signIn(data: ICognitoService["signIn"]) {
    const res = await this._cognitoService.signIn(data);
    if (!isResolved(res)) {
      const { error } = res;
      console.log(error);

      throw new CognitoError(error);
    }
    return res.data;
  }

  async newPasswordRequired(data: ICognitoService["newPasswordRequired"]) {
    const res = await this._cognitoService.newPasswordRequired(data);
    if (!isResolved(res)) {
      const { error } = res;
      console.log(error);

      throw new CognitoError(error);
    }
    return res.data;
  }

  async globalSignOut(accessToken: string) {
    const res = await this._cognitoService.globalSignOut(accessToken);
    if (!isResolved(res)) {
      const { error } = res;
      console.log(error);

      throw new CognitoError(error);
    }
    return res.data;
  }

  async forgotPassword(username: string) {
    const res = await this._cognitoService.forgotPassword(username);
    if (!isResolved(res)) {
      const { error } = res;
      console.log(error);

      throw new CognitoError(error);
    }
    return res.data;
  }

  async confirmForgotPassword(
    params: ICognitoService["confirmForgotPassword"]
  ) {
    const res = await this._cognitoService.confirmForgotPassword(params);
    if (!isResolved(res)) {
      const { error } = res;
      console.log(error);

      throw new CognitoError(error);
    }
    return res.data;
  }

  async revokeRefreshToken(refreshToken: string) {
    const res = await this._cognitoService.revokeRefreshToken(refreshToken);
    if (!isResolved(res)) {
      const { error } = res;
      console.log(error);

      throw new CognitoError(error);
    }
    return res.data;
  }

  async refreshAccessAndIDToken(
    params: ICognitoService["refreshAccessAndIDToken"]
  ) {
    const res = await this._cognitoService.refreshAccessAndIDToken(params);
    if (!isResolved(res)) {
      const { error } = res;
      console.log(error);

      throw new CognitoError(error);
    }
    return res.data;
  }

  async verifyUserAttribute(params: ICognitoService["verifyUserAttribute"]) {
    const res = await this._cognitoService.verifyUserAttribute(params);
    if (!isResolved(res)) {
      const { error } = res;
      console.log(error);

      throw new CognitoError(error);
    }
    return res.data;
  }

  async getUserAttributeVerificationCode(
    params: ICognitoService["getUserAttributeVerificationCode"]
  ) {
    const res = await this._cognitoService.getUserAttributeVerificationCode(
      params
    );
    if (!isResolved(res)) {
      const { error } = res;
      console.log(error);

      throw new CognitoError(error);
    }
    return res.data;
  }
}

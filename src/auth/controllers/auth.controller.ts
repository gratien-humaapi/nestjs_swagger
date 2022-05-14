import {
  Body,
  Controller,
  Headers,
  Post,
  Req,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import camelcaseKeys from "camelcase-keys";
import { ICognitoService } from "src/cognito";
import { Request } from "express";
import { Cookie, JwtAuthGuard, Public } from "src/common";
import {
  RefreshTokenInterceptor,
  RefreshTokenRevokeInterceptor
} from "../interceptors";
import { LocalAuthGuard } from "../local-auth.guard";
import { AuthService } from "../services";

@UseGuards(JwtAuthGuard)
@Controller("auth")
export class AuthController {
  constructor(private _authService: AuthService) {}
  // @UseGuards(LocalAuthGuard)

  @Public()
  @Post("sign-in")
  @UseInterceptors(RefreshTokenInterceptor)
  async signIn(@Body() data: ICognitoService["signIn"]) {
    return this._authService.signIn(data);
  }

  @Public()
  @Post("new-password-required")
  @UseInterceptors(RefreshTokenInterceptor)
  async newPasswordRequired(
    @Body() data: ICognitoService["newPasswordRequired"]
  ) {
    return this._authService.newPasswordRequired(data);
  }

  @Post("sign-out")
  @UseInterceptors(RefreshTokenRevokeInterceptor)
  async signOut() {
    return undefined;
  }

  @Post("global-sign-out")
  @UseInterceptors(RefreshTokenRevokeInterceptor)
  async globalSignOut(@Headers("Authorization") accessToken: string) {
    await this._authService.globalSignOut(accessToken);
    return undefined;
  }

  @Public()
  @Post("forgot-password")
  @UseInterceptors(RefreshTokenRevokeInterceptor)
  async forgotPassword(@Body("username") username: string) {
    const res = await this._authService.forgotPassword(username);
    return res;
  }

  @Public()
  @Post("confirm-forgot-password")
  async confirmForgotPassword(
    @Body() data: ICognitoService["confirmForgotPassword"]
  ) {
    await this._authService.confirmForgotPassword(data);
    return undefined;
  }

  @Post("verify-user-attribute")
  async verifyUserAttribute(
    @Body() data: Omit<ICognitoService["verifyUserAttribute"], "accessToken">,
    @Headers("Authorization") accessToken: string
  ) {
    const newData = { accessToken, ...data };
    await this._authService.verifyUserAttribute(newData);
    return undefined;
  }

  @Post("get-user-attribute-verification-code")
  async getUserAttributeVerificationCode(
    @Body()
    data: Omit<
      ICognitoService["getUserAttributeVerificationCode"],
      "accessToken"
    >,
    @Headers("Authorization") accessToken: string
  ) {
    const newData = { accessToken, ...data };
    const res = await this._authService.getUserAttributeVerificationCode(
      newData
    );
    return res;
  }
}

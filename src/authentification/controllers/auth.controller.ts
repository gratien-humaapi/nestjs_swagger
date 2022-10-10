import {
  Body,
  Controller,
  Headers,
  Post,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { ICognitoService } from "src/cognito";
import { AuthClienExceptionFilter, JwtAuthGuard, Public } from "src/common";
import { SignInUserDto } from "../dto";
import {
  RefreshTokenInterceptor,
  RefreshTokenRevokeInterceptor
} from "../interceptors";
import { AuthService } from "../services";

@UseFilters(AuthClienExceptionFilter)
@Controller("auth")
export class AuthController {
  constructor(private _authService: AuthService) {}
  // @UseGuards(LocalAuthGuard)

  @Public()
  @Post("sign-in")
  @UsePipes(ValidationPipe)
  @UseInterceptors(RefreshTokenInterceptor)
  async signIn(@Body() data: SignInUserDto) {
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
    const res = await this._authService.globalSignOut(accessToken);
    return res;
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
    const res = await this._authService.confirmForgotPassword(data);
    return res;
  }

  @Post("verify-user-attribute")
  async verifyUserAttribute(
    @Body() data: Omit<ICognitoService["verifyUserAttribute"], "accessToken">,
    @Headers("Authorization") accessToken: string
  ) {
    const newData = { accessToken, ...data };
    const res = await this._authService.verifyUserAttribute(newData);
    return res;
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

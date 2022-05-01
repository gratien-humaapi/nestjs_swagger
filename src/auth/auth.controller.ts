import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import camelcaseKeys from "camelcase-keys";
import { ICognitoService } from "src/cognito";
import { LocalAuthGuard } from "./local-auth.guard";
import { AuthService } from "./services";

@Controller("auth")
export class AuthController {
  constructor(private _authService: AuthService) {}
  // @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Body() data: ICognitoService["login"]) {
    return this._authService.login(data);
  }
}

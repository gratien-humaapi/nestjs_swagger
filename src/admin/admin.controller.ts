import { Body, Controller, Post } from "@nestjs/common";
import { AuthClientError } from "src/cognito";
import { AdminService } from "./services";

@Controller("admin")
export class AdminController {
  constructor(private _adminService: AdminService) {}
  @Post("enable-user")
  async adminEnableUser(@Body("username") username: string) {
    try {
      const res = await this._adminService.adminEnableUser({ username });
      return res;
    } catch (err) {
      return <AuthClientError>err;
    }
  }

  @Post("disable-user")
  async adminDisableUser(@Body("username") username: string) {
    try {
      const res = await this._adminService.adminDisableUser({ username });
      return res;
    } catch (err) {
      return <AuthClientError>err;
    }
  }

  @Post("token-expirein")
  async adminUpdateAccessTokenExpireIn(
    @Body("accessTokenValidity") accessTokenValidity: number,
    @Body("refreshTokenValidity") refreshTokenValidity: number
  ) {
    const params = { accessTokenValidity, refreshTokenValidity };
    try {
      const res = await this._adminService.adminUpdateTokensExpireIn(params);
      return res;
    } catch (err) {
      return <AuthClientError>err;
    }
  }
}

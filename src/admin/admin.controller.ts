import {
  Body,
  Controller,
  Post,
  Headers,
  ValidationPipe,
  UseGuards
} from "@nestjs/common";
import { CognitoError } from "src/cognito";
import { JwtAuthGuard } from "src/common";
// import { AdminCreateUserDto } from "./dto";
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
      return <CognitoError>err;
    }
  }

  @Post("disable-user")
  async adminDisableUser(@Body("username") username: string) {
    try {
      const res = await this._adminService.adminDisableUser({ username });
      return res;
    } catch (err) {
      return <CognitoError>err;
    }
  }

  @Post("token-expirein")
  async adminUpdateAccessTokenExpireIn(
    @Body("accessTokenValidity") accessTokenValidity: number,
    @Body("refreshTokenValidity") refreshTokenValidity: number,
    @Headers() headers
  ) {
    console.log(headers);

    const params = { accessTokenValidity, refreshTokenValidity };
    try {
      const res = await this._adminService.adminUpdateTokensExpireIn(params);
      return res;
    } catch (err) {
      return <CognitoError>err;
    }
  }

  // @Post("create-user")
  // async adminCreateUser(
  //   @Body(new ValidationPipe()) params: AdminCreateUserDto
  //   // @Headers() headers
  // ) {
  //   // console.log(headers);

  //   try {
  //     const res = await this._adminService.adminCreateUser(params);
  //     console.log(res);

  //     return res;
  //   } catch (err) {
  //     return <CognitoError>err;
  //   }
  // }
}

import {
  Body,
  Controller,
  Post,
  Req,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { Request } from "express";
import { Cookie, Public } from "src/common";
import { RefreshTokenDTO } from "../dto";
import { AuthService } from "../services";

// @UsePipes(ValidationPipe)
@Controller("token")
export class TokenController {
  constructor(private _authService: AuthService) {}
  @Post("revoke")
  async revoke(@Req() req: Request) {
    const refreshToken = req.cookies[Cookie.REFRESH_TOKEN];
    if (refreshToken) {
      await this._authService.revokeRefreshToken(refreshToken);
    }
    return undefined;
  }

  @Post("web-refresh-tokens")
  @Public()
  async webRefresh(@Req() req: Request) {
    const refreshToken = req.cookies[Cookie.REFRESH_TOKEN] as
      | string
      | undefined;

    const sub = req.cookies[Cookie.USER_ID] as string | undefined;

    if (!refreshToken || !sub) {
      return undefined;
    }

    const res = await this._authService.refreshAccessAndIDToken({
      refreshToken,
      sub
    });

    return res;
  }

  @Post("refresh-tokens")
  @Public()
  async refresh(@Body() params: RefreshTokenDTO) {
    const { refreshToken, sub } = params;
    if (!refreshToken) {
      return undefined;
    }
    const res = await this._authService.refreshAccessAndIDToken({
      refreshToken,
      sub
    });

    return res;
  }
}

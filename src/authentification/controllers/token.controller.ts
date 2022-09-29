import { Body, Controller, Post, Req, ValidationPipe } from "@nestjs/common";
import { Request } from "express";
import { Cookie, Public } from "src/common";
import { RefreshTokenDTO } from "../dto";
import { AuthService } from "../services";

@Controller("token")
export class TokenController {
  constructor(private _authService: AuthService) {}
  @Post("revoke")
  async revoke(@Req() req: Request) {
    const refreshToken = req.cookies[Cookie.refresh_token];
    if (refreshToken) {
      await this._authService.revokeRefreshToken(refreshToken);
    }
    return undefined;
  }

  @Post("web-refresh-tokens")
  @Public()
  async webRefresh(@Req() req: Request, @Body("sub") sub: string) {
    const refreshToken = req.cookies[Cookie.refresh_token] as
      | string
      | undefined;

    if (!refreshToken) {
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
  async refresh(@Body(new ValidationPipe()) params: RefreshTokenDTO) {
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

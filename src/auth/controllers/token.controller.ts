import { Body, Controller, Post, Req } from "@nestjs/common";
import { Request } from "express";
import { Cookie } from "src/common";
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

  @Post("refresh-tokens")
  async refresh(@Req() req: Request, @Body("sub") sub: string) {
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
}

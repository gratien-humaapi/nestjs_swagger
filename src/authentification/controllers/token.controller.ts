// import { UnauthorizedException } from "@aws-sdk/client-cognito-identity-provider";
import {
  Body,
  Controller,
  Post,
  Req,
  UnauthorizedException,
  UseFilters,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { Request } from "express";
import {
  AuthClienExceptionFilter,
  Cookie,
  HttpExceptionFilter,
  Public
} from "src/common";
import { RefreshTokenDTO } from "../dto";
import { AuthService } from "../services";

@UseFilters(HttpExceptionFilter, AuthClienExceptionFilter)
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

    console.log({ refreshToken, sub });

    if (!refreshToken || !sub) {
      throw new UnauthorizedException();
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

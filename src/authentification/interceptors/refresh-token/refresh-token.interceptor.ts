import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from "@nestjs/common";
import { Observable, tap } from "rxjs";
import { Response } from "express";
import { Cookie } from "src/common";
import { parseJwt } from "src/authentification";
import { AuthService } from "../../services";

type SignInResponse = Awaited<ReturnType<AuthService["signIn"]>>;
@Injectable()
export class RefreshTokenInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<SignInResponse>
  ): Observable<SignInResponse> {
    const res: Response = context.switchToHttp().getResponse();
    let sub = "";

    return next.handle().pipe(
      tap((data) => {
        const { authenticationResult } = data;
        if (authenticationResult) {
          const { refreshToken, accessToken } = authenticationResult;
          if (accessToken) {
            sub = parseJwt(accessToken).sub;
          }
          //
          return res
            .cookie(Cookie.REFRESH_TOKEN, refreshToken, {
              path: "/token/web-refresh-tokens",
              secure: true,
              httpOnly: true,
              // expires: new Date(Date.now() + 90000),
              expires: new Date(Date.now() + 360000000),
              sameSite: "strict" // work only starting form 2019 browsers
            })
            .cookie(Cookie.USER_ID, sub, {
              // path is set to "/" in order to let the client sdk to retrieve the value
              path: "/",
              secure: true,
              httpOnly: false,
              // expires: new Date(Date.now() + 90000),
              expires: new Date(Date.now() + 360000000),
              sameSite: "strict" // work only starting form 2019 browsers
            });
        }
        return undefined;
      })
    );
  }
}

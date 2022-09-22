import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from "@nestjs/common";
import { Observable, tap } from "rxjs";
import { Response } from "express";
import { Cookie } from "src/common";
import { AuthService } from "../../services";

type SignInResponse = Awaited<ReturnType<AuthService["signIn"]>>;
@Injectable()
export class RefreshTokenInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<SignInResponse>
  ): Observable<SignInResponse> {
    const res: Response = context.switchToHttp().getResponse();

    return next.handle().pipe(
      tap((data) => {
        const { refreshToken } = data;
        if (refreshToken) {
          return res.cookie(Cookie.refresh_token, refreshToken, {
            path: "/token",
            secure: true,
            httpOnly: true,
            expires: new Date(Date.now() + 90000)
          });
        }
        return undefined;
      })
    );
  }
}

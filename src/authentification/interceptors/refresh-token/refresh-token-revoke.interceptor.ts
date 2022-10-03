/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from "@nestjs/common";
import { Observable, tap } from "rxjs";
import { Response } from "express";
import { Cookie } from "src/common";

@Injectable()
export class RefreshTokenRevokeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const res: Response = context.switchToHttp().getResponse();
    return next.handle().pipe(
      tap(() =>
        res.clearCookie(Cookie.REFRESH_TOKEN, {
          path: "/token",
          secure: true,
          httpOnly: true
        })
      )
    );
  }
}

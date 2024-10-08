/* eslint-disable @typescript-eslint/no-explicit-any */
import { NotFoundError } from "@mikro-orm/core";
import {
  CallHandler,
  ContextType,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
  NotFoundException
} from "@nestjs/common";
import { catchError, Observable } from "rxjs";

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const contextType = context.getType<ContextType>();
    if (contextType === "http") {
      return next.handle().pipe(
        catchError((error) => {
          console.error("\x1b[36m", {
            message: error.message,
            extensions: error.extensions,
            ...error
          });

          // Gestion des erreurs selon leur type
          switch (error.constructor) {
            case NotFoundError:
              throw new NotFoundException(error.message);
            default:
              throw new InternalServerErrorException("operation failed");
          }
        })
      );
    }

    return next.handle();
  }
}
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CallHandler,
  ContextType,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from "@nestjs/common";
import { catchError, Observable, tap } from "rxjs";
import { GraphQLError } from "graphql/error/GraphQLError";
import { NotFoundError } from "@mikro-orm/core";

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const contextType = context.getType<ContextType>();
    if (contextType === "http") {
      return next.handle();
    }

    return next.handle().pipe(
      catchError((error) => {
        console.error({ message: error.message, ...error });
        if (error instanceof NotFoundError) {
          throw new GraphQLError(error.message, {
            extensions: {
              code: "CUSTOM_NOT_FOUND"
            }
          });
        } else {
          console.error({ ...error });

          throw new GraphQLError("operation failed", {});
        }
      })
    );
  }
}

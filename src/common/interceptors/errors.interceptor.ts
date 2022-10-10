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
import { CognitoError } from "src/cognito";
import { GQLErrorCode } from "../enums";

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const contextType = context.getType<ContextType>();
    if (contextType === "http") {
      return next.handle();
    }

    return next.handle().pipe(
      catchError((error) => {
        console.error("\x1b[36m", {
          message: error.message,
          extensions: error.extensions,
          ...error
        });
        // console.error(error.constructor);
        switch (error.constructor) {
          case NotFoundError:
            throw new GraphQLError(error.message, {
              extensions: {
                code: GQLErrorCode.CUSTOM_NOT_FOUND
              }
            });
          case CognitoError:
            switch (error.name) {
              case "NotAuthorizedException":
                throw new GraphQLError(error.message, {
                  extensions: {
                    code: GQLErrorCode.CUSTOM_BAD_REQUEST
                  }
                });

              case "InvalidParameterException":
                throw new GraphQLError(error.message, {
                  extensions: {
                    code: GQLErrorCode.CUSTOM_BAD_USER_INPUT
                  }
                });

              case "UserNotFoundException":
                throw new GraphQLError(error.message, {
                  extensions: {
                    code: GQLErrorCode.CUSTOM_NOT_FOUND
                  }
                });

              case "UsernameExistsException":
                throw new GraphQLError(error.message, {
                  extensions: {
                    code: GQLErrorCode.CUSTOM_BAD_REQUEST
                  }
                });

              default:
                throw new GraphQLError("operation failed", {});
            }

          case GraphQLError:
            return next.handle();

          default:
            throw new GraphQLError("operation failed", {});
        }
      })
    );
  }
}

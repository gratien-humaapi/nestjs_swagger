import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException
} from "@nestjs/common";
import { Request, Response } from "express";
import { CognitoError } from "src/cognito";

@Catch(CognitoError)
export class AuthClienExceptionFilter implements ExceptionFilter {
  catch(exception: CognitoError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const { message, statusCode, name } = exception;

    // eslint-disable-next-line prefer-const
    let payload = {
      message,
      statusCode,
      name
    };
    if (name === "NotAuthorizedException") {
      const isMatch = message.includes(
        "SecretHash does not match for the client"
      );
      payload = isMatch
        ? {
            name: "UnauthorizedException",
            message: "Unauthorized",
            statusCode: 401
          }
        : payload;
      // we should log this kind of error, because it's mean that the user
      // is trying to modify uid in browser cookie
      // we could bloc the user
    }
    console.log("ici", JSON.stringify(exception));

    response.status(statusCode || 400).json({
      ...payload
    });
  }
}

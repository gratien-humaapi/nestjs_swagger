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
    console.log("ici", JSON.stringify(exception));

    response.status(statusCode || 400).json({
      statusCode,
      message,
      name
    });
  }
}

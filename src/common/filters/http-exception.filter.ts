import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException
} from "@nestjs/common";
import { Request, Response } from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = exception.getStatus();
    const { message, name } = exception;
    response.status(statusCode || 400).json({
      statusCode,
      message,
      name
    });
  }
}

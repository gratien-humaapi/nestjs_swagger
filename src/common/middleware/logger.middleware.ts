import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log("Request...", req, res);
    next();
  }
}
// with functional approach
export function logger(req: Request, res: Response, next: NextFunction) {
  console.log(`Request...`);
  next();
}

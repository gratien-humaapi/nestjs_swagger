import { Inject, Injectable } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { Request } from "express";
import { CONTEXT } from "@nestjs/graphql";

@Injectable()
export class SessionService {
  constructor(@Inject(REQUEST) private request: Request) {}
  //   constructor(@Inject(CONTEXT) private context) {}

  testReq() {
    console.log(this.request);
  }
}

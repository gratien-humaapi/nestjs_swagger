import { Inject, Injectable } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { Request } from "express";
import { CONTEXT } from "@nestjs/graphql";
import { EntityManager } from "@mikro-orm/postgresql";

@Injectable()
export class SessionService {
  constructor(
    @Inject(REQUEST) private request: Request,
    private readonly em: EntityManager
  ) {}
  //   constructor(@Inject(CONTEXT) private context) {}

  testReq() {
    console.log(this.request);
    // this.em.assign
  }
}

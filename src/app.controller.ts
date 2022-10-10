import { Controller, Post, UseGuards, Get, Req, Headers } from "@nestjs/common";
import { Request } from "express";
import { Public } from "./common";

@Controller()
export class AppController {
  @Get("profile")
  getProfile(@Req() req, @Headers("Authorization") accessToken: string) {
    console.log(req);
    return req.user;
  }

  @Public()
  @Get("test")
  test(@Req() req: Request) {
    return "Hello World!";
  }
}

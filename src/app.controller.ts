import { Controller, Post, UseGuards, Get, Req, Headers } from "@nestjs/common";
import { Request } from "express";
import { Public, JwtAuthGuard } from "./common";

@UseGuards(JwtAuthGuard)
@Controller()
export class AppController {
  @Get("profile")
  getProfile(@Req() req, @Headers("Authorization") accessToken: string) {
    return req.user;
  }

  @Public()
  @Get("test")
  test(@Req() req: Request) {
    return req.cookies;
  }
}

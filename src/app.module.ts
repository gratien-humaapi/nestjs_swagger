/* eslint-disable import/order */
import { Module } from "@nestjs/common";
import { logger } from "./common/middleware/logger.middleware";
import { UsersModule } from "./users/users.module";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "./auth/auth.service";
import { LocalStrategy } from "./auth/local.strategy";
import { AppController } from "./app.controller";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [UsersModule, PassportModule, AuthModule],
  controllers: [AppController]
})
export class AppModule {}

/* eslint-disable import/order */
import { Module } from "@nestjs/common";
import { logger } from "./common/middleware/logger.middleware";
import { UsersModule } from "./users/users.module";
import { PassportModule } from "@nestjs/passport";
import { AppController } from "./app.controller";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { AdminModule } from "./admin";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "./common";

@Module({
  imports: [
    UsersModule,
    PassportModule,
    AuthModule,
    ConfigModule.forRoot(),
    AdminModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }
  ],
  controllers: [AppController]
})
export class AppModule {}

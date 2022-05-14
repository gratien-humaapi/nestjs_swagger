import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { CognitoModule } from "src/cognito/cognito.module";
import { AuthService } from "./services";
import { LocalStrategy } from "./local.strategy";
import { JwtStrategy } from "./strategies";
import { UsersModule } from "../users/users.module";
import { jwtConstants } from "./constants";
import { AuthController, TokenController } from "./controllers";

@Module({
  imports: [
    CognitoModule,
    UsersModule,
    PassportModule.register({ defaultStrategy: "jwt" })
    // JwtModule.register({
    //   secret: jwtConstants.secret,
    //   signOptions: { expiresIn: "60s" }
    // })
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController, TokenController]
})
export class AuthModule {}

import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { CognitoModule } from "src/cognito/cognito.module";
import { AuthService } from "./services";
import { JwtStrategy } from "./strategies";
import { AuthController, TokenController } from "./controllers";
import { SessionService } from "./services/session.service";

@Module({
  imports: [CognitoModule, PassportModule.register({ defaultStrategy: "jwt" })],
  providers: [AuthService, JwtStrategy, SessionService],
  exports: [AuthService, SessionService],
  controllers: [AuthController, TokenController]
})
export class AuthModule {}

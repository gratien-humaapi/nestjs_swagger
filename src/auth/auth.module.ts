import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { CognitoModule } from "src/cognito/cognito.module";
import { AuthService } from "./services";
import { JwtStrategy } from "./strategies";
import { UserModule } from "../user/user.module";
import { AuthController, TokenController } from "./controllers";

@Module({
  imports: [
    CognitoModule,
    UserModule,
    PassportModule.register({ defaultStrategy: "jwt" })
  ],
  exports: [AuthService],
  controllers: [AuthController, TokenController],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule {}

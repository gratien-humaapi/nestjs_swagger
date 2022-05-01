import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import cognitoConfig from "./cognito.config";
import { CognitoAdminService, CognitoService } from "./services";

@Module({
  imports: [ConfigModule.forFeature(cognitoConfig)],
  providers: [CognitoAdminService, CognitoService],
  exports: [CognitoAdminService, CognitoService]
})
export class CognitoModule {}

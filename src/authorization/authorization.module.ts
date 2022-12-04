import { Module } from "@nestjs/common";
import { CognitoModule } from "src/cognito";
import { CurrentUserORMSuscriber } from "./suscribers";

@Module({
  imports: [CognitoModule],
  providers: [CurrentUserORMSuscriber]
})
export class AuthorizationModule {}

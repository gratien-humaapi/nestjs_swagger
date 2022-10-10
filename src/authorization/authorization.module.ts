import { Module } from "@nestjs/common";
import { CurrentUserORMSuscriber } from "./suscribers";

@Module({
  providers: [CurrentUserORMSuscriber]
})
export class AuthorizationModule {}

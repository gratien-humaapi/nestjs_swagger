import { Module } from "@nestjs/common";
import { CognitoModule } from "src/cognito";
import { CompanyModule } from "src/company";
import { UserModule } from "src/user/user.module";
import { AdminController } from "./admin.controller";
import { AdminResolver } from "./admin.resolver";
import { AdminService } from "./services";

@Module({
  imports: [CognitoModule, CompanyModule, UserModule],
  providers: [AdminService, AdminResolver],
  controllers: [AdminController]
})
export class AdminModule {}

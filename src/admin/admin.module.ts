import { Module } from "@nestjs/common";
import { CognitoModule } from "src/cognito";
import { CompanyModule } from "src/company";
import { AdminService } from "./services";
import { AdminController } from "./admin.controller";
import { AdminResolver } from "./admin.resolver";

@Module({
  imports: [CognitoModule, CompanyModule],
  providers: [AdminService, AdminResolver],
  controllers: [AdminController]
})
export class AdminModule {}

import { Module } from "@nestjs/common";
import { CognitoModule } from "src/cognito";
import { AdminService } from "./services";
import { AdminController } from "./admin.controller";

@Module({
  imports: [CognitoModule],
  providers: [AdminService],
  controllers: [AdminController]
})
export class AdminModule {}

import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { CognitoModule } from "src/cognito";
import { CompanyModule } from "src/company";
import { User } from "./entities/user.entity";
import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";

@Module({
  imports: [MikroOrmModule.forFeature([User]), CognitoModule, CompanyModule],
  providers: [UserResolver, UserService],
  exports: [UserService]
})
export class UserModule {}

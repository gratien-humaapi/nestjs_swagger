import { Module } from "@nestjs/common";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { UserService } from "./user.service";
import { UserResolver } from "./user.resolver";
import { User } from "./entities/user.entity";

@Module({
  imports: [MikroOrmModule.forFeature([User])],
  providers: [UserResolver, UserService],
  exports: [UserService]
})
export class UserModule {}

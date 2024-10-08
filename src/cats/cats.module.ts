import { Module } from "@nestjs/common";
import { CatsController } from "./cats.controller";
import { CatsService } from "./cats.service";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Cat } from "./entities/cats.entity";

@Module({
  imports: [MikroOrmModule.forFeature([Cat])],
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService]
})
export class CatsModule {}

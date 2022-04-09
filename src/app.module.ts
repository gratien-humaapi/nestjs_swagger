import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CatsServiceService } from './cats-service/cats-service.service';
import { CatsService } from './cats/cats.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, CatsServiceService, CatsService]
})
export class AppModule {}

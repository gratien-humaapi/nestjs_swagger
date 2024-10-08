/* eslint-disable import/order */
import { MikroORM } from "@mikro-orm/core";
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { CatsModule } from "./cats/cats.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    MikroOrmModule.forRoot(),
    CatsModule
  ],
})
export class AppModule implements NestModule {
  constructor(private readonly orm: MikroORM) {}
  configure(consumer: MiddlewareConsumer) {}
}

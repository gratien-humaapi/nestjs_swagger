/* eslint-disable import/order */
import { MikroORM } from "@mikro-orm/core";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CatsModule } from "./cats/cats.module";
import { CodeFileModule } from "./code-files/code-file.module";
import { GithubModule } from "./github/github.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    MikroOrmModule.forRoot(),
    GithubModule,
    CodeFileModule,
    CatsModule
  ],
})
export class AppModule implements NestModule {
  constructor(private readonly orm: MikroORM) {}
  configure(consumer: MiddlewareConsumer) {}
}

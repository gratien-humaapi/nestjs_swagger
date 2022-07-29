/* eslint-disable import/order */
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { PassportModule } from "@nestjs/passport";
import { AppController } from "./app.controller";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { AdminModule } from "./admin";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "./common";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { join } from "path";
import { AuthorsModule } from "./authors/authors.module";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import { MikroOrmMiddleware, MikroOrmModule } from "@mikro-orm/nestjs";
import { MikroORM } from "@mikro-orm/core";

@Module({
  imports: [
    UsersModule,
    PassportModule,
    AuthModule,
    ConfigModule.forRoot(),
    AdminModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      bodyParserConfig: false, // BodyParser should run _before_ MikroOrm middleware
      cors: false // Cors should be handled by NestJS, not the Apollo Server
      // autoSchemaFile: true
    }),
    AuthorsModule,
    MikroOrmModule.forRoot({ autoLoadEntities: true })
    // DatabaseModule
    // PostsModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }
  ],
  controllers: [AppController]
})
export class AppModule implements NestModule {
  constructor(private readonly orm: MikroORM) {}
  configure(consumer: MiddlewareConsumer) {
    /**
     * apply MikroOrmMiddleware for request scoping entity manager
     * @see https://mikro-orm.io/docs/usage-with-nestjs#request-scoping-when-using-graphql
     * @see https://github.com/briandiephuis/nestjs-realworld-example-app/blob/97c9427b4cfd1e863121090f59fb2e5b39cfbe8c/src/app.module.ts#L50
     * */
    consumer.apply(MikroOrmMiddleware).forRoutes("graphql");
  }
}

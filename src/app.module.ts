/* eslint-disable import/order */
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { AppController } from "./app.controller";
import { AuthModule } from "./authentification/auth.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AdminModule } from "./admin";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import { MikroOrmMiddleware, MikroOrmModule } from "@mikro-orm/nestjs";
import { MikroORM } from "@mikro-orm/core";
import { StudentModule } from "./student/student.module";
import { CurrencyModule } from "./currency/currency.module";
import { GraphQLUUID } from "graphql-scalars";
import { APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from "@nestjs/core";
import { ErrorsInterceptor, GqlValidationPipe, JwtAuthGuard } from "./common";
import { TenantModule } from "./tenant/tenant.module";
import { CompanyModule } from "./company/company.module";
import { UserModule } from "./user/user.module";
import { AuthorizationModule } from "./authorization/authorization.module";

@Module({
  imports: [
    PassportModule,
    AuthModule,
    ConfigModule.forRoot(),
    AdminModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        autoSchemaFile: true,
        // autoSchemaFile: "schema.gql",
        playground: false,
        resolvers: { UUID: GraphQLUUID },
        // https://www.apollographql.com/blog/graphql/security/why-you-should-disable-graphql-introspection-in-production/
        introspection: configService.get("NODE_ENV") !== "production",
        plugins:
          configService.get("NODE_ENV") === "production"
            ? []
            : // ? [responseCachePlugin()]
              [
                ApolloServerPluginLandingPageLocalDefault()
                // [responseCachePlugin()]
              ],
        bodyParserConfig: false, // BodyParser should run _before_ MikroOrm middleware
        cors: true
        // csrfPrevention: true
      })

      // autoSchemaFile: true
    }),
    // AuthorsModule,
    MikroOrmModule.forRoot(),
    StudentModule,
    CurrencyModule,
    TenantModule,
    CompanyModule,
    UserModule,
    AuthorizationModule
    // DatabaseModule
    // PostsModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorsInterceptor
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

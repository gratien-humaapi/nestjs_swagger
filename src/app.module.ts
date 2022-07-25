/* eslint-disable import/order */
import { Module } from "@nestjs/common";
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
      sortSchema: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()]
      // autoSchemaFile: true
    }),
    AuthorsModule
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
export class AppModule {}

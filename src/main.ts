import { NestFactory } from "@nestjs/core";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { ConfigService } from "@nestjs/config";
import express from "express";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // https://mikro-orm.io/docs/usage-with-nestjs#app-shutdown-and-cleanup
  app.enableShutdownHooks();
  const configService = app.get(ConfigService);
  /**
   * @see https://mikro-orm.io/docs/usage-with-nestjs#request-scoping-when-using-graphql
   * or use   body-parser @see https://www.npmjs.com/package/body-parser#bodyparserrawoptions
   */
  app.use(express.json());
  // https://stackoverflow.com/a/66769957
  // https://www.apollographql.com/docs/react/networking/authentication/#cookie
  app.enableCors({ origin: "http://localhost:3000", credentials: true });
  app.use(cookieParser()); // Parse the `/token` refresh cookie
  /**
   * @see https://docs.nestjs.com/security/helmet#use-with-fastify
   * @see https://github.com/graphql/graphql-playground/issues/1283#issuecomment-723686116
   */
  app.use(
    helmet({
      contentSecurityPolicy:
        configService.get("NODE_ENV") === "dev" ? false : undefined,
      crossOriginEmbedderPolicy:
        configService.get("NODE_ENV") === "dev" ? false : undefined
    })
  ); // Set sensible headers for improved security
  await app.listen(3001);
}
bootstrap();

import { NestFactory } from "@nestjs/core";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(cookieParser()); // Parse the `/token` refresh cookie
  /**
   * @see https://docs.nestjs.com/security/helmet#use-with-fastify
   * @see https://github.com/graphql/graphql-playground/issues/1283#issuecomment-723686116
   */
  app.use(
    helmet({
      contentSecurityPolicy: process.env.NODE_ENV === "dev" ? false : undefined,
      crossOriginEmbedderPolicy:
        process.env.NODE_ENV === "dev" ? false : undefined
    })
  ); // Set sensible headers for improved security
  await app.listen(3001);
}
bootstrap();

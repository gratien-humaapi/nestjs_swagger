import { NestFactory } from "@nestjs/core";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(cookieParser()); // Parse the `/token` refresh cookie
  app.use(helmet()); // Set sensible headers for improved security
  await app.listen(3001);
}
bootstrap();

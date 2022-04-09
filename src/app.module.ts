import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod
} from "@nestjs/common";
import { CatsModule } from "./cats/cats.module";
import {
  logger,
  LoggerMiddleware
} from "./common/middleware/logger.middleware";

@Module({
  imports: [CatsModule]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes("cats"); // for the routes cats
    // consumer.apply(LoggerMiddleware).forRoutes(CatsController);// all the CatsController's routes
    consumer
      .apply(logger)
      // .apply(LoggerMiddleware)
      .forRoutes({ path: "cats", method: RequestMethod.GET });
  }
}

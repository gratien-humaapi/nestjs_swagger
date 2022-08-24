import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";
import { CustomContextType, IS_PUBLIC_KEY } from "src/common";

@Injectable()
export class GraphqlJwtAuthGuard extends AuthGuard("jwt") {
  constructor(private reflector: Reflector) {
    super();
  }

  getRequest(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ]);
    // const contextType = context.getType<CustomContextType>();
    if (isPublic) {
      return true;
    }

    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();

    return req;
  }
}

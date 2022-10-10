import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ExecutionContextHost } from "@nestjs/core/helpers/execution-context-host";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";
import { CustomContextType } from "../types";
import { IS_PUBLIC_KEY } from "../decorators";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  constructor(private reflector: Reflector) {
    super();
  }
  canActivate(ctx: ExecutionContext) {
    const graphqlCtx = GqlExecutionContext.create(ctx);
    const contextType = ctx.getType<CustomContextType>();
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      ctx.getHandler(),
      ctx.getClass()
    ]);
    if (isPublic) {
      return true;
    }
    if (contextType === "http") {
      return super.canActivate(ctx);
    }

    const { req } = graphqlCtx.getContext();
    return super.canActivate(new ExecutionContextHost([req])); // NOTE
  }

  // canActivate(context: ExecutionContext) {
  //   const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
  //     context.getHandler(),
  //     context.getClass()
  //   ]);
  //   if (isPublic) {
  //     return true;
  //   }

  //   return super.canActivate(context);
  // }
}

import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { AuthenticationError } from "apollo-server-errors";
import { CustomContextType, IS_PUBLIC_KEY } from "src/common";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ]);
    const contextType = context.getType<CustomContextType>();
    if (isPublic) {
      return true;
    }
    if (contextType === "graphql") {
      throw new AuthenticationError("Your are not authenticated");
    }
    return super.canActivate(context);
  }
}

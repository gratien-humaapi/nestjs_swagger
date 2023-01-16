import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { ICurrentUser } from "src/authentification";

export const CurrentUser = createParamDecorator(
  (data, context: ExecutionContext): ICurrentUser => {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    const { user } = req;
    console.log("current user:", user);
    return user;
  }
);

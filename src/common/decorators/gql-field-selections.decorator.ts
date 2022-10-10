import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { fieldsToRelations } from "../utils";

export const GqlSelections = createParamDecorator(
  (data, context: ExecutionContext): string[] => {
    const ctx = GqlExecutionContext.create(context);
    const info = ctx.getInfo();
    const relationPaths = fieldsToRelations(info);
    return relationPaths;
  }
);

import { ArgumentsHost, Catch, HttpException } from "@nestjs/common";
import { GqlArgumentsHost, GqlExceptionFilter } from "@nestjs/graphql";

// not used for the moment
@Catch(HttpException)
export class GraphqlCustomExceptionFilter<T> implements GqlExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    return exception;
  }
}

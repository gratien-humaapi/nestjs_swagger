import { EntityManager } from "@mikro-orm/postgresql";
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler
} from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { CognitoService } from "src/cognito";

@Injectable()
export class FilterInterceptor implements NestInterceptor {
  constructor(
    private em: EntityManager,
    private cognitoService: CognitoService
  ) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log("Before...");
    const { owner, tenant } = this.cognitoService.currentUser;
    this.em.setFilterParams("currentUser", {
      owner,
      tenant
    });

    const now = Date.now();
    return next.handle();
    //   .pipe(tap(() => console.log(`After... ${Date.now() - now}ms`)));
  }
}

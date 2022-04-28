import { InternalErrorException } from "@aws-sdk/client-cognito-identity-provider/dist-types/models";
import { AuthClientErrorType } from "./types";

export class AuthClientError extends Error {
  fault: "server" | "client";

  // metadata: InternalErrorException['$metadata'];
  response?: InternalErrorException["$response"];

  // service?: InternalErrorException["$service"];

  type?: string; // for appsync error (errorType)

  // rest: object;
  constructor(errObj: AuthClientErrorType, ...params: any[]) {
    super(...params);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AuthClientError);
    }

    this.message = errObj.message ? errObj.message : "";
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.fault = errObj.$fault!;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    // this.metadata = errObj.$metadata!;
    // this.response = errObj.$response; --> causing circular object error
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.name = errObj.name;
    // this.service = errObj.$service;
    this.type = `AUTH_ERROR-${this.name}`;
  }
}

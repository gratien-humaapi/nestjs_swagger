import camelcaseKeys from "camelcase-keys";
import { DeepNonNullable, NoUndefinedField } from "src/common/types";
import {
  CognitoIdentityProvider,
  InternalErrorException
} from "@aws-sdk/client-cognito-identity-provider";

type CognitoClientType = InstanceType<typeof CognitoIdentityProvider>;

const camelCase = <T>(data: T) => camelcaseKeys(data, { deep: true });

// ### Create User type  ###  Start
type UserLoginParams = Omit<
  Parameters<CognitoClientType["adminInitiateAuth"]>[0],
  "ClientMetadata" | "AnalyticsMetadata"
  // | "ForceAliasCreation"
  // | "ClientMetadata"
  // | "UserAttributes"
  // | "UserPoolId"
>;

const userLoginParamsCamelCase = (params: DeepNonNullable<UserLoginParams>) =>
  camelCase(params);

type UserLoginParamsCamelCase = ReturnType<typeof userLoginParamsCamelCase>;

type UserLoginNormalizedParams = UserLoginParamsCamelCase;

type LoginType = Pick<UserLoginNormalizedParams, "contextData"> & {
  authParameters: { username: string; password: string };
};

// ### Create User type  ###  End

export interface ICognitoService {
  login: LoginType;
}
// ### Update User Attributes ###  End

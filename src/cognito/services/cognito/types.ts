import camelcaseKeys from "camelcase-keys";
import { DeepNonNullable, NoUndefinedField } from "src/common/types";
import { CognitoIdentityProvider } from "@aws-sdk/client-cognito-identity-provider";

type CognitoClientType = InstanceType<typeof CognitoIdentityProvider>;

const camelCase = <T extends Record<string, any> | T[]>(data: T) =>
  camelcaseKeys(data, { deep: true });

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

// type LoginType = Pick<UserLoginNormalizedParams, "contextData"> & {
type LoginType = {
  username: string;
  password: string;
};
// ### Create User type  ###  End

interface IHashSecret {
  username: string;
  clientId: string;
  clientSecret: string;
}

interface IRefreshAccessAndIDToken {
  refreshToken: string;
  /** congito sub UUID */
  sub: string;
}
interface IConfirmForgotPassword {
  /** email or phone */
  username: string;
  /** token previously sent to user */
  confirmationCode: string;
  /** the new password */
  newPassword: string;
}

interface INewPasswordRequired {
  /** session previously sent by AdminInitiateAuth */
  session: string;
  /** username */
  username: string;
  /** newPassword */
  newPassword: string;
}

interface IVerifyUserAttribute {
  /** access token with Bearer */
  accessToken: string;
  /** code to verify attribute */
  code: string;
  /** email or phone number */
  attributeName: string;
}
export interface ICognitoService {
  signIn: LoginType;
  _hashSecret: IHashSecret;
  refreshAccessAndIDToken: IRefreshAccessAndIDToken;
  confirmForgotPassword: IConfirmForgotPassword;
  newPasswordRequired: INewPasswordRequired;
  verifyUserAttribute: IVerifyUserAttribute;
  getUserAttributeVerificationCode: Omit<IVerifyUserAttribute, "code">;
}

import { AdminInitiateAuthCommandOutput } from "@aws-sdk/client-cognito-identity-provider";
import camelcaseKeys from "camelcase-keys";
import { DeepNonNullable } from "src/common";

const camelCase = <T>(data: T) => camelcaseKeys(data, { deep: true });

const adminInitiateAuthOutputCamelCase = (
  params: AdminInitiateAuthCommandOutput
) => camelCase(params);

type AdminInitiateAuthOutput = Omit<
  DeepNonNullable<ReturnType<typeof adminInitiateAuthOutputCamelCase>>,
  "$metadata"
>;

type AuthenticationResult = Pick<
  ReturnType<typeof adminInitiateAuthOutputCamelCase>,
  "authenticationResult"
>["authenticationResult"];

type NewDeviceMetadata = {
  newDeviceMetadata: NonNullable<AuthenticationResult>["newDeviceMetadata"];
};

// ## Login Start

type SignInPartialType = Omit<
  Pick<AdminInitiateAuthOutput, "authenticationResult">["authenticationResult"],
  "newDeviceMetadata"
>;

type SignInType = SignInPartialType & NewDeviceMetadata;
// ## Login End

export interface ICognitoServiceResult {
  signIn: SignInType;
}
// ### Update User Attributes ###  End

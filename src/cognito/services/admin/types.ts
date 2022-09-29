import camelcaseKeys from "camelcase-keys";
import { DeepNonNullable, NoUndefinedField } from "src/common/types";
import {
  CognitoIdentityProvider,
  InternalErrorException
} from "@aws-sdk/client-cognito-identity-provider";

type CognitoClientType = InstanceType<typeof CognitoIdentityProvider>;

export type AdminUpdateUserUserAttributeInput = {
  name: string;
  value?: string | null;
  isVerified?: boolean | null;
};

const camelCase = <T extends Record<string, any> | T[]>(data: T) =>
  camelcaseKeys(data, { deep: true });

export type AttributesCognitoType = NonNullable<
  DeepNonNullable<
    Parameters<CognitoClientType["adminCreateUser"]>[0]["UserAttributes"]
  >
>[0];

export type AttributeCognitoNormalizedType = NoUndefinedField<
  DeepNonNullable<Omit<AdminUpdateUserUserAttributeInput, "isVerified">>
> & { isVerified?: boolean };

export type PartialAttributeCognitoNormalizedType =
  AdminUpdateUserUserAttributeInput;

// ### Create User type  ###  Start
type AdminCreateUserParams = Omit<
  Parameters<CognitoClientType["adminCreateUser"]>[0],
  | "ClientMetadata"
  | "ValidationData"
  | "ForceAliasCreation"
  | "ClientMetadata"
  | "UserAttributes"
  | "UserPoolId"
>;

const adminCreateUserParamsCamelCase = (
  params: DeepNonNullable<AdminCreateUserParams>
) => camelCase(params);

type AdminCreateUserParamsCamelCase = Omit<
  ReturnType<typeof adminCreateUserParamsCamelCase>,
  "messageAction"
> & { sendPassword: boolean };

type AdminCreateUserNormalizedParams = Omit<
  AdminCreateUserParamsCamelCase,
  "desiredDeliveryMediums"
> & {
  attributes: AttributeCognitoNormalizedType[];
  desiredDeliveryMediums?: string[];
};

// ### Create User type  ###  End

// ### Delete User type  ###  Start
type AdminDeleteUserParams = Omit<
  Parameters<CognitoClientType["adminDeleteUser"]>[0],
  "UserPoolId"
>;

const adminDeleteUserParamsCamelCase = (
  params: DeepNonNullable<AdminDeleteUserParams>
) => camelCase(params);

type AdminDeleteUserParamsCamelCase = ReturnType<
  typeof adminDeleteUserParamsCamelCase
>;

type AdminDeleteUserNormalizedParams = AdminDeleteUserParamsCamelCase;

// ### Delete User type  ###  End

// ### Get User type  ###  Start
type AdminGetUserParams = Omit<
  Parameters<CognitoClientType["adminGetUser"]>[0],
  "UserPoolId"
>;

const adminGetUserParamsCamelCase = (
  params: DeepNonNullable<AdminGetUserParams>
) => camelCase(params);

type AdminGetUserParamsCamelCase = ReturnType<
  typeof adminGetUserParamsCamelCase
>;

type AdminGetUserNormalizedParams = AdminGetUserParamsCamelCase;

// ### Get User type  ###  End

// ### Confirm user signUP  ###  Start
type AdminConfirmSignUpParams = Omit<
  Parameters<CognitoClientType["adminConfirmSignUp"]>[0],
  "UserPoolId"
>;

const adminConfirmSignUpParamsCamelCase = (
  params: DeepNonNullable<AdminConfirmSignUpParams>
) => camelCase(params);

type AdminConfirmSignUpParamsCamelCase = ReturnType<
  typeof adminConfirmSignUpParamsCamelCase
>;

type AdminConfirmSignUpNormalizedParams = Omit<
  AdminConfirmSignUpParamsCamelCase,
  "clientMetadata"
>;

// ### Confirm user signUP   ###  End

// ### Create Add User to Group  ###  Start
type AdminAddUserToGroup = Omit<
  Parameters<CognitoClientType["adminAddUserToGroup"]>[0],
  "UserPoolId"
>;

const adminAddUserToGroupParamsCamelCase = (
  params: DeepNonNullable<AdminAddUserToGroup>
) => camelCase(params);

type AdminAddUserToGroupParamsCamelCase = ReturnType<
  typeof adminAddUserToGroupParamsCamelCase
>;

type AdminAddUserToGroupNormalizedParams = AdminAddUserToGroupParamsCamelCase;
// ### Create Add User to Group  ###  End

// ### Create List User's Groups ###  Start
type AdminListGroupsForUser = Omit<
  Parameters<CognitoClientType["adminListGroupsForUser"]>[0],
  "UserPoolId"
>;

const adminListGroupsForUserParamsCamelCase = (
  params: DeepNonNullable<AdminListGroupsForUser>
) => camelCase(params);

type AdminListGroupsForUserParamsCamelCase = ReturnType<
  typeof adminListGroupsForUserParamsCamelCase
>;

type AdminListGroupsForUserNormalizedParams =
  AdminListGroupsForUserParamsCamelCase;
// ### Create Add User to Group  ###  End

// ### Enable / Disable User  ###  Start
type AdminEnableUser = Omit<
  Parameters<CognitoClientType["adminEnableUser"]>[0],
  "UserPoolId"
>;

const adminEnableUserParamsCamelCase = (
  params: DeepNonNullable<AdminEnableUser>
) => camelCase(params);

type AdminEnableUserParamsCamelCase = ReturnType<
  typeof adminEnableUserParamsCamelCase
>;

type AdminEnableDisableUserNormalizedParams = AdminEnableUserParamsCamelCase;
// ### Enable / Disable User ###  End

// ### Reset User Password ###  Start
type AdminResetUserPassword = Omit<
  Parameters<CognitoClientType["adminResetUserPassword"]>[0],
  "ClientMetadata" | "UserPoolId"
>;

const adminResetUserPasswordParamsCamelCase = (
  params: DeepNonNullable<AdminResetUserPassword>
) => camelCase(params);

type AdminResetUserPasswordParamsCamelCase = ReturnType<
  typeof adminResetUserPasswordParamsCamelCase
>;

type AdminResetUserPasswordNormalizedParams =
  AdminResetUserPasswordParamsCamelCase;
// ### Reset User Password User ###  End

// ### Set User Password ###  Start
type AdminSetUserPassword = Omit<
  Parameters<CognitoClientType["adminSetUserPassword"]>[0],
  "UserPoolId"
>;

const adminSetUserPasswordParamsCamelCase = (
  params: DeepNonNullable<AdminSetUserPassword>
) => camelCase(params);

type AdminSetUserPasswordParamsCamelCase = ReturnType<
  typeof adminSetUserPasswordParamsCamelCase
>;

type AdminSetUserPasswordNormalizedParams = AdminSetUserPasswordParamsCamelCase;
// ### Set  User Password User ###  End

// ### Update User Attributes ###  Start
type AdminUpdateUserAttributes = Omit<
  Parameters<CognitoClientType["adminUpdateUserAttributes"]>[0],
  "ClientMetadata" | "UserAttributes" | "UserPoolId"
>;

const adminUpdateUserAttributesParamsCamelCase = (
  params: DeepNonNullable<AdminUpdateUserAttributes>
) => camelCase(params);

type AdminUpdateUserAttributesParamsCamelCase = ReturnType<
  typeof adminUpdateUserAttributesParamsCamelCase
>;

type AdminUpdateUserAttributesNormalizedParams =
  AdminUpdateUserAttributesParamsCamelCase & {
    attributes:
      | AttributeCognitoNormalizedType[]
      | PartialAttributeCognitoNormalizedType[];
  };
// ### Update User End ###  End

// ### Update (Access, refresh and id) tokens expire time ###  Start
interface IAdminUpdateTokensParams {
  refreshTokenValidity: number;
  accessTokenValidity: number;
}

// ### Update (Access, refresh and id) tokens expire time ###  End
export interface IAdminService {
  adminCreateUserParams: AdminCreateUserNormalizedParams;
  adminDeleteUserParams: AdminDeleteUserNormalizedParams;
  adminGetUserParams: AdminGetUserNormalizedParams;
  adminConfirmSignUpParams: AdminConfirmSignUpNormalizedParams;
  adminAddUsertoGroupParams: AdminAddUserToGroupNormalizedParams;
  adminRemoveUserFromGroupParams: AdminAddUserToGroupNormalizedParams;
  adminListGroupsForUserParams: AdminListGroupsForUserNormalizedParams;
  adminEnableUserParams: AdminEnableDisableUserNormalizedParams;
  adminDisableUserParams: AdminEnableDisableUserNormalizedParams;
  adminResetUserPasswordParams: AdminResetUserPasswordNormalizedParams;
  adminSetUserPasswordParams: AdminSetUserPasswordNormalizedParams;
  adminUpdateUserAttributesParams: AdminUpdateUserAttributesNormalizedParams;
  adminUpdateTokensExpireIn: IAdminUpdateTokensParams;
}
// ### Update User Attributes ###  End

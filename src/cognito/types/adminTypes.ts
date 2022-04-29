import camelcaseKeys from "camelcase-keys";
import { DeepNonNullable, NoUndefinedField } from "src/common/types";
import {
  CognitoIdentityProvider,
  InternalErrorException
} from "@aws-sdk/client-cognito-identity-provider";

type CognitoClientType = InstanceType<typeof CognitoIdentityProvider>;

type AdminUpdateUserUserAttributeInput = {
  name: string;
  value?: string | null;
  isVerified?: boolean | null;
};

const camelCase = <T>(data: T) => camelcaseKeys(data, { deep: true });

export type AuthClientErrorType = Omit<InternalErrorException, "name"> & {
  name: AuthExceptionName;
};

export type AttributesCognitoType = NonNullable<
  DeepNonNullable<
    Parameters<CognitoClientType["adminCreateUser"]>[0]["UserAttributes"]
  >
>[0];

export type AttributeCognitoNormalizedType = NoUndefinedField<
  DeepNonNullable<AdminUpdateUserUserAttributeInput>
>;

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

type AdminCreateUserParamsCamelCase = ReturnType<
  typeof adminCreateUserParamsCamelCase
>;

export type AdminCreateUserNormalizedParams = AdminCreateUserParamsCamelCase & {
  attributes: AttributeCognitoNormalizedType[];
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

export type AdminDeleteUserNormalizedParams = AdminDeleteUserParamsCamelCase;

// ### Delete User type  ###  End

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

export type AdminAddUserToGroupNormalizedParams =
  AdminAddUserToGroupParamsCamelCase;
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

export type AdminListGroupsForUserNormalizedParams =
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

export type AdminEnableDisableUserNormalizedParams =
  AdminEnableUserParamsCamelCase;
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

export type AdminResetUserPasswordNormalizedParams =
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

export type AdminSetUserPasswordNormalizedParams =
  AdminSetUserPasswordParamsCamelCase;
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

export type AdminUpdateUserAttributesNormalizedParams =
  AdminUpdateUserAttributesParamsCamelCase & {
    attributes:
      | AttributeCognitoNormalizedType[]
      | PartialAttributeCognitoNormalizedType[];
  };

export interface IAuthService {
  adminCreateUserParams: AdminCreateUserNormalizedParams;
  adminDeleteUserParams: AdminDeleteUserNormalizedParams;
  adminAddUsertoGroupParams: AdminAddUserToGroupNormalizedParams;
  adminRemoveUserFromGroupParams: AdminAddUserToGroupNormalizedParams;
  adminListGroupsForUserParams: AdminListGroupsForUserNormalizedParams;
  adminEnableUserParams: AdminEnableDisableUserNormalizedParams;
  adminDisableUserParams: AdminEnableDisableUserNormalizedParams;
  adminResetUserPasswordParams: AdminResetUserPasswordNormalizedParams;
  adminSetUserPasswordParams: AdminSetUserPasswordNormalizedParams;
  adminUpdateUserAttributesParams: AdminUpdateUserAttributesNormalizedParams;
}
// ### Update User Attributes ###  End
export type AuthExceptionName =
  | "InternalErrorException"
  | "InvalidParameterException"
  | "NotAuthorizedException"
  | "ResourceNotFoundException"
  | "TooManyRequestsException"
  | "UserImportInProgressException"
  | "UserNotFoundException"
  | "InvalidLambdaResponseException"
  | "LimitExceededException"
  | "TooManyFailedAttemptsException"
  | "UnexpectedLambdaException"
  | "UserLambdaValidationException"
  | "CodeDeliveryFailureException"
  | "CodeDeliveryFailureException"
  | "InvalidPasswordException"
  | "InvalidSmsRoleAccessPolicyException"
  | "InvalidSmsRoleTrustRelationshipException"
  | "PreconditionNotMetException"
  | "UnsupportedUserStateException"
  | "UsernameExistsException"
  | "AliasExistsException"
  | "InvalidUserPoolConfigurationException"
  | "MFAMethodNotFoundException"
  | "PasswordResetRequiredException"
  | "UserNotConfirmedException"
  | "UserPoolAddOnNotEnabledException"
  | "InvalidEmailRoleAccessPolicyException"
  | "CodeMismatchException"
  | "ExpiredCodeException"
  | "SoftwareTokenMFANotFoundException"
  | "ConcurrentModificationException"
  | "GroupExistsException"
  | "DuplicateProviderException"
  | "UserPoolTaggingException"
  | "InvalidOAuthFlowException"
  | "ScopeDoesNotExistException"
  | "UnsupportedIdentityProviderException"
  | "UnauthorizedException"
  | "UnsupportedOperationException"
  | "UnsupportedTokenTypeException";

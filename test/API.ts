/* eslint-disable */
/**
 * NOTE: THIS IS AN AUTO-GENERATED FILE. DO NOT MODIFY DIRECTLY.
 */
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
  /** A field whose value is a generic Universally Unique Identifier: https://en.wikipedia.org/wiki/Universally_unique_identifier. */
  UUID: any;
};

export enum CommonStatusEnum {
  Active = 'ACTIVE',
  Archived = 'ARCHIVED',
  Banned = 'BANNED',
  Pending = 'PENDING'
}

export type Company = {
  __typename?: 'Company';
  abbreviation: Scalars['String'];
  createdAt: Scalars['DateTime'];
  currency: Currency;
  description: Scalars['String'];
  headOfficeName: Scalars['String'];
  id: Scalars['UUID'];
  industryCode: Scalars['String'];
  isActive: Scalars['Boolean'];
  isGroup: Scalars['Boolean'];
  name: Scalars['String'];
  status: CommonStatusEnum;
  updatedAt: Scalars['DateTime'];
};

export type CreateCompanyInput = {
  abbreviation: Scalars['String'];
  currencyId: Scalars['UUID'];
  description?: InputMaybe<Scalars['String']>;
  headOfficeId?: InputMaybe<Scalars['UUID']>;
  industryCode: Scalars['String'];
  name: Scalars['String'];
  status: CommonStatusEnum;
};

export type CreateCurrencyInput = {
  code: Scalars['String'];
  format: Scalars['String'];
  fraction: Scalars['String'];
  fractionUnit: Scalars['Float'];
  isActive?: InputMaybe<Scalars['Boolean']>;
  name: Scalars['String'];
  symbol: Scalars['String'];
};

export type CreateStudentInput = {
  age?: InputMaybe<Scalars['Float']>;
  email: Scalars['String'];
  name: Scalars['String'];
};

export type CreateTenantInput = {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  status: CommonStatusEnum;
};

export type CreateUserInput = {
  description?: InputMaybe<Scalars['String']>;
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  modifiedBy: Scalars['String'];
  onlineStatus?: InputMaybe<OnlineStatusEnum>;
  photoURL: Scalars['String'];
  status: UserStatusEnum;
  timeZone: Scalars['String'];
  type: UserTypeEnum;
};

export type Currency = {
  __typename?: 'Currency';
  code: Scalars['String'];
  createdAt: Scalars['DateTime'];
  format: Scalars['String'];
  fraction: Scalars['String'];
  fractionUnit: Scalars['Float'];
  id: Scalars['UUID'];
  isActive: Scalars['Boolean'];
  name: Scalars['String'];
  symbol: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Mutation = {
  __typename?: 'Mutation';
  adminCreateCompany: Company;
  createCompany: Company;
  createCurrency: Currency;
  createStudent: Student;
  createTenant: Tenant;
  createUser: User;
  removeCompany: Company;
  removeCurrency: Currency;
  removeStudent: Student;
  removeTenant: Tenant;
  removeUser: User;
  updateCompany: Company;
  updateCurrency: Currency;
  updateStudent: Student;
  updateTenant: Tenant;
  updateUser: User;
};


export type MutationAdminCreateCompanyArgs = {
  input: CreateCompanyInput;
};


export type MutationCreateCompanyArgs = {
  input: CreateCompanyInput;
};


export type MutationCreateCurrencyArgs = {
  input: CreateCurrencyInput;
};


export type MutationCreateStudentArgs = {
  input: CreateStudentInput;
};


export type MutationCreateTenantArgs = {
  input: CreateTenantInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationRemoveCompanyArgs = {
  id: Scalars['UUID'];
};


export type MutationRemoveCurrencyArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveStudentArgs = {
  id: Scalars['UUID'];
};


export type MutationRemoveTenantArgs = {
  id: Scalars['UUID'];
};


export type MutationRemoveUserArgs = {
  id: Scalars['UUID'];
};


export type MutationUpdateCompanyArgs = {
  input: UpdateCompanyInput;
};


export type MutationUpdateCurrencyArgs = {
  input: UpdateCurrencyInput;
};


export type MutationUpdateStudentArgs = {
  input: UpdateStudentInput;
};


export type MutationUpdateTenantArgs = {
  input: UpdateTenantInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

export enum OnlineStatusEnum {
  Absent = 'ABSENT',
  Busy = 'BUSY',
  DoNotDisturb = 'DO_NOT_DISTURB',
  Offline = 'OFFLINE',
  Online = 'ONLINE'
}

export type Query = {
  __typename?: 'Query';
  companies: Array<Company>;
  companiesByName: Array<Company>;
  company: Company;
  companyByName: Company;
  currencies: Array<Currency>;
  currency: Currency;
  currencyByCode: Currency;
  student: Student;
  students: Array<Student>;
  tenant: Tenant;
  tenants: Array<Tenant>;
  user: User;
  users: Array<User>;
};


export type QueryCompaniesByNameArgs = {
  name: Scalars['String'];
};


export type QueryCompanyArgs = {
  id: Scalars['UUID'];
};


export type QueryCompanyByNameArgs = {
  name: Scalars['String'];
};


export type QueryCurrencyArgs = {
  id: Scalars['Int'];
};


export type QueryCurrencyByCodeArgs = {
  code: Scalars['String'];
};


export type QueryStudentArgs = {
  id: Scalars['UUID'];
};


export type QueryTenantArgs = {
  id: Scalars['UUID'];
};


export type QueryUserArgs = {
  id: Scalars['UUID'];
};

export type Student = {
  __typename?: 'Student';
  age?: Maybe<Scalars['Float']>;
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['UUID'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Tenant = {
  __typename?: 'Tenant';
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['UUID'];
  isActive: Scalars['Boolean'];
  name: Scalars['String'];
  status: CommonStatusEnum;
  updatedAt: Scalars['DateTime'];
};

export type UpdateCompanyInput = {
  abbreviation: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
  industryCode: Scalars['String'];
  name: Scalars['String'];
  status: CommonStatusEnum;
};

export type UpdateCurrencyInput = {
  code: Scalars['String'];
  format: Scalars['String'];
  fraction: Scalars['String'];
  fractionUnit: Scalars['Float'];
  id: Scalars['UUID'];
  isActive?: InputMaybe<Scalars['Boolean']>;
  name: Scalars['String'];
  symbol: Scalars['String'];
};

export type UpdateStudentInput = {
  age?: InputMaybe<Scalars['Float']>;
  email: Scalars['String'];
  id: Scalars['UUID'];
  name: Scalars['String'];
};

export type UpdateTenantInput = {
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
  name: Scalars['String'];
  status: CommonStatusEnum;
};

export type UpdateUserInput = {
  description?: InputMaybe<Scalars['String']>;
  firstName: Scalars['String'];
  id: Scalars['UUID'];
  lastName: Scalars['String'];
  modifiedBy: Scalars['String'];
  onlineStatus?: InputMaybe<OnlineStatusEnum>;
  photoURL: Scalars['String'];
  status: UserStatusEnum;
  timeZone: Scalars['String'];
  type: UserTypeEnum;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['UUID'];
  isActive: Scalars['Boolean'];
  lastName: Scalars['String'];
  modifiedBy: Scalars['String'];
  onlineStatus: OnlineStatusEnum;
  photoURL: Scalars['String'];
  status: UserStatusEnum;
  timeZone: Scalars['String'];
  type: UserTypeEnum;
  updatedAt: Scalars['DateTime'];
};

export enum UserStatusEnum {
  Active = 'ACTIVE',
  Archived = 'ARCHIVED',
  Banned = 'BANNED',
  Compromised = 'COMPROMISED',
  Pending = 'PENDING'
}

export enum UserTypeEnum {
  Admin = 'ADMIN',
  Arris = 'ARRIS',
  Contractor = 'CONTRACTOR',
  Customer = 'CUSTOMER'
}

export type AdminCreateCompanyMutationVariables = Exact<{
  input: CreateCompanyInput;
}>;


export type AdminCreateCompanyMutation = { __typename?: 'Mutation', adminCreateCompany: { __typename?: 'Company', id: any, createdAt: any, updatedAt: any, headOfficeName: string, isActive: boolean, status: CommonStatusEnum, name: string, abbreviation: string, isGroup: boolean, industryCode: string, description: string, currency: { __typename?: 'Currency', id: any, createdAt: any, updatedAt: any, isActive: boolean, code: string, name: string, symbol: string, fractionUnit: number, fraction: string, format: string } } };

export type CreateCompanyMutationVariables = Exact<{
  input: CreateCompanyInput;
}>;


export type CreateCompanyMutation = { __typename?: 'Mutation', createCompany: { __typename?: 'Company', id: any, createdAt: any, updatedAt: any, headOfficeName: string, isActive: boolean, status: CommonStatusEnum, name: string, abbreviation: string, isGroup: boolean, industryCode: string, description: string, currency: { __typename?: 'Currency', id: any, createdAt: any, updatedAt: any, isActive: boolean, code: string, name: string, symbol: string, fractionUnit: number, fraction: string, format: string } } };

export type UpdateCompanyMutationVariables = Exact<{
  input: UpdateCompanyInput;
}>;


export type UpdateCompanyMutation = { __typename?: 'Mutation', updateCompany: { __typename?: 'Company', id: any, createdAt: any, updatedAt: any, headOfficeName: string, isActive: boolean, status: CommonStatusEnum, name: string, abbreviation: string, isGroup: boolean, industryCode: string, description: string, currency: { __typename?: 'Currency', id: any, createdAt: any, updatedAt: any, isActive: boolean, code: string, name: string, symbol: string, fractionUnit: number, fraction: string, format: string } } };

export type RemoveCompanyMutationVariables = Exact<{
  id: Scalars['UUID'];
}>;


export type RemoveCompanyMutation = { __typename?: 'Mutation', removeCompany: { __typename?: 'Company', id: any, createdAt: any, updatedAt: any, headOfficeName: string, isActive: boolean, status: CommonStatusEnum, name: string, abbreviation: string, isGroup: boolean, industryCode: string, description: string, currency: { __typename?: 'Currency', id: any, createdAt: any, updatedAt: any, isActive: boolean, code: string, name: string, symbol: string, fractionUnit: number, fraction: string, format: string } } };

export type CreateStudentMutationVariables = Exact<{
  input: CreateStudentInput;
}>;


export type CreateStudentMutation = { __typename?: 'Mutation', createStudent: { __typename?: 'Student', id: any, createdAt: any, updatedAt: any, name: string, email: string, age?: number | null } };

export type UpdateStudentMutationVariables = Exact<{
  input: UpdateStudentInput;
}>;


export type UpdateStudentMutation = { __typename?: 'Mutation', updateStudent: { __typename?: 'Student', id: any, createdAt: any, updatedAt: any, name: string, email: string, age?: number | null } };

export type RemoveStudentMutationVariables = Exact<{
  id: Scalars['UUID'];
}>;


export type RemoveStudentMutation = { __typename?: 'Mutation', removeStudent: { __typename?: 'Student', id: any, createdAt: any, updatedAt: any, name: string, email: string, age?: number | null } };

export type CreateCurrencyMutationVariables = Exact<{
  input: CreateCurrencyInput;
}>;


export type CreateCurrencyMutation = { __typename?: 'Mutation', createCurrency: { __typename?: 'Currency', id: any, createdAt: any, updatedAt: any, isActive: boolean, code: string, name: string, symbol: string, fractionUnit: number, fraction: string, format: string } };

export type UpdateCurrencyMutationVariables = Exact<{
  input: UpdateCurrencyInput;
}>;


export type UpdateCurrencyMutation = { __typename?: 'Mutation', updateCurrency: { __typename?: 'Currency', id: any, createdAt: any, updatedAt: any, isActive: boolean, code: string, name: string, symbol: string, fractionUnit: number, fraction: string, format: string } };

export type RemoveCurrencyMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type RemoveCurrencyMutation = { __typename?: 'Mutation', removeCurrency: { __typename?: 'Currency', id: any, createdAt: any, updatedAt: any, isActive: boolean, code: string, name: string, symbol: string, fractionUnit: number, fraction: string, format: string } };

export type CreateTenantMutationVariables = Exact<{
  input: CreateTenantInput;
}>;


export type CreateTenantMutation = { __typename?: 'Mutation', createTenant: { __typename?: 'Tenant', id: any, createdAt: any, updatedAt: any, isActive: boolean, status: CommonStatusEnum, name: string, description: string } };

export type UpdateTenantMutationVariables = Exact<{
  input: UpdateTenantInput;
}>;


export type UpdateTenantMutation = { __typename?: 'Mutation', updateTenant: { __typename?: 'Tenant', id: any, createdAt: any, updatedAt: any, isActive: boolean, status: CommonStatusEnum, name: string, description: string } };

export type RemoveTenantMutationVariables = Exact<{
  id: Scalars['UUID'];
}>;


export type RemoveTenantMutation = { __typename?: 'Mutation', removeTenant: { __typename?: 'Tenant', id: any, createdAt: any, updatedAt: any, isActive: boolean, status: CommonStatusEnum, name: string, description: string } };

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: any, createdAt: any, updatedAt: any, modifiedBy: string, isActive: boolean, type: UserTypeEnum, status: UserStatusEnum, onlineStatus: OnlineStatusEnum, timeZone: string, photoURL: string, firstName: string, lastName: string, description: string } };

export type UpdateUserMutationVariables = Exact<{
  input: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: any, createdAt: any, updatedAt: any, modifiedBy: string, isActive: boolean, type: UserTypeEnum, status: UserStatusEnum, onlineStatus: OnlineStatusEnum, timeZone: string, photoURL: string, firstName: string, lastName: string, description: string } };

export type RemoveUserMutationVariables = Exact<{
  id: Scalars['UUID'];
}>;


export type RemoveUserMutation = { __typename?: 'Mutation', removeUser: { __typename?: 'User', id: any, createdAt: any, updatedAt: any, modifiedBy: string, isActive: boolean, type: UserTypeEnum, status: UserStatusEnum, onlineStatus: OnlineStatusEnum, timeZone: string, photoURL: string, firstName: string, lastName: string, description: string } };

export type CompaniesQueryVariables = Exact<{ [key: string]: never; }>;


export type CompaniesQuery = { __typename?: 'Query', companies: Array<{ __typename?: 'Company', id: any, createdAt: any, updatedAt: any, headOfficeName: string, isActive: boolean, status: CommonStatusEnum, name: string, abbreviation: string, isGroup: boolean, industryCode: string, description: string, currency: { __typename?: 'Currency', id: any, createdAt: any, updatedAt: any, isActive: boolean, code: string, name: string, symbol: string, fractionUnit: number, fraction: string, format: string } }> };

export type CompaniesByNameQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type CompaniesByNameQuery = { __typename?: 'Query', companiesByName: Array<{ __typename?: 'Company', id: any, createdAt: any, updatedAt: any, headOfficeName: string, isActive: boolean, status: CommonStatusEnum, name: string, abbreviation: string, isGroup: boolean, industryCode: string, description: string, currency: { __typename?: 'Currency', id: any, createdAt: any, updatedAt: any, isActive: boolean, code: string, name: string, symbol: string, fractionUnit: number, fraction: string, format: string } }> };

export type CompanyQueryVariables = Exact<{
  id: Scalars['UUID'];
}>;


export type CompanyQuery = { __typename?: 'Query', company: { __typename?: 'Company', id: any, createdAt: any, updatedAt: any, headOfficeName: string, isActive: boolean, status: CommonStatusEnum, name: string, abbreviation: string, isGroup: boolean, industryCode: string, description: string, currency: { __typename?: 'Currency', id: any, createdAt: any, updatedAt: any, isActive: boolean, code: string, name: string, symbol: string, fractionUnit: number, fraction: string, format: string } } };

export type CompanyByNameQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type CompanyByNameQuery = { __typename?: 'Query', companyByName: { __typename?: 'Company', id: any, createdAt: any, updatedAt: any, headOfficeName: string, isActive: boolean, status: CommonStatusEnum, name: string, abbreviation: string, isGroup: boolean, industryCode: string, description: string, currency: { __typename?: 'Currency', id: any, createdAt: any, updatedAt: any, isActive: boolean, code: string, name: string, symbol: string, fractionUnit: number, fraction: string, format: string } } };

export type StudentsQueryVariables = Exact<{ [key: string]: never; }>;


export type StudentsQuery = { __typename?: 'Query', students: Array<{ __typename?: 'Student', id: any, createdAt: any, updatedAt: any, name: string, email: string, age?: number | null }> };

export type StudentQueryVariables = Exact<{
  id: Scalars['UUID'];
}>;


export type StudentQuery = { __typename?: 'Query', student: { __typename?: 'Student', id: any, createdAt: any, updatedAt: any, name: string, email: string, age?: number | null } };

export type CurrenciesQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrenciesQuery = { __typename?: 'Query', currencies: Array<{ __typename?: 'Currency', id: any, createdAt: any, updatedAt: any, isActive: boolean, code: string, name: string, symbol: string, fractionUnit: number, fraction: string, format: string }> };

export type CurrencyQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type CurrencyQuery = { __typename?: 'Query', currency: { __typename?: 'Currency', id: any, createdAt: any, updatedAt: any, isActive: boolean, code: string, name: string, symbol: string, fractionUnit: number, fraction: string, format: string } };

export type CurrencyByCodeQueryVariables = Exact<{
  code: Scalars['String'];
}>;


export type CurrencyByCodeQuery = { __typename?: 'Query', currencyByCode: { __typename?: 'Currency', id: any, createdAt: any, updatedAt: any, isActive: boolean, code: string, name: string, symbol: string, fractionUnit: number, fraction: string, format: string } };

export type TenantsQueryVariables = Exact<{ [key: string]: never; }>;


export type TenantsQuery = { __typename?: 'Query', tenants: Array<{ __typename?: 'Tenant', id: any, createdAt: any, updatedAt: any, isActive: boolean, status: CommonStatusEnum, name: string, description: string }> };

export type TenantQueryVariables = Exact<{
  id: Scalars['UUID'];
}>;


export type TenantQuery = { __typename?: 'Query', tenant: { __typename?: 'Tenant', id: any, createdAt: any, updatedAt: any, isActive: boolean, status: CommonStatusEnum, name: string, description: string } };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: any, createdAt: any, updatedAt: any, modifiedBy: string, isActive: boolean, type: UserTypeEnum, status: UserStatusEnum, onlineStatus: OnlineStatusEnum, timeZone: string, photoURL: string, firstName: string, lastName: string, description: string }> };

export type UserQueryVariables = Exact<{
  id: Scalars['UUID'];
}>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: any, createdAt: any, updatedAt: any, modifiedBy: string, isActive: boolean, type: UserTypeEnum, status: UserStatusEnum, onlineStatus: OnlineStatusEnum, timeZone: string, photoURL: string, firstName: string, lastName: string, description: string } };


export const AdminCreateCompanyDocument = gql`
    mutation adminCreateCompany($input: CreateCompanyInput!) {
  adminCreateCompany(input: $input) {
    id
    createdAt
    updatedAt
    headOfficeName
    isActive
    status
    name
    abbreviation
    isGroup
    industryCode
    description
    currency {
      id
      createdAt
      updatedAt
      isActive
      code
      name
      symbol
      fractionUnit
      fraction
      format
    }
  }
}
    `;
export const CreateCompanyDocument = gql`
    mutation createCompany($input: CreateCompanyInput!) {
  createCompany(input: $input) {
    id
    createdAt
    updatedAt
    headOfficeName
    isActive
    status
    name
    abbreviation
    isGroup
    industryCode
    description
    currency {
      id
      createdAt
      updatedAt
      isActive
      code
      name
      symbol
      fractionUnit
      fraction
      format
    }
  }
}
    `;
export const UpdateCompanyDocument = gql`
    mutation updateCompany($input: UpdateCompanyInput!) {
  updateCompany(input: $input) {
    id
    createdAt
    updatedAt
    headOfficeName
    isActive
    status
    name
    abbreviation
    isGroup
    industryCode
    description
    currency {
      id
      createdAt
      updatedAt
      isActive
      code
      name
      symbol
      fractionUnit
      fraction
      format
    }
  }
}
    `;
export const RemoveCompanyDocument = gql`
    mutation removeCompany($id: UUID!) {
  removeCompany(id: $id) {
    id
    createdAt
    updatedAt
    headOfficeName
    isActive
    status
    name
    abbreviation
    isGroup
    industryCode
    description
    currency {
      id
      createdAt
      updatedAt
      isActive
      code
      name
      symbol
      fractionUnit
      fraction
      format
    }
  }
}
    `;
export const CreateStudentDocument = gql`
    mutation createStudent($input: CreateStudentInput!) {
  createStudent(input: $input) {
    id
    createdAt
    updatedAt
    name
    email
    age
  }
}
    `;
export const UpdateStudentDocument = gql`
    mutation updateStudent($input: UpdateStudentInput!) {
  updateStudent(input: $input) {
    id
    createdAt
    updatedAt
    name
    email
    age
  }
}
    `;
export const RemoveStudentDocument = gql`
    mutation removeStudent($id: UUID!) {
  removeStudent(id: $id) {
    id
    createdAt
    updatedAt
    name
    email
    age
  }
}
    `;
export const CreateCurrencyDocument = gql`
    mutation createCurrency($input: CreateCurrencyInput!) {
  createCurrency(input: $input) {
    id
    createdAt
    updatedAt
    isActive
    code
    name
    symbol
    fractionUnit
    fraction
    format
  }
}
    `;
export const UpdateCurrencyDocument = gql`
    mutation updateCurrency($input: UpdateCurrencyInput!) {
  updateCurrency(input: $input) {
    id
    createdAt
    updatedAt
    isActive
    code
    name
    symbol
    fractionUnit
    fraction
    format
  }
}
    `;
export const RemoveCurrencyDocument = gql`
    mutation removeCurrency($id: Int!) {
  removeCurrency(id: $id) {
    id
    createdAt
    updatedAt
    isActive
    code
    name
    symbol
    fractionUnit
    fraction
    format
  }
}
    `;
export const CreateTenantDocument = gql`
    mutation createTenant($input: CreateTenantInput!) {
  createTenant(input: $input) {
    id
    createdAt
    updatedAt
    isActive
    status
    name
    description
  }
}
    `;
export const UpdateTenantDocument = gql`
    mutation updateTenant($input: UpdateTenantInput!) {
  updateTenant(input: $input) {
    id
    createdAt
    updatedAt
    isActive
    status
    name
    description
  }
}
    `;
export const RemoveTenantDocument = gql`
    mutation removeTenant($id: UUID!) {
  removeTenant(id: $id) {
    id
    createdAt
    updatedAt
    isActive
    status
    name
    description
  }
}
    `;
export const CreateUserDocument = gql`
    mutation createUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    createdAt
    updatedAt
    modifiedBy
    isActive
    type
    status
    onlineStatus
    timeZone
    photoURL
    firstName
    lastName
    description
  }
}
    `;
export const UpdateUserDocument = gql`
    mutation updateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
    id
    createdAt
    updatedAt
    modifiedBy
    isActive
    type
    status
    onlineStatus
    timeZone
    photoURL
    firstName
    lastName
    description
  }
}
    `;
export const RemoveUserDocument = gql`
    mutation removeUser($id: UUID!) {
  removeUser(id: $id) {
    id
    createdAt
    updatedAt
    modifiedBy
    isActive
    type
    status
    onlineStatus
    timeZone
    photoURL
    firstName
    lastName
    description
  }
}
    `;
export const CompaniesDocument = gql`
    query companies {
  companies {
    id
    createdAt
    updatedAt
    headOfficeName
    isActive
    status
    name
    abbreviation
    isGroup
    industryCode
    description
    currency {
      id
      createdAt
      updatedAt
      isActive
      code
      name
      symbol
      fractionUnit
      fraction
      format
    }
  }
}
    `;
export const CompaniesByNameDocument = gql`
    query companiesByName($name: String!) {
  companiesByName(name: $name) {
    id
    createdAt
    updatedAt
    headOfficeName
    isActive
    status
    name
    abbreviation
    isGroup
    industryCode
    description
    currency {
      id
      createdAt
      updatedAt
      isActive
      code
      name
      symbol
      fractionUnit
      fraction
      format
    }
  }
}
    `;
export const CompanyDocument = gql`
    query company($id: UUID!) {
  company(id: $id) {
    id
    createdAt
    updatedAt
    headOfficeName
    isActive
    status
    name
    abbreviation
    isGroup
    industryCode
    description
    currency {
      id
      createdAt
      updatedAt
      isActive
      code
      name
      symbol
      fractionUnit
      fraction
      format
    }
  }
}
    `;
export const CompanyByNameDocument = gql`
    query companyByName($name: String!) {
  companyByName(name: $name) {
    id
    createdAt
    updatedAt
    headOfficeName
    isActive
    status
    name
    abbreviation
    isGroup
    industryCode
    description
    currency {
      id
      createdAt
      updatedAt
      isActive
      code
      name
      symbol
      fractionUnit
      fraction
      format
    }
  }
}
    `;
export const StudentsDocument = gql`
    query students {
  students {
    id
    createdAt
    updatedAt
    name
    email
    age
  }
}
    `;
export const StudentDocument = gql`
    query student($id: UUID!) {
  student(id: $id) {
    id
    createdAt
    updatedAt
    name
    email
    age
  }
}
    `;
export const CurrenciesDocument = gql`
    query currencies {
  currencies {
    id
    createdAt
    updatedAt
    isActive
    code
    name
    symbol
    fractionUnit
    fraction
    format
  }
}
    `;
export const CurrencyDocument = gql`
    query currency($id: Int!) {
  currency(id: $id) {
    id
    createdAt
    updatedAt
    isActive
    code
    name
    symbol
    fractionUnit
    fraction
    format
  }
}
    `;
export const CurrencyByCodeDocument = gql`
    query currencyByCode($code: String!) {
  currencyByCode(code: $code) {
    id
    createdAt
    updatedAt
    isActive
    code
    name
    symbol
    fractionUnit
    fraction
    format
  }
}
    `;
export const TenantsDocument = gql`
    query tenants {
  tenants {
    id
    createdAt
    updatedAt
    isActive
    status
    name
    description
  }
}
    `;
export const TenantDocument = gql`
    query tenant($id: UUID!) {
  tenant(id: $id) {
    id
    createdAt
    updatedAt
    isActive
    status
    name
    description
  }
}
    `;
export const UsersDocument = gql`
    query users {
  users {
    id
    createdAt
    updatedAt
    modifiedBy
    isActive
    type
    status
    onlineStatus
    timeZone
    photoURL
    firstName
    lastName
    description
  }
}
    `;
export const UserDocument = gql`
    query user($id: UUID!) {
  user(id: $id) {
    id
    createdAt
    updatedAt
    modifiedBy
    isActive
    type
    status
    onlineStatus
    timeZone
    photoURL
    firstName
    lastName
    description
  }
}
    `;
export type Requester<C = {}, E = unknown> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>
export function getSdk<C, E>(requester: Requester<C, E>) {
  return {
    adminCreateCompany(variables: AdminCreateCompanyMutationVariables, options?: C): Promise<AdminCreateCompanyMutation> {
      return requester<AdminCreateCompanyMutation, AdminCreateCompanyMutationVariables>(AdminCreateCompanyDocument, variables, options) as Promise<AdminCreateCompanyMutation>;
    },
    createCompany(variables: CreateCompanyMutationVariables, options?: C): Promise<CreateCompanyMutation> {
      return requester<CreateCompanyMutation, CreateCompanyMutationVariables>(CreateCompanyDocument, variables, options) as Promise<CreateCompanyMutation>;
    },
    updateCompany(variables: UpdateCompanyMutationVariables, options?: C): Promise<UpdateCompanyMutation> {
      return requester<UpdateCompanyMutation, UpdateCompanyMutationVariables>(UpdateCompanyDocument, variables, options) as Promise<UpdateCompanyMutation>;
    },
    removeCompany(variables: RemoveCompanyMutationVariables, options?: C): Promise<RemoveCompanyMutation> {
      return requester<RemoveCompanyMutation, RemoveCompanyMutationVariables>(RemoveCompanyDocument, variables, options) as Promise<RemoveCompanyMutation>;
    },
    createStudent(variables: CreateStudentMutationVariables, options?: C): Promise<CreateStudentMutation> {
      return requester<CreateStudentMutation, CreateStudentMutationVariables>(CreateStudentDocument, variables, options) as Promise<CreateStudentMutation>;
    },
    updateStudent(variables: UpdateStudentMutationVariables, options?: C): Promise<UpdateStudentMutation> {
      return requester<UpdateStudentMutation, UpdateStudentMutationVariables>(UpdateStudentDocument, variables, options) as Promise<UpdateStudentMutation>;
    },
    removeStudent(variables: RemoveStudentMutationVariables, options?: C): Promise<RemoveStudentMutation> {
      return requester<RemoveStudentMutation, RemoveStudentMutationVariables>(RemoveStudentDocument, variables, options) as Promise<RemoveStudentMutation>;
    },
    createCurrency(variables: CreateCurrencyMutationVariables, options?: C): Promise<CreateCurrencyMutation> {
      return requester<CreateCurrencyMutation, CreateCurrencyMutationVariables>(CreateCurrencyDocument, variables, options) as Promise<CreateCurrencyMutation>;
    },
    updateCurrency(variables: UpdateCurrencyMutationVariables, options?: C): Promise<UpdateCurrencyMutation> {
      return requester<UpdateCurrencyMutation, UpdateCurrencyMutationVariables>(UpdateCurrencyDocument, variables, options) as Promise<UpdateCurrencyMutation>;
    },
    removeCurrency(variables: RemoveCurrencyMutationVariables, options?: C): Promise<RemoveCurrencyMutation> {
      return requester<RemoveCurrencyMutation, RemoveCurrencyMutationVariables>(RemoveCurrencyDocument, variables, options) as Promise<RemoveCurrencyMutation>;
    },
    createTenant(variables: CreateTenantMutationVariables, options?: C): Promise<CreateTenantMutation> {
      return requester<CreateTenantMutation, CreateTenantMutationVariables>(CreateTenantDocument, variables, options) as Promise<CreateTenantMutation>;
    },
    updateTenant(variables: UpdateTenantMutationVariables, options?: C): Promise<UpdateTenantMutation> {
      return requester<UpdateTenantMutation, UpdateTenantMutationVariables>(UpdateTenantDocument, variables, options) as Promise<UpdateTenantMutation>;
    },
    removeTenant(variables: RemoveTenantMutationVariables, options?: C): Promise<RemoveTenantMutation> {
      return requester<RemoveTenantMutation, RemoveTenantMutationVariables>(RemoveTenantDocument, variables, options) as Promise<RemoveTenantMutation>;
    },
    createUser(variables: CreateUserMutationVariables, options?: C): Promise<CreateUserMutation> {
      return requester<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, variables, options) as Promise<CreateUserMutation>;
    },
    updateUser(variables: UpdateUserMutationVariables, options?: C): Promise<UpdateUserMutation> {
      return requester<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, variables, options) as Promise<UpdateUserMutation>;
    },
    removeUser(variables: RemoveUserMutationVariables, options?: C): Promise<RemoveUserMutation> {
      return requester<RemoveUserMutation, RemoveUserMutationVariables>(RemoveUserDocument, variables, options) as Promise<RemoveUserMutation>;
    },
    companies(variables?: CompaniesQueryVariables, options?: C): Promise<CompaniesQuery> {
      return requester<CompaniesQuery, CompaniesQueryVariables>(CompaniesDocument, variables, options) as Promise<CompaniesQuery>;
    },
    companiesByName(variables: CompaniesByNameQueryVariables, options?: C): Promise<CompaniesByNameQuery> {
      return requester<CompaniesByNameQuery, CompaniesByNameQueryVariables>(CompaniesByNameDocument, variables, options) as Promise<CompaniesByNameQuery>;
    },
    company(variables: CompanyQueryVariables, options?: C): Promise<CompanyQuery> {
      return requester<CompanyQuery, CompanyQueryVariables>(CompanyDocument, variables, options) as Promise<CompanyQuery>;
    },
    companyByName(variables: CompanyByNameQueryVariables, options?: C): Promise<CompanyByNameQuery> {
      return requester<CompanyByNameQuery, CompanyByNameQueryVariables>(CompanyByNameDocument, variables, options) as Promise<CompanyByNameQuery>;
    },
    students(variables?: StudentsQueryVariables, options?: C): Promise<StudentsQuery> {
      return requester<StudentsQuery, StudentsQueryVariables>(StudentsDocument, variables, options) as Promise<StudentsQuery>;
    },
    student(variables: StudentQueryVariables, options?: C): Promise<StudentQuery> {
      return requester<StudentQuery, StudentQueryVariables>(StudentDocument, variables, options) as Promise<StudentQuery>;
    },
    currencies(variables?: CurrenciesQueryVariables, options?: C): Promise<CurrenciesQuery> {
      return requester<CurrenciesQuery, CurrenciesQueryVariables>(CurrenciesDocument, variables, options) as Promise<CurrenciesQuery>;
    },
    currency(variables: CurrencyQueryVariables, options?: C): Promise<CurrencyQuery> {
      return requester<CurrencyQuery, CurrencyQueryVariables>(CurrencyDocument, variables, options) as Promise<CurrencyQuery>;
    },
    currencyByCode(variables: CurrencyByCodeQueryVariables, options?: C): Promise<CurrencyByCodeQuery> {
      return requester<CurrencyByCodeQuery, CurrencyByCodeQueryVariables>(CurrencyByCodeDocument, variables, options) as Promise<CurrencyByCodeQuery>;
    },
    tenants(variables?: TenantsQueryVariables, options?: C): Promise<TenantsQuery> {
      return requester<TenantsQuery, TenantsQueryVariables>(TenantsDocument, variables, options) as Promise<TenantsQuery>;
    },
    tenant(variables: TenantQueryVariables, options?: C): Promise<TenantQuery> {
      return requester<TenantQuery, TenantQueryVariables>(TenantDocument, variables, options) as Promise<TenantQuery>;
    },
    users(variables?: UsersQueryVariables, options?: C): Promise<UsersQuery> {
      return requester<UsersQuery, UsersQueryVariables>(UsersDocument, variables, options) as Promise<UsersQuery>;
    },
    user(variables: UserQueryVariables, options?: C): Promise<UserQuery> {
      return requester<UserQuery, UserQueryVariables>(UserDocument, variables, options) as Promise<UserQuery>;
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;
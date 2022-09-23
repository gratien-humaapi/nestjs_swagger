/* eslint-disable @typescript-eslint/no-explicit-any */
enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC"
}

export interface AsyncListInput {
  filter: object;
  limit?: number;
  nextToken?: string;
}
export interface AsyncSortInput {
  [key: string]: any;
  sortDirection?: ModelSortDirection;
  filter?: object;
  limit?: number;
  nextToken?: string;
}

export interface IGqlGetInput {
  id: string;
  inputgql: string;
}

export interface IGqlMutationInput {
  input: Record<string, any>;
  inputgql: string;
}

export interface IGqlLisInput {
  inputgql: string;
}

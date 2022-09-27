/* eslint-disable no-case-declarations */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-shadow */
import {
  ApolloClient,
  createHttpLink,
  gql,
  InMemoryCache,
  NormalizedCacheObject
} from "@apollo/client/core";
import { setContext } from "@apollo/client/link/context";
import fetch from "cross-fetch";
import { IGqlGetInput, IGqlLisInput, IGqlMutationInput } from "../utils";

interface IGraphqlClient {
  url: string;
  accessToken: string;
}
export class GraphqlClient {
  private _accesToken: string;

  private _client: ApolloClient<NormalizedCacheObject>;

  constructor(params: IGraphqlClient) {
    const { url, accessToken } = params;
    this._accesToken = accessToken;
    const authLink = setContext((_, { headers }) => ({
      headers: {
        ...headers,
        authorization: this._accesToken ? `Bearer ${this._accesToken}` : ""
      }
    }));

    const link = createHttpLink({
      uri: `${url}/graphql`,
      fetch
    });

    this._client = new ApolloClient({
      link: authLink.concat(link),
      cache: new InMemoryCache()
    });
  }

  // generic async function asyncGql query get
  asyncQueryGet = async <T>(params: IGqlGetInput) => {
    const { id, inputgql } = params;
    const variables = { id };

    const query = gql`
      ${inputgql}
    `;
    const res = await this._client.query<T>({
      query,
      variables
    });
    return res;
  };

  // generic async function asyncGql mutation
  asyncMutation = async <T>(params: IGqlMutationInput) => {
    const { input, inputgql } = params;
    const variables = { input };
    const mutation = gql`
      ${inputgql}
    `;

    const res = await this._client.mutate<T>({
      mutation,
      variables
    });
    return res?.data;
  };

  asyncList = async <T>(params: IGqlLisInput) => {
    const { inputgql } = params;
    // const variables = { input };
    const query = gql`
      ${inputgql}
    `;

    const res = await this._client.query<T>({
      query
      // variables
    });
    return res?.data;
  };
}

export const graphqlClient = (params: IGraphqlClient) =>
  new GraphqlClient(params);

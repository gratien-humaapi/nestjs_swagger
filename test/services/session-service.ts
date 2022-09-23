import {
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from "@apollo/client/core";
import { setContext } from "@apollo/client/link/context";
import fetch from "cross-fetch";
import { getSdkApollo } from "../utils";
import { authService, I$AuthService } from "./$auth-service";
import { graphqlClient } from "./graphql-client";

interface ISessionService {
  url: string;
  authParams: I$AuthService["signInParam"];
}

export const sessionFactory = async (params: ISessionService) => {
  const { url, authParams } = params;
  const auth = authService(url);
  const res = await auth.signIn({ ...authParams });

  // Apollo
  const accessToken = res.idToken;
  const authLink = setContext((_, { headers }) => ({
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : ""
    }
  }));

  const link = createHttpLink({
    uri: `${url}/graphql`,
    fetch
  });

  const client = new ApolloClient({
    link: authLink.concat(link),
    cache: new InMemoryCache()
  });

  // const client = graphqlClient({ url, accessToken: res.idToken });
  return getSdkApollo(client);
  // return client;
};

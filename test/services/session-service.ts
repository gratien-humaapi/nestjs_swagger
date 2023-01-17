import {
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from "@apollo/client/core";
import { setContext } from "@apollo/client/link/context";
import fetch from "cross-fetch";
import { getSdkApollo, IHMAuthSDK } from "../utils";
import { authService } from "./hm-auth-service";

interface ISessionService {
  url: string;
  authParams: IHMAuthSDK["signInParam"];
}

export const sessionFactory = async (params: ISessionService) => {
  const { url, authParams } = params;
  const auth = authService({ url, fetch });
  const res = await auth.signIn({ ...authParams });
  // console.log(res);

  // Apollo
  const accessToken = res?.authenticationResult?.accessToken;
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

  // Get user's infos
  const { owner, tenant, company, role } = auth;
  // console.log({ owner, tenant, company, role });

  // const client = graphqlClient({ url, accessToken: res.idToken });
  const apolloClient = getSdkApollo(client);
  return { owner, tenant, company, role, apolloClient };
  // return client;
};

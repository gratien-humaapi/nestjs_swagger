/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-case-declarations */
import {
  ApolloClient,
  MutationOptions,
  QueryOptions
} from "@apollo/client/core";
import { DocumentNode } from "graphql";
import { getSdk, Requester } from "../../API";

export type ApolloRequesterOptions<V, R> =
  | Omit<QueryOptions<V>, "variables" | "query">
  | Omit<MutationOptions<R, V>, "variables" | "mutation">;

const validDocDefOps = ["mutation", "query", "subscription"];

/**
 * usage with sessionFactory
 * @see https://medium.com/@adziok1998/how-i-save-a-few-hours-each-week-on-testing-graphql-in-nest-js-typescript-1afd8ceeacf7
 *
 * Original implementation
 * @see https://gist.github.com/akozhemiakin/731b0c1e99eb89b01f80f08f9146b6b6
 */
export function getSdkApollo<C>(client: ApolloClient<C>) {
  const requester: Requester = async <R, V>(
    doc: DocumentNode,
    variables: V,
    options?: ApolloRequesterOptions<V, R>
  ): Promise<R> => {
    // Valid document should contain *single* query or mutation unless it's has a fragment
    if (
      doc.definitions.filter(
        (d) =>
          d.kind === "OperationDefinition" &&
          validDocDefOps.includes(d.operation)
      ).length !== 1
    ) {
      throw new Error(
        "DocumentNode passed to Apollo Client must contain single query or mutation"
      );
    }

    const definition = doc.definitions[0];

    // Valid document should contain *OperationDefinition*
    if (definition.kind !== "OperationDefinition") {
      throw new Error(
        "DocumentNode passed to Apollo Client must contain single query or mutation"
      );
    }

    switch (definition.operation) {
      case "mutation": {
        const response = await client.mutate<R, V>({
          mutation: doc,
          variables,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ...(options as any)
        });

        // if (response.errors) {
        //   throw new ApolloError(response.errors);
        // }

        if (response.data === undefined || response.data === null) {
          throw new Error("No data presented in the GraphQL response");
        }

        return response.data;
      }
      case "query": {
        const response = await client.query<R, V>({
          query: doc,
          variables,
          ...options
        });

        // if (response.errors) {
        //   throw new ApolloError(response.errors);
        // }

        if (response.data === undefined || response.data === null) {
          throw new Error("No data presented in the GraphQL response");
        }

        return response.data;
      }
      case "subscription": {
        throw new Error(
          "Subscription requests through SDK interface are not supported"
        );
      }
      default:
        throw new Error("No valid request type was provided");
        break;
    }
  };

  return getSdk(requester);
}

export type ApolloSdk = ReturnType<typeof getSdkApollo>;

/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-case-declarations */
import { ApolloError, ServerError } from "@apollo/client/core";

export const errorResponse = (error: any) => {
  let errors = [];
  switch (error.constructor) {
    case ApolloError:
      const { networkError, message, graphQLErrors } = <ApolloError>error;

      if (networkError) {
        const { result } = networkError as ServerError;
        if (result) {
          errors = result.errors;
        }
      }

      const gqlError = graphQLErrors.map(({ message, extensions }) => ({
        message,
        extensions
      }));

      console.log({ errors, message }, gqlError);
      throw new Error(message);

      break;

    default:
      console.log({ message: error.message, error });
      throw new Error(error.message);
  }
};

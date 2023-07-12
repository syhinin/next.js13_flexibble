import { GraphQLClient } from "graphql-request";
import { apiUrl, apiKey } from "@/helpers";
import { getUserQuery, createUserMutation } from "@/graphql";

const client = new GraphQLClient(apiUrl);

const makeGraphQlRequest = async (query: string, variables = {}) => {
  try {
    return await client.request(query, variables);
  } catch (error) {
    throw error;
  }
};

export const getUser = (email: string) => {
  client.setHeader('x-api-key', apiKey)
  
  return makeGraphQlRequest(getUserQuery, { email });
};

export const createUser = (name: string, email: string, avatarUrl: string) => {
  client.setHeader('x-api-key', apiKey)

  const variables = {
    input: {
      name,
      email,
      avatarUrl,
    },
  };

  return makeGraphQlRequest(createUserMutation, variables);
};

import { typeDefs } from "./types";
import { resolvers } from "./resolvers";
import { ApolloServer } from "apollo-server";

export const server = new ApolloServer({
  typeDefs,
  resolvers,
});

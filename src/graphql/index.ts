import { typeDefs } from "./types";
import { resolvers } from "./resolvers";
import { ApolloServer } from "apollo-server";
import { context } from "./context";

export const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
});

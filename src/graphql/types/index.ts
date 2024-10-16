import { gql } from "apollo-server-core";
import { userTypes } from "../../modules/user/user.type";
import { queryType } from "./query";

export const typeDefs = gql`
  ${userTypes}

  ${queryType}
`;

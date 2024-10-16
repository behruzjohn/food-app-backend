import { gql } from "apollo-server-core";

export const userTypes = gql`
  type User {
    _id: ID
    name: String
    phone: String
  }

  type UserOutput {
    payload: [User]
  }
`;

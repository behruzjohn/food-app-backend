import { gql } from "apollo-server-core";

export const userTypes = gql`
  enum UserRoleEnum {
    super_admin
    admin
    user
  }
  type User {
    _id: ID
    name: String
    role: UserRoleEnum
    phone: String
  }
  type UserOutput {
    payload: [User]
  }
`;

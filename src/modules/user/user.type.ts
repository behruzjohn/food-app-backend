import { gql } from "apollo-server-core";

export const userTypes = gql`
  enum UserRoleEnum {
    super_admin
    admin
    user
  }

  type User {
    _id: ID
    telegramId: Number
    name: String
    role: UserRoleEnum
    phone: String
    cart: Cart
  }

  type UserOutput {
    payload: [User]
  }
`;

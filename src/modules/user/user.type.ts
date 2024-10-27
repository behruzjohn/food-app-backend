import { gql } from 'apollo-server-core';
import { RoleEnum } from 'src/enums/role.enum';
import { createGraphQLEnum } from 'src/utils/schema';

export const userTypes = gql`
  ${createGraphQLEnum('UserRoleEnum', RoleEnum)}

  type User {
    _id: ID
    telegramId: Int
    name: String
    role: UserRoleEnum
    phone: String
    cart: Cart
  }

  type UserOutput {
    payload: [User]
  }
  input UserInput {
    name: String
    orders: [ID]
    telegramId: Int
    role: RoleEnum
    phone: String
    cart: ID
  }
`;

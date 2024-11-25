import { gql } from 'apollo-server-core';
import { RoleEnum } from 'src/enums/role.enum';
import { createGraphQLEnum } from 'src/utils/schema';

export const userTypes = gql`
  ${createGraphQLEnum('RoleEnum', RoleEnum)}

  type User {
    _id: ID
    name: String
    phone: String
    role: RoleEnum
    photo: String
    telegramId: String
  }

  input UserFilterInput {
    phone: String
  }

  type UserOutput {
    payload: User
  }

  type UsersOutput {
    payload: [User]
  }
`;

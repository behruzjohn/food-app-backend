import { gql } from 'apollo-server-core';
import { UserRoleEnum } from 'src/enums/role.enum';
import { createGraphQLEnum } from 'src/utils/schema';

export const userTypes = gql`
  ${createGraphQLEnum('UserRoleEnum', UserRoleEnum)}

  type User {
    _id: ID
    telegramId: Int
    name: String
    role: UserRoleEnum
    phone: String
  }

  type UserOutput {
    payload: User
  }

  type UsersOutput {
    payload: [User]
  }
`;

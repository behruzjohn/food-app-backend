import { gql } from 'apollo-server-core';
import { UserRoleEnum } from 'src/enums/role.enum';
import { createGraphQLEnum } from 'src/utils/schema';

export const userTypes = gql`
  ${createGraphQLEnum('UserRoleEnum', UserRoleEnum)}

  type User {
    _id: ID
    telegramId: String
    name: String
    role: UserRoleEnum
    phone: String
    photo: String
  }

  type UserOutput {
    payload: User
  }

  type UsersOutput {
    payload: [User]
  }
`;

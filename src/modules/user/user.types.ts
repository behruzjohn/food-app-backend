import { gql } from 'apollo-server-core';
import { RoleEnum } from 'src/enums/role.enum';
import { createGraphQLEnum } from 'src/utils/schema';

export const userTypes = gql`
  ${createGraphQLEnum('RoleEnum', RoleEnum)}

  type User {
    _id: ID
    telegramId: String
    name: String
    role: RoleEnum
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

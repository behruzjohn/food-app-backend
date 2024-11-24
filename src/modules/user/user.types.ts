import { gql } from 'apollo-server-core';
import { RoleEnum } from 'src/enums/role.enum';
import { timestampsType } from 'src/graphql/types/common';
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
    ${timestampsType}
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
  input UpdateUserDataByIdPropsInput {
    name: String
    phone: String
  }
  input UpdateUserPasswordInput {
    userId: ID!
    oldPassword: String!
    newPassword: String!
  }
`;

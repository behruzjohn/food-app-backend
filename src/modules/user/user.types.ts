import { gql } from 'apollo-server-core';
import { UserRoleEnum } from 'src/enums/userRole.enum';
import { timestampsType } from 'src/graphql/types/common';
import { createGraphQLEnum } from 'src/utils/schema';

export const userTypes = gql`
  ${createGraphQLEnum('UserRoleEnum', UserRoleEnum)}

  type User {
    _id: ID
    name: String
    phone: String
    role: UserRoleEnum
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
    password: String
    phone: String
  }
`;

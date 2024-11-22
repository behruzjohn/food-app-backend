import { gql } from 'apollo-server-core';

export const authTypes = gql`
  input TelegramUserInput {
    id: String
    first_name: String
    last_name: String
    username: String
    photo_url: String
    auth_date: Int
    hash: String
  }

  input ConfirmationInput {
    code: String!
    token: String!
  }

  input AuthInput {
    phone: String!
    password: String!
  }

  input SignUpInput {
    name: String!
    phone: String!
    password: String!
  }

  type AuthOutput {
    user: User
    token: String
  }

  type SignUpOutput {
    token: String
  }
`;

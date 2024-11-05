import { gql } from 'apollo-server-core';

export const authTypes = gql`
  input AuthInput {
    id: Int
    first_name: String
    last_name: String
    username: String
    photo_url: String
    auth_date: Int
    hash: String
  }

  type AuthOutput {
    user: User
    token: String
  }
`;

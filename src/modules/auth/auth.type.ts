import { gql } from "apollo-server-core";

export const authTypes = gql`
  input AuthInput {
    id: string;
    first_name: string;
    last_name: string;
    username: string;
    photo_url: string;
    auth_date: string;
    hash: string;
  }
`;

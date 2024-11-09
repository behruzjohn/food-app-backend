import { gql } from 'apollo-server-core';

export const categoryTypes = gql`
  type Category {
    name: String
    image: String
  }

  type Category {
    payload: [Category]
  }

  type CategoryOutput {
    payload: Category
  }

  input CategoryInput {
    name: String!
    image: String
  }
`;

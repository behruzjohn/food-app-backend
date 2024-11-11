import { gql } from 'apollo-server-core';

export const categoryTypes = gql`
  type Category {
    _id: String
    name: String
    image: String
  }

  type CategoriesOutput {
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

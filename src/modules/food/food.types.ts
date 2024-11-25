import { gql } from 'apollo-server-core';
import { paginationType } from 'src/graphql/types/common';

export const foodTypes = gql`
  type Food {
    _id: ID
    shortName: String
    name: String
    image: String
    description: String
    price: Int
    discount: Int
    categories: [Category]
    likes: Int
  }

  type FoodOutput {
    payload: Food
  }

  type PaginatedFoodsOutput {
    payload: [Food]
    ${paginationType}
  }

  type FoodsOutput {
    payload: [Food]
  }

  input FoodInput {
    price: Int!
    name: String!
    discount: Int
    shortName: String
    description: String!
    categories: [ID]
  }

  input FoodUpdateInput {
    price: Int
    name: String
    discount: Int
    description: String
    shortName: String
    categories: [ID]
  }
  
  type PaginatedFoodsOutput {
    payload: [Food]
    ${paginationType}
  }
`;

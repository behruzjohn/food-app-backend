import { gql } from 'apollo-server-core';
import { paginationType } from 'src/configs/graphql/types/common';

export const foodTypes = gql`
  type Food {
    _id: ID
    shortName: String
    name: String
    image: String
    description: String
    price: Float
    discount: Float
    category: Category
    likes: Int
    isFavorite: Boolean
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
    price: Float!
    name: String!
    discount: Float
    shortName: String
    description: String!
    category: ID!
  }

  input FoodUpdateInput {
    price: Float
    name: String
    discount: Float
    description: String
    shortName: String
    category: ID
  }
  
  type PaginatedFoodsOutput {
    payload: [Food]
    ${paginationType}
  }
`;

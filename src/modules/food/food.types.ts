import { gql } from 'apollo-server-core';

export const foodTypes = gql`
  type Food {
    _id: ID
    title: String
    name: String
    description: String
    price: Int
    discount: Int
  }

  type FoodOutput {
    payload: Food
  }

  type FoodsOutput {
    payload: [Food]
  }
  input FoodInput {
    title: String!
    name: String!
    description: String!
    price: Int!
    discount: Int
  }
  input FoodUpdateInput {
    title: String
    name: String
    description: String
    price: Int
    discount: Int
  }
`;

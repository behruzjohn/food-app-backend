import { gql } from 'apollo-server-core';

export const foodTypes = gql`
  type Food {
    _id: ID
    shortName: String
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

  type FoodDeleteOutput {
    payload: String
  }

  input FoodInput {
    price: Int!
    name: String!
    discount: Int
    shortName: String
    description: String!
  }

  input FoodUpdateInput {
    price: Int
    name: String
    title: String
    discount: Int
    description: String
  }
`;

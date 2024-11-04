import { gql } from 'apollo-server-core';

export const orderTypes = gql`
  type Order {
    _id: ID
    price: Int
    createdAt: Date
    discount: Int
    from: [Int]
    to: [Int]
  }

  type OrderOutput {
    payload: [Order]
  }
  input OrderInput {
    title: String!
    name: String!
    description: String
    price: Int!
    discount: Int
  }
  input OrderUpdateInput {
    food: ID
    price: Int
    discount: Int
    status: String
    createdAt: Date
  }
  type OrderCanceledOutput {
    payload: String!
  }
`;

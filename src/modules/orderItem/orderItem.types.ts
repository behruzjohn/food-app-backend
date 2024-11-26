import { gql } from 'apollo-server-core';

export const orderItem = gql`
  type OrderItem {
    _id: ID
    food: ID
    price: Float
    quantity: Int
    order: ID
  }
  type OrderItemOutput {
    payload: [OrderItem]
  }
`;

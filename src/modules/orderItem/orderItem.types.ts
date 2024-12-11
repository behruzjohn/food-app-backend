import { gql } from 'apollo-server-core';

export const orderItemTypes = gql`
  type OrderItem {
    _id: ID
    food: Food
    price: Float
    quantity: Int
    order: ID
  }

  type OrderItemsOutput {
    payload: [OrderItem]
  }
`;

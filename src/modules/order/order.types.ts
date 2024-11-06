import { gql } from 'apollo-server-core';

export const orderTypes = gql`
  type Order {
    _id: ID
    totalPrice: Int
    createdAt: Date
    status: StatusEnum
    from: [Int]
    to: [Int]
    foods: [CartItem]
    createdBy: ID
  }

  type OrderOutput {
    payload: Order
  }

  type OrdersOutput {
    payload: [Order]
  }

  input OrderInput {
    foods: [ID]
  }

  input OrderStatusUpdateInput {
    status: StatusEnum
  }
`;

import { gql } from 'apollo-server-core';

export const cartTypes = gql`
  enum OrderStatusEnum {
    received
    cooking
    on_the_way
  }
  
  type Cart {
    _id: ID
    price: Int
    createdAt: Date
    status: OrderStatusEnum

  type CartOutput {
    payload: Cart
  }
`;

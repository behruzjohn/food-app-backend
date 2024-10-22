import { gql } from "apollo-server-core";

export const cartTypes = gql`
  enum OrderStatusEnum {
    received
    cooking
  }
  type Cart {
    price: Number
    createdAt: Date
    status: OrderStatusEnum
  }
`;

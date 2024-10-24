import { gql } from "apollo-server-core";

export const cartTypes = gql`
  enum OrderStatusEnum {
    received
    cooking
  }

  type Cart {
    price: Int
    createdAt: Date
    status: OrderStatusEnum
  }
`;

import { gql } from "apollo-server-core";

export const orderTypes = gql`
  type Order {
    _id: ID
    price: Int
    createdAt: Date
    discount: Int
  }

  type OrderOutput {
    payload: [Order]
  }
`;

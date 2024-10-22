import { gql } from "apollo-server-core";

export const orderTypes = gql`
  type Order {
    _id: ID
    price: Number
    createdAt: Date
    discount: Number
  }

  type OrderOutput {
    payload: [Order]
  }
`;

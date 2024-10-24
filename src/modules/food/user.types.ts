import { gql } from "apollo-server-core";

export const orderTypes = gql`
  type Order {
    _id: ID
    name: String
    description: String
    price: Int
    discount: Int
  }

  type OrderOutput {
    payload: [Order]
  }
`;

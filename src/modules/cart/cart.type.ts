import { gql } from "apollo-server-core";

export const cartTypes = gql`
  type Cart {
    _id: ID
    foods: [Food]
    user: ID
  }

  type CartOutput {
    payload: Cart
  }
`;

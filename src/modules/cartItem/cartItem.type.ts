import { gql } from "apollo-server-core";

export const cartItemTypes = gql`
  type CartItem {
    _id: ID
    food: Food
    quantity: Int
    price: Int
    user: ID
  }

  type CartItemOutput {
    payload: CartItem
  }

  type CartItemsOutput {
    payload: [CartItem]
  }
`;

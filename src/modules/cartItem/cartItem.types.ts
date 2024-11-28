import { gql } from 'apollo-server-core';

export const cartItemTypes = gql`
  type CartItem {
    _id: ID
    food: Food
    quantity: Int
    price: Float
    discount: Float
    user: ID
  }

  type Cart {
    items: [CartItem]
    totalPrice: Float
  }

  type CartOutput {
    payload: Cart
  }

  input CartItemInput {
    food: ID
    quantity: Int
  }

  type CartItemOutput {
    payload: CartItem
  }

  type CartItemsOutput {
    payload: [CartItem]
  }
`;

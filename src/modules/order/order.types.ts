import { gql } from 'apollo-server-core';
import { StatusEnum } from 'src/enums/status.enum';
import { createGraphQLEnum } from 'src/utils/schema';

export const orderTypes = gql`
  ${createGraphQLEnum('StatusEnum', StatusEnum)}

  type Order {
    _id: ID
    totalPrice: Int
    createdAt: Date
    status: StatusEnum
    to: [Float]
    foods: [CartItem]
    createdBy: User
  }

  type OrderOutput {
    payload: Order
  }

  type OrdersOutput {
    payload: [Order]
  }

  input OrderInput {
    to: [Float!]!
  }

  input OrderStatusUpdateInput {
    status: StatusEnum
  }
`;

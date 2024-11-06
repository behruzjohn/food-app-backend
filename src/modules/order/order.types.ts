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
    from: [Int]
    to: [Int]
    foods: [CartItem]
    createdBy: ID
  }

  type OrderOutput {
    payload: Order
  }

  type OrdersOutput {
    payload: [Order]
  }

  input OrderInput {
    foods: [ID]
  }

  input OrderStatusUpdateInput {
    status: StatusEnum
  }
`;

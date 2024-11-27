import { gql } from 'apollo-server-core';
import { StatusEnum } from 'src/enums/status.enum';
import { timestampsType } from 'src/graphql/types/common';
import { createGraphQLEnum } from 'src/utils/schema';

export const orderTypes = gql`
  ${createGraphQLEnum('StatusEnum', StatusEnum)}

  type Order {
    _id: ID
    totalPrice: Float
    status: StatusEnum
    address: [Float]
    orderItems: [CartItem]
    createdBy: User
    ${timestampsType}
  }

  type OrderOutput {
    payload: Order
  }

  type OrdersOutput {
    payload: [Order]
  }

  input OrderInput {
    address: [Float!]!
  }

  input OrderStatusUpdateInput {
    status: StatusEnum
  }
`;

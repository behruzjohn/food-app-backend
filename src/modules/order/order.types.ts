import { gql } from 'apollo-server-core';
import { StatusEnum } from 'src/enums/status.enum';
import { createGraphQLEnum } from 'src/utils/schema';

export const orderTypes = gql`
  ${createGraphQLEnum('StatusEnum', StatusEnum)}

  type Order {
    _id: ID
    price: Int
    createdAt: Date
    discount: Int
    from: [Int]
    to: [Int]
  }

  type OrderOutput {
    payload: Order
  }

  type OrdersOutput {
    payload: [Order]
  }

  input OrderInput {
    title: String!
    name: String!
    description: String
    price: Int!
    discount: Int
  }
`;

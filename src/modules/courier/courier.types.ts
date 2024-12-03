import { gql } from 'apollo-server-core';

export const courierTypes = gql`
  type Courier {
    _id: ID
    user: User
    orders: [Order]
  }

  input CourierInput {
    name: String!
    phone: String!
    password: String!
  }

  type CourierOutput {
    payload: Courier
  }

  type CouriersOutput {
    payload: [Courier]
  }
`;

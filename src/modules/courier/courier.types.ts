import { gql } from 'apollo-server-core';

export const courierTypes = gql`
  type Courier {
    _id: ID
    orders: [Order]
    user: User
  }

  type CourierOutput {
    payload: Courier
  }

  type CouriersOutput {
    payload: [Courier]
  }
`;

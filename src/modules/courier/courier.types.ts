import { gql } from 'apollo-server-core';

export const courierTypes = gql`
  type Courier {
    _id: ID
    name: String
    phone: String
    password: String
    orders: [Order]
  }

  input CourierInput {
    name: String!
    phone: String!
    password: String!
  }

  input UpdateCourierInput {
    name: String
    phone: String
    password: String
  }

  input SignInAsCourierInput {
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

import { gql } from "apollo-server-core";
import { QUERIES } from "../../constants/queries";

export const queryType = gql`
  type Query {
    ${QUERIES.GET_ALL_USERS}: UserOutput
    ${QUERIES.GET_CART_ITEMS_BY_USER_ID}: CartItemsOutput
  }
`;

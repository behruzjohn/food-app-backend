import { gql } from "apollo-server-core";
import { createGraphQLEnum } from "src/utils/schema";
import { StatusEnum } from "../../enums/status.enum";

export const orderTypes = gql`
  ${createGraphQLEnum("OrderStatusEnum", StatusEnum)}

  type Order {
    _id: ID
    food: Food
    price: Int
    discount: Int
    status: OrderStatusEnum
    createdAt: Date
  }

  type OrderOutput {
    payload: [Order]
  }
`;

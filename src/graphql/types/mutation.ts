import { gql } from 'apollo-server-core';
import { MUTATIONS } from '../../constants/mutations';

export const mutationType = gql`
  type Mutation {
    ${MUTATIONS.ADD_FOOD_INTO_CART}(food: FoodInput): CartOutput
  }
  
`;

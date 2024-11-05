import { resolvers } from 'src/common';
import { Permissions } from 'src/types/permissions';

export const PERMISSIONS: Permissions = {
  user: resolvers(
    'CREATE_CART_ITEM',
    'CREATE_ORDER',
    'GET_FOOD_BY_ID',
    'UPDATE_CART_FOOD_QUANTITY',
    'GET_USER_BY_ID',
  ),
  admin: resolvers(
    'CREATE_FOOD',
    'GET_DASHBOARD',
    'GET_ALL_USERS',
    'GET_USER_BY_ID',
    'GET_ORDER_BY_ID',
    'UPDATE_FOOD_BY_ID',
    'GET_CART_ITEMS_BY_USER_ID',
  ),
  courier: resolvers('DELIVER_ORDER_BY_ID'),
};

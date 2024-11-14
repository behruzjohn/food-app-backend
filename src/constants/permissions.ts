import { resolvers } from 'src/common';
import { Permissions } from 'src/types/permissions';

export const PERMISSIONS: Permissions = {
  user: resolvers(
    'CREATE_CART_ITEM',
    'CREATE_ORDER',
    'GET_FOOD_BY_ID',
    'UPDATE_CART_FOOD_QUANTITY',
    'GET_USER_BY_ID',
    'GET_ALL_FOODS',
    'GET_CART_ITEMS_BY_USER_ID',
    'CREATE_ORDER',
  ),
  admin: resolvers(
    'GET_FOOD_BY_ID',
    'CREATE_ORDER',
    'CREATE_CART_ITEM',
    'CREATE_FOOD',
    'GET_DASHBOARD',
    'GET_ALL_USERS',
    'GET_ALL_FOODS',
    'CREATE_COURIER',
    'GET_USER_BY_ID',
    'GET_ORDER_BY_ID',
    'UPDATE_FOOD_BY_ID',
    'GET_USERS_BY_PHONE',
    'DELETE_COURIER_BY_ID',
    'GET_CART_ITEMS_BY_USER_ID',
    'CREATE_CATEGORY',
    'DELETE_CATEGORY_BY_ID',
    'GET_ALL_CATEGORIES',
    'GET_CATEGORY_BY_ID',
    'UPDATE_CATEGORY_BY_ID',
    'ATTACH_ORDER_TO_COURIER',
  ),
  courier: resolvers('DELIVER_ORDER_BY_ID'),
};

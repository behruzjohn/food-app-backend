import { resolvers } from 'src/common';
import { RequestPermission } from 'src/types/permissions';

export const PUBLIC_OPERATIONS: RequestPermission = {
  ...resolvers(
    'TELEGRAM_USER_LOGIN',
    'GET_ALL_FOODS',
    'GET_USER_BY_ID',
    'GET_ALL_CATEGORIES',
    'SIGN_IN',
    'SIGN_UP',
    'CONFIRM_SIGN_UP',
    <any>'INTROSPECTION_QUERY',
  ),
};

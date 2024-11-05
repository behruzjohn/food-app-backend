import { resolvers } from 'src/common';
import { Permissions } from 'src/types/permissions';

export const PERMISSIONS: Permissions = {
  user: resolvers('CREATE_CART_ITEM'),
  admin: resolvers(),
  super_admin: resolvers(),
  cook: resolvers(),
  courier: resolvers(),
};

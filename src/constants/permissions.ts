import { permissions } from "src/common";
import { Permissions } from "src/types/permissions";

export const PERMISSIONS: Permissions = {
  user: permissions("CREATE_CART_ITEM"),
  admin: permissions(),
  super_admin: permissions(),
  cooker: permissions(),
  courier: permissions(),
};

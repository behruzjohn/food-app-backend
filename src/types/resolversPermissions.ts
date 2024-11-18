import { RoleEnum } from 'src/enums/role.enum';

export type ResolversPermissions = {
  [K in RoleEnum]: Set<string>;
};

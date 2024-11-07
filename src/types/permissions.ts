import { UserRoleEnum } from 'src/enums/role.enum';

export type Permissions = {
  [K in UserRoleEnum]: Set<string>;
};

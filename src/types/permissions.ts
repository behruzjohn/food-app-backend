import { RoleEnum } from "src/enums/role.enum";

export type Permissions = {
  [K in RoleEnum]: Set<string>;
};

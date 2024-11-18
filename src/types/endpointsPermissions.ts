import { RoleEnum } from 'src/enums/role.enum';

export type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type Endpoint = [Method, string];

export type EndpointsPermissions = {
  [K in RoleEnum]: Set<string>;
};

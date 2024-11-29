import { NextFunction, Request, Response } from 'express';
import { REQUEST_LANGUAGES } from 'src/constants/request';
import { RoleEnum } from 'src/enums/role.enum';

export type Permission = {
  permissions: Set<string>;
  uponAccess?: (req: Request, res?: Response, next?: NextFunction) => void;
};

export type RequestPermission = Partial<
  Record<keyof typeof REQUEST_LANGUAGES, Permission>
>;

export type Permissions = {
  [K in RoleEnum]: RequestPermission;
};

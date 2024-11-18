import { endpoints } from 'src/common';
import { EndpointsPermissions } from 'src/types/endpointsPermissions';

export const ENDPOINTS_PERMISSIONS: EndpointsPermissions = {
  admin: endpoints(),
  courier: endpoints(),
  user: endpoints(),
};

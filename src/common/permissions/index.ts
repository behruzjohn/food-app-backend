import { MUTATIONS } from "src/constants/mutations";
import { QUERIES } from "src/constants/queries";

type MutationKeys = keyof typeof MUTATIONS;

type QueryKeys = keyof typeof QUERIES;

type PermissionsKey = MutationKeys | QueryKeys;

export function permissions(...permissionsKeys: PermissionsKey[]): Set<string> {
  const validatedPermissions = [...permissionsKeys].map(
    (key) => MUTATIONS[key] || QUERIES[key]
  );

  const permissions: Set<PermissionsKey> = new Set<PermissionsKey>(
    validatedPermissions
  );

  return permissions;
}

import { ROLES }
from "@/constants/roles";

import type { Role }
from "@/constants/roles";

export function isAdmin(
  roles: Role[]
) {
  return roles.includes(
    ROLES.ADMIN
  );
}

export function isOwner(
  roles: Role[]
) {
  return roles.includes(
    ROLES.OWNER
  );
}
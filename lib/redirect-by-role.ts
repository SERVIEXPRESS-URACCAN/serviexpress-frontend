import type { Role }
from "@/constants/roles";

import {
  isAdmin,
  isOwner,
} from "@/lib/permissions";

export function getRedirectByRole(
  roles: Role[]
) {
  if (isAdmin(roles)) {
    return "/admin";
  }

  if (isOwner(roles)) {
    return "/owner";
  }

  return "/unauthorized";
}
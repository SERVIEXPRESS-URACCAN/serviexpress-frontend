import type { Role }
from "@/constants/roles";

export function hasRole(
  roles: Role[],
  role: Role
) {
  return roles.includes(role);
}
export const ROLES = {
  OWNER: "owner",
  ADMIN: "admin",
} as const;

export type Role =
  (typeof ROLES)[keyof typeof ROLES];
export const ROLES = {
  CLIENT: "client",
  OWNER: "owner",
  DELIVERY: "delivery",
  ADMIN: "admin",
} as const;

export type Role =
  (typeof ROLES)[keyof typeof ROLES];
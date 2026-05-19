import { Role } from "@/constants/roles";

export interface LoginResponse {
  id: number;
  email: string;
  roles: Role[];
  access_token: string;
}

export interface SessionUser {
  id: string;
  email: string;
  roles: Role[];
}
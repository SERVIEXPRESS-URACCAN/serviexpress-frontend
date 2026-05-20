import { Role } from "@/constants/roles";

export type LoginResponse = {
  message: string;

  user: {
    id: number;
    email: string;
    roles: Role[];
  };

  access_token: string;
};

export type SessionUser = {
  id: string;
  email: string;
  roles: Role[];
}
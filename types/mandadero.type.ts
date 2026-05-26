import { User } from "./user.type";

export type Mandadero = {
  id: number;
  available: boolean;
  isActive: boolean;
  imageIdentification?: string;
  createdAt: string;
  updatedAt: string;

  user: User;
};

export type MandaderoResponse = {
  data: Mandadero[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    lastPage: number;
    hasNextPage: boolean;
  };
};

export type CreateMandaderoDto = {
  userId: number;
  motorcycleId: number;
  imageIdentification?: string;
};

export type UpdateMandaderoDto = {
  available?: boolean;
  isActive?: boolean;
  status?: string;
};

import { MotorcycleModel } from "./motorcycle-catalog.type";
import { User } from "./user.type";

export type Motorcycle = {
  id: number;
  licensePlate: string;
  model: MotorcycleModel;
  color?: string;
  circulationImage?: string;
  insuranceImage?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};
export type Mandadero = {
  id: number;
  available: boolean;
  isActive: boolean;
  imageIdentification?: string;
  createdAt: string;
  updatedAt: string;

  user: User;
  motorcycle: Motorcycle;
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

export type CreateMandaderoAdminDto = {
  userId: number;
  name: string;
  lastName: string;
  cellphone: string;
  licensePlate: string;
  modelId: number;
  color?: string;
  imageIdentification?: File;
  circulationImage?: File;
  insuranceImage?: File;
};

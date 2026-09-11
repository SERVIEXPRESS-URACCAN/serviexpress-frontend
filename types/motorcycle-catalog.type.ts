export type MotorcycleBrand = {
  id: number;
  name: string;
};

export type MotorcycleModel = {
  id: number;
  name: string;
  brand?: MotorcycleBrand;
};
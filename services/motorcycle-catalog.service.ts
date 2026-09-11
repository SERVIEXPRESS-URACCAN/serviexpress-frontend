import { API_URL } from "@/config/config";
import { fetchAuth } from "@/lib/fetch-auth";
import { MotorcycleBrand, MotorcycleModel } from "@/types/motorcycle-catalog.type";

export const getMotorcycleBrands = async (): Promise<MotorcycleBrand[]> => {
  const response = await fetchAuth(`${API_URL}/motorcycle-brand`, {
    cache: "no-store",
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message || "Error obteniendo marcas");
  }

  return response.json();
};

export const getMotorcycleModelsByBrand = async (
  brandId: number,
): Promise<MotorcycleModel[]> => {
  const response = await fetchAuth(
    `${API_URL}/motorcycle-model/brand/${brandId}`,
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message || "Error obteniendo modelos");
  }

  return response.json();
};
import { API_URL } from "@/config/config";
import {
  CreateMandaderoDto,
  Mandadero,
  MandaderoResponse,
} from "@/types/mandadero.type";

export const getMandaderos = async (
  token: string,
  page = 1,
  search?: string,
): Promise<MandaderoResponse> => {
  const params = new URLSearchParams();
  params.append("status", "APPROVED");

  const response = await fetch(
    `${API_URL}/mandadero?page=${page}&limit=10&${search ? `search=${search}&` : ""}${params.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    },
  );
  if (!response.ok) {
    throw new Error(`Error fetching mandaderos`);
  }
  return response.json();
};

export const createMandadero = async (
  token: string,
  data: CreateMandaderoDto,
): Promise<Mandadero> => {
  const response = await fetch(`${API_URL}/mandadero`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const data = await response.json().catch(() => null);

    throw new Error(data?.message || "Error updating active status");
  }
  return response.json();
};

export const updateMandaderoAvailability = async (
  id: number,
  token: string,
  available: boolean,
): Promise<Mandadero> => {
  const response = await fetch(`${API_URL}/mandadero/${id}/availability`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ available }),
  });
  if (!response.ok) {
    const data = await response.json().catch(() => null);

    throw new Error(data?.message || "Error actualizando disponibilidad");
  }
  return response.json();
};

export const updateMandaderoActive = async (
  id: number,
  token: string,
  isActive: boolean,
): Promise<Mandadero> => {
  const response = await fetch(`${API_URL}/mandadero/${id}/activate`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ isActive }),
  });
  if (!response.ok) {
    const data = await response.json().catch(() => null);

    throw new Error(data?.message || "Error updating active status");
  }
  return response.json();
};

import { API_URL } from "@/config/config";
import {
  CreateMandaderoDto,
  Mandadero,
  MandaderoResponse,
  UpdateMandaderoDto,
} from "@/types/mandadero.type";

export const getMandaderos = async (
  token: string,
): Promise<MandaderoResponse> => {
  const response = await fetch(`${API_URL}/mandadero`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
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
    throw new Error(`Error creating mandadero`);
  }
  return response.json();
};

export const updateMandadero = async (
  id: number,
  token: string,
  data: UpdateMandaderoDto,
): Promise<Mandadero> => {
  const response = await fetch(`${API_URL}/mandadero/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(`Error updating mandadero with id ${id}`);
  }
  return response.json();
};

import { API_URL } from "@/config/config";
import {
  CreateMandaderoAdminDto,
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

export const createMandaderoAdmin = async (
  token: string,
  data: CreateMandaderoAdminDto,
): Promise<Mandadero> => {
  const formData = new FormData();

  formData.append("userId", data.userId.toString());
  formData.append("name", data.name);
  formData.append("lastName", data.lastName);
  formData.append("cellphone", data.cellphone);
  formData.append("licensePlate", data.licensePlate);

  if (data.brand) formData.append("brand", data.brand);
  if (data.model) formData.append("model", data.model);
  if (data.color) formData.append("color", data.color);
  if (data.imageIdentification)
    formData.append("imageIdentification", data.imageIdentification);
  if (data.circulationImage)
    formData.append("circulationImage", data.circulationImage);
  if (data.insuranceImage)
    formData.append("insuranceImage", data.insuranceImage);

  const response = await fetch(`${API_URL}/mandadero/admin`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
  if (!response.ok) {
    const error = await response.json().catch(() => null);

    throw new Error(error?.message || "Error creando mandadero");
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

export const updateMotorcycle = async (
  id: number,
  token: string,
  data: {
    licensePlate?: string;
    brand?: string;
    model?: string;
    color?: string;
  },
) => {
  const response = await fetch(`${API_URL}/motorcycles/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message || "Error actualizando moto");
  }
  return response.json();
};

export const getUsers = async (
  token: string,
): Promise<{ id: number; email: string }[]> => {
  const response = await fetch(`${API_URL}/users`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message || "Error fetching users");
  }
  return response.json();
};

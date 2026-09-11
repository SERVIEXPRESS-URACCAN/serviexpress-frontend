import { API_URL } from "@/config/config";
import { fetchAuth } from "@/lib/fetch-auth";
import {
  CreateMandaderoAdminDto,
  Mandadero,
  MandaderoResponse,
  Motorcycle,
} from "@/types/mandadero.type";

export const getMandaderos = async (
  page = 1,
  search?: string,
): Promise<MandaderoResponse> => {
  const params = new URLSearchParams();
  params.append("status", "APPROVED");

  const response = await fetchAuth(
    `${API_URL}/mandadero?page=${page}&limit=10&${search ? `search=${search}&` : ""}${params.toString()}`,
    {
      headers: {
      },
      cache: "no-store",
    },
  );
  if (!response.ok) {
    throw new Error(`Error fetching mandaderos`);
  }
  return response.json();
};

export const getMandaderoById = async (
  id: number,
): Promise<Mandadero> => {
  const response = await fetchAuth(`${API_URL}/mandadero/${id}`, {
    headers: {
    },
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(`Error fetching mandadero`);
  }
  return response.json();
};

export const createMandaderoAdmin = async (
  data: CreateMandaderoAdminDto,
): Promise<Mandadero> => {
  const formData = new FormData();

  formData.append("userId", data.userId.toString());
  formData.append("name", data.name);
  formData.append("lastName", data.lastName);
  formData.append("cellphone", data.cellphone);
  formData.append("licensePlate", data.licensePlate);
  formData.append("model_id", data.modelId.toString());
  if (data.color) formData.append("color", data.color);
  if (data.imageIdentification)
    formData.append("imageIdentification", data.imageIdentification);
  if (data.circulationImage)
    formData.append("circulationImage", data.circulationImage);
  if (data.insuranceImage)
    formData.append("insuranceImage", data.insuranceImage);

  const response = await fetchAuth(`${API_URL}/mandadero/admin`, {
    method: "POST",
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
  available: boolean,
): Promise<Mandadero> => {
  const response = await fetchAuth(`${API_URL}/mandadero/${id}/availability`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
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
  isActive: boolean,
): Promise<Mandadero> => {
  const response = await fetchAuth(`${API_URL}/mandadero/${id}/activate`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
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
  data: {
    licensePlate?: string;
    model_id?: number;
    color?: string;
  },
): Promise<Motorcycle> => {
  const response = await fetchAuth(`${API_URL}/motorcycles/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);

    throw new Error(
      error?.message || "Error actualizando moto",
    );
  }

  return response.json();
};
export const getUsers = async (
): Promise<{ id: number; email: string }[]> => {
  const response = await fetchAuth(`${API_URL}/users`, {
    cache: "no-store",
  });
  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message || "Error fetching users");
  }
  return response.json();
};

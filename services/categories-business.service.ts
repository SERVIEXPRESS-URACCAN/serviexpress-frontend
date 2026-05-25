import { API_URL } from "@/config/config";
import {
  CategoryBusiness,
  CategoryBusinessResponse,
  CreateCategoryBusinessDto,
  UpdateCategoryBusinessDto,
} from "@/types/categories-business";

export const getCategoryBusiness = async (
  page = 1,
): Promise<CategoryBusinessResponse> => {
  const response = await fetch(
    `${API_URL}/categories-business?page=${page}&limit=10`,
  );
  if (!response.ok) {
    throw new Error(`Error fetching categories business`);
  }
  return response.json();
};

export const createCategoryBusiness = async (
  data: CreateCategoryBusinessDto,
  token: string,
): Promise<CategoryBusiness> => {
  console.log("TOKEN:", token);
  const response = await fetch(`${API_URL}/categories-business`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Error creating category business`);
  }
  return response.json();
};

export const updateCategoryBusiness = async (
  id: number,
  data: UpdateCategoryBusinessDto,
  token: string,
): Promise<CategoryBusiness> => {
  const response = await fetch(`${API_URL}/categories-business/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Error updating category business with id ${id}`);
  }
  return response.json();
};

export const deleteCategoryBusiness = async (
  id: number,
  token: string,
): Promise<void> => {
  const response = await fetch(`${API_URL}/categories-business/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Error deleting category business with id ${id}: ${errorText}`,
    );
  }
  return response.json();
};

import { API_URL } from "@/config/config";

export const updateMandaderoProfile = async (
  id: number,
  token: string,
  data: {
    name: string;
    lastName: string;
    cellphone: string;
  },
) => {
  const response = await fetch(`${API_URL}/profiles/${id}`, {
    method: "PATCH",
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

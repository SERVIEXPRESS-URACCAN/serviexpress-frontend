import { API_URL } from "@/config/config";
import { fetchAuth } from "@/lib/fetch-auth";

export const updateMandaderoProfile = async (
  id: number,
  data: {
    name: string;
    lastName: string;
    cellphone: string;
  },
) => {
  const response = await fetchAuth(`${API_URL}/profiles/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);

    throw new Error(data?.message || "Error updating active status");
  }
  return response.json();
};

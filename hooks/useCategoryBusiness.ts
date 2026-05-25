import { useEffect, useState } from "react";
import { getCategoryBusiness } from "@/services/categories-business.service";
import { CategoryBusinessResponse } from "@/types/categories-business";

export const useCategoryBusiness = () => {
  const [data, setData] = useState<CategoryBusinessResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryBusiness = async () => {
      try {
        const data = await getCategoryBusiness();
        setData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategoryBusiness();
  }, []);
  return {
    data,
    loading,
  };
};

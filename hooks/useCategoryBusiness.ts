import { useEffect, useState } from "react";
import { CategoryBusiness } from "../types/categories-business";
export const useCategoryBusiness = () => {
  const [CategoryBusiness, setCategoryBusiness] = useState<CategoryBusiness[]>(
    [],
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryBusiness = async () => {
      try {
        const response = await fetch("/api/categories-business");
        if (!response.ok) {
          throw new Error("Error fetching category business");
        }
        const data = await response.json();
        setCategoryBusiness(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategoryBusiness();
  }, []);
  return {
    CategoryBusiness,
    loading,
  };
};

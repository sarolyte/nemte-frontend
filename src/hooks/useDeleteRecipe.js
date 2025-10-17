import { useState } from "react";
import { useAppContext } from "../Store/Store";

export default function useDeleteRecipe() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { actions } = useAppContext();

  const deleteRecipe = async (id) => {
    if (!id) {
      setError("No recipe ID provided");
      return;
    }

    setLoading(true);
    actions.setLoading(true);

    try {
      const response = await fetch(`http://localhost:3000/recipe/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete recipe");
      }

      setError(null);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
      setTimeout(() => actions.setLoading(false), 1000);
    }
  };

  return { deleteRecipe, loading, error };
}

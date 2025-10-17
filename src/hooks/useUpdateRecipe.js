export default function useUpdateRecipe() {
  const updateRecipe = async (id, updatedData) => {
    try {
      const response = await fetch(`http://localhost:3000/recipe/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error("Failed to update recipe");
      }

      const result = await response.json();
      return result;
    } catch (error) {
      throw error;
    }
  };

  return { updateRecipe };
}

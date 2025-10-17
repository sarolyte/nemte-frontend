import { useEffect, useState, useRef } from "react";
import useUpdateRecipe from "../../hooks/useUpdateRecipe.js";
import RecipeForm from "../../components/RecipeForm/RecipeForm.jsx";
import {
  courseOptions,
  cuisineOptions,
  dietOptions,
} from "../../components/RecipeForm/RecipeFormOptions.jsx";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useFetchDataById from "../../hooks/useFetchDataById.js";

export default function EditRecipe() {
  const { id } = useParams();
  const { updateRecipe } = useUpdateRecipe();
  const fileInputRef = useRef(null);
  const { data, loading, error } = useFetchDataById(id);
  const [recipe, setRecipe] = useState(null);
  const navigate = useNavigate();

  //val - value, r- recipe(previous state)
  useEffect(() => {
    if (!data || loading || error) return;

    const safeData = {
      name: data.name ?? "",
      image: data.image ?? "",
      description: data.description ?? "",
      cookingDuration: data.cookingDuration ?? { hours: "", minutes: "" },
      cleaningTime: data.cleaningTime ?? { hours: "", minutes: "" },
      ingredients:
        Array.isArray(data.ingredients) && data.ingredients.length
          ? data.ingredients
          : [{ name: "", quantity: "" }],
      steps: Array.isArray(data.steps) && data.steps.length ? data.steps : [""],
      portions: data.portions ?? 1,
      courseType: Array.isArray(data.courseType) ? data.courseType : [],
      dietType: Array.isArray(data.dietType) ? data.dietType : [],
      cuisineType: data.cuisineType ?? "",
    };

    setRecipe({
      ...safeData,
      setName: (val) => setRecipe((r) => ({ ...r, name: val })),
      setImage: (val) => setRecipe((r) => ({ ...r, image: val })),
      setDescription: (val) => setRecipe((r) => ({ ...r, description: val })),
      setCookingDuration: (val) =>
        setRecipe((r) => ({ ...r, cookingDuration: val })),
      setCleaningTime: (val) => setRecipe((r) => ({ ...r, cleaningTime: val })),
      setIngredients: (val) => setRecipe((r) => ({ ...r, ingredients: val })),
      setSteps: (val) => setRecipe((r) => ({ ...r, steps: val })),
      setPortions: (val) => setRecipe((r) => ({ ...r, portions: val })),
      setCourseType: (val) => setRecipe((r) => ({ ...r, courseType: val })),
      setDietType: (val) => setRecipe((r) => ({ ...r, dietType: val })),
      setCuisineType: (val) => setRecipe((r) => ({ ...r, cuisineType: val })),
    });
  }, [data, loading, error]);

  const convertToBase64 = (e) => {
    console.log(e);
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      recipe.setImage(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error:", error);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!recipe.image) {
      alert("Please upload an image!");
      return;
    }

    if (recipe.name.trim().length < 5) {
      alert("Recipe name must be at least 5 characters long.");
      return;
    }

    if (recipe.description.trim().length < 10) {
      alert("Description must be at least 10 characters long.");
      return;
    }

    const validIngredients = recipe.ingredients.filter(
      (i) => i.name.trim() && i.quantity.trim()
    );
    if (validIngredients.length === 0) {
      alert("Please add at least one ingredient with name and quantity.");
      return;
    }

    if (
      recipe.steps.length === 0 ||
      recipe.steps.some((s) => s.trim().length < 5)
    ) {
      alert("Please add at least one step with 5 or more characters.");
      return;
    }

    try {
      await updateRecipe(id, {
        name: recipe.name,
        image: recipe.image,
        description: recipe.description,
        cookingDuration: {
          ...recipe.cookingDuration,
          quantity: `${recipe.cookingDuration.hours || 0}h ${
            recipe.cookingDuration.minutes || 0
          }m`,
        },
        cleaningTime: {
          ...recipe.cleaningTime,
          quantity: `${recipe.cleaningTime.hours || 0}h ${
            recipe.cleaningTime.minutes || 0
          }m`,
        },
        ingredients: validIngredients,
        steps: recipe.steps,
        portions: recipe.portions,
        courseType: recipe.courseType,
        dietType: recipe.dietType,
        cuisineType: recipe.cuisineType,
      });

      alert("Recipe updated successfully!");
      navigate(`/recipe/${id}`); //modal?
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update recipe.");
    }
  };

  if (!recipe) return <p>Loading recipe...</p>;

  return (
    <RecipeForm
      recipe={recipe}
      onSubmit={handleSubmit}
      convertToBase64={convertToBase64}
      fileInputRef={fileInputRef}
      title="Edit Recipe"
      submitLabel="Update Recipe"
      cuisineOptions={cuisineOptions}
      dietOptions={dietOptions}
      courseOptions={courseOptions}
    />
  );
}

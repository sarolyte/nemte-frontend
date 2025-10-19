import styles from './CreateRecipe.module.css'
import Footer from "../../components/Footer/Footer.jsx";
import RecipeForm from "../../components/RecipeForm/RecipeForm.jsx";
import {
  courseOptions,
  cuisineOptions,
  dietOptions,
} from "../../components/RecipeForm/RecipeFormOptions.jsx";
import useNewRecipe from "../../hooks/useNewRecipe.js";
import { useRef } from "react";

export default function CreateRecipe() {
  const recipe = useNewRecipe();
  const fileInputRef = useRef(null);

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

  const clearFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
    recipe.setImage("");
  };

  const handleSubmit = (e) => {
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

    recipe.handleSubmit();
    clearFileInput();
  };

  return (
    <div className={styles.pageWrapper}>
      <RecipeForm
        recipe={recipe}
        onSubmit={handleSubmit}
        convertToBase64={convertToBase64}
        title="Add a Recipe"
        submitLabel="Submit Recipe"
        cuisineOptions={cuisineOptions}
        dietOptions={dietOptions}
        courseOptions={courseOptions}
        fileInputRef={fileInputRef}
      />

      <Footer shortTxt="© 2025 Nemte. All rights reserved" />
    </div>
  );
}

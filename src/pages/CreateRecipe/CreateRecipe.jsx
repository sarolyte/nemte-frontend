import styles from "./CreateRecipe.module.css";
import Footer from "../../components/Footer/Footer.jsx";
import RecipeForm from "../../components/RecipeForm/RecipeForm.jsx";
import {
  courseOptions,
  cuisineOptions,
  dietOptions,
} from "../../components/RecipeForm/RecipeFormOptions.jsx";
import useNewRecipe from "../../hooks/useNewRecipe.js";
import { useState, useRef } from "react";

export default function CreateRecipe() {
  const recipe = useNewRecipe();
  const fileInputRef = useRef(null);
  const [errors, setErrors] = useState({});

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

    const newErrors = {};

    if (!recipe.image) {
      newErrors.image = "Please upload an image.";
    }

    if (recipe.name.trim().length < 5) {
      newErrors.name = "Recipe name must be at least 5 characters.";
    }

    if (recipe.description.trim().length < 10) {
      newErrors.description = "Description must be at least 10 characters.";
    }

    if (
      !recipe.cookingDuration ||
      recipe.cookingDuration.hours === "" ||
      recipe.cookingDuration.minutes === ""
    ) {
      newErrors.cookingDuration = "Enter cooking time (hours and minutes).";
    }

    if (
      !recipe.cleaningTime ||
      recipe.cleaningTime.hours === "" ||
      recipe.cleaningTime.minutes === ""
    ) {
      newErrors.cleaningTime = "Enter cleaning time (hours and minutes).";
    }

    const validIngredients = recipe.ingredients.filter(
      (i) => i.name.trim() && i.quantity.trim()
    );
    if (validIngredients.length === 0) {
      newErrors.ingredients =
        "Add at least one ingredient with name and quantity.";
    }

    if (
      recipe.steps.length === 0 ||
      recipe.steps.some((s) => s.trim().length < 5)
    ) {
      newErrors.steps = "Add at least one step with 5+ characters.";
    }

    if (!recipe.courseType || recipe.courseType.length === 0) {
      newErrors.courseType = "Select at least one course type.";
    }

    if (!recipe.dietType || recipe.dietType.length === 0) {
      newErrors.dietType = "Select at least one diet type.";
    }

    if (!recipe.cuisineType) {
      newErrors.cuisineType = "Select a cuisine type.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
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
        errors={errors}
      />

      <Footer shortTxt="© 2025 Nemte. All rights reserved" />
    </div>
  );
}

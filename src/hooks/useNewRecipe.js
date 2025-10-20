import { useState } from "react";

export default function useNewRecipe() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [cookingDuration, setCookingDuration] = useState({
    hours: "",
    minutes: "",
  });
  const [cleaningTime, setCleaningTime] = useState({ hours: "", minutes: "" });
  const [ingredients, setIngredients] = useState([{ name: "", quantity: "" }]);
  const [steps, setSteps] = useState([""]);
  const [portions, setPortions] = useState("1");
  const [courseType, setCourseType] = useState([]);
  const [dietType, setDietType] = useState([]);
  const [cuisineType, setCuisineType] = useState("");

  const formatDuration = ({ hours, minutes }) => {
    const h = Number(hours) || 0;
    const m = Number(minutes) || 0;
    return `${h}h ${m}m`;
  };

  const resetForm = () => {
    setName("");
    setImage("");
    setDescription("");
    setCookingDuration({ hours: "", minutes: "" });
    setCleaningTime({ hours: "", minutes: "" });
    setIngredients([{ name: "", quantity: "" }]);
    setSteps([""]);
    setPortions("1");
    setCourseType([]);
    setDietType([]);
    setCuisineType("");
  };

  const handleSubmit = () => {
    console.log("Submitting:", {
      name,
      image,
      description,
      cookingDuration: {
        hours: Number(cookingDuration.hours),
        minutes: Number(cookingDuration.minutes),
        quantity: formatDuration(cookingDuration),
      },
      cleaningTime: {
        hours: Number(cleaningTime.hours),
        minutes: Number(cleaningTime.minutes),
        quantity: formatDuration(cleaningTime),
      },
      ingredients,
      steps,
      portions: Number(portions),
      courseType: courseType.map((type) => type.toLowerCase()),
      dietType: dietType.map((type) => type.toLowerCase()),
      cuisineType: cuisineType.toLowerCase(),
    });

    fetch("http://localhost:3000/recipe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        image,
        description,
        cookingDuration: {
          hours: Number(cookingDuration.hours),
          minutes: Number(cookingDuration.minutes),
          quantity: formatDuration(cookingDuration),
        },
        cleaningTime: {
          hours: Number(cleaningTime.hours),
          minutes: Number(cleaningTime.minutes),
          quantity: formatDuration(cleaningTime),
        },
        ingredients,
        steps,
        portions: Number(portions),
        courseType: courseType.map((type) => type.toLowerCase()),
        dietType: dietType.map((type) => type.toLowerCase()),
        cuisineType: cuisineType.toLowerCase(),
      }),
    })
      .then(async (response) => {
    const result = await response.json();
        if (!response.ok) {
          console.error("Server response:", result);
          throw new Error("Failed to submit");
        }
        console.log(result);
        resetForm();
        alert("Recipe successfully posted!");
      })
      .catch((error) => console.error('Submit error:', error));
  };

  return {
    name,
    setName,
    image,
    setImage,
    description,
    setDescription,
    cookingDuration,
    setCookingDuration,
    cleaningTime,
    setCleaningTime,
    ingredients,
    setIngredients,
    steps,
    setSteps,
    portions,
    setPortions,
    courseType,
    setCourseType,
    dietType,
    setDietType,
    cuisineType,
    setCuisineType,
    handleSubmit,
    resetForm,
  };
}

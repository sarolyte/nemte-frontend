import useNewRecipe from "../../hooks/useNewRecipe.js";
import styles from "./CreateRecipe.module.css";
import Select from "react-select";

export default function CreateRecipe() {
  const recipe = useNewRecipe();

  const cuisineOptions = [
    { value: "lithuanian", label: "Lithuanian" },
    { value: "italian", label: "Italian" },
    { value: "japanese", label: "Japanese" },
    { value: "mexican", label: "Mexican" },
    { value: "indian", label: "Indian" },
    { value: "mediterranean", label: "Mediterranean" },
    { value: "french", label: "French" },
    { value: "american", label: "American" },
    { value: "korean", label: "Korean" },
    { value: "other", label: "Other" },
  ];

  const dietOptions = [
    { value: "vegan", label: "Vegan" },
    { value: "vegetarian", label: "Vegetarian" },
    { value: "pescatarian", label: "Pescatarian" },
    { value: "keto", label: "Keto" },
    { value: "meat", label: "Meat" },
    { value: "lactose free", label: "Lactose Free" },
    { value: "gluten free", label: "Gluten Free" },
  ];
  const courseOptions = [
    { value: "appetizer", label: "Appetizer" },
    { value: "side_dish", label: "Side Dish" },
    { value: "dessert", label: "Dessert" },
    { value: "snack", label: "Snack" },
    { value: "breakfast", label: "Breakfast" },
    { value: "lunch", label: "Lunch" },
    { value: "dinner", label: "Dinner" },
  ];

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

  return (
    <>
      <h2 className={styles.headline}>Add a recipe</h2>
      <form
        className={styles.recipeForm}
        onSubmit={(e) => {
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
        }}
      >
        <div className={styles.inputField}>
          <label htmlFor="name">Recipe name</label>
          <input
            id="name"
            type="text"
            placeholder="Chicken noodle soup"
            value={recipe.name}
            onChange={(e) => recipe.setName(e.target.value)}
          />
        </div>

        <div className={styles.inputField}>
          <label htmlFor="description">Short description</label>
          <textarea
            id="description"
            placeholder="A comforting and easy-to-make chicken noodle soup..."
            value={recipe.description}
            onChange={(e) => recipe.setDescription(e.target.value)}
          />
        </div>

        <fieldset className={styles.inputField}>
          <legend>Cooking Duration</legend>
          <div className={styles.hourBlock}>
            <label htmlFor="cookingHours">Hours</label>
            <input
              id="cookingHours"
              placeholder="0"
              type="number"
              min="0"
              value={recipe.cookingDuration.hours}
              onChange={(e) =>
                recipe.setCookingDuration({
                  ...recipe.cookingDuration,
                  hours: e.target.value,
                })
              }
            />
          </div>

          <div className={styles.minutesBlock}>
            <label htmlFor="cookingMinutes">Minutes</label>
            <input
              placeholder="35"
              id="cookingMinutes"
              type="number"
              min="0"
              max="59"
              value={recipe.cookingDuration.minutes}
              onChange={(e) =>
                recipe.setCookingDuration({
                  ...recipe.cookingDuration,
                  minutes: e.target.value,
                })
              }
            />
          </div>
        </fieldset>

        <fieldset className={styles.inputField}>
          <legend>Cleaning Time</legend>
          <div className={styles.hourBlock}>
            <label htmlFor="cleaningHours">Hours</label>
            <input
              id="cleaningHours"
              placeholder="0"
              type="number"
              min="0"
              value={recipe.cleaningTime.hours}
              onChange={(e) =>
                recipe.setCleaningTime({
                  ...recipe.cleaningTime,
                  hours: e.target.value,
                })
              }
            />
          </div>

          <div className={styles.minutesBlock}>
            <label htmlFor="cleaningMinutes">Minutes</label>
            <input
              id="cleaningMinutes"
              placeholder="25"
              type="number"
              min="0"
              max="59"
              value={recipe.cleaningTime.minutes}
              onChange={(e) =>
                recipe.setCleaningTime({
                  ...recipe.cleaningTime,
                  minutes: e.target.value,
                })
              }
            />
          </div>
        </fieldset>

        <fieldset>
          <legend>Ingredients</legend>
          {recipe.ingredients.map((ingredient, i) => (
            <div className={styles.ingredientsFields} key={i}>
              <input
                type="text"
                placeholder="Egg noodles"
                value={ingredient.name}
                onChange={(e) => {
                  const updated = [...recipe.ingredients];
                  updated[i].name = e.target.value;
                  recipe.setIngredients(updated);
                }}
              />
              <input
                type="text"
                placeholder="Quantity"
                value={ingredient.quantity}
                onChange={(e) => {
                  const updated = [...recipe.ingredients];
                  updated[i].quantity = e.target.value;
                  recipe.setIngredients(updated);
                }}
              />
              {recipe.ingredients.length > 1 && (
                <button
                  type="button"
                  className={styles.removeBtn}
                  onClick={() => {
                    const updated = recipe.ingredients.filter(
                      (ingredient, index) => index !== i
                    );
                    recipe.setIngredients(updated);
                  }}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            className={styles.addBtn}
            onClick={() =>
              recipe.setIngredients([
                ...recipe.ingredients,
                { name: "", quantity: "" },
              ])
            }
          >
            + Add Ingredient
          </button>
        </fieldset>

        <div className={styles.inputField}>
          <label>Steps</label>
          {recipe.steps.map((step, i) => (
            <div key={i} className={styles.stepBlock}>
              <textarea
                placeholder={`Step ${i + 1}`}
                value={step}
                onChange={(e) => {
                  const updated = [...recipe.steps];
                  updated[i] = e.target.value;
                  recipe.setSteps(updated);
                }}
              />
              {recipe.steps.length > 1 && (
                <button
                  type="button"
                  className={styles.removeBtn}
                  onClick={() => {
                    const updated = recipe.steps.filter(
                      (step, index) => index !== i
                    );
                    recipe.setSteps(updated);
                  }}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            className={styles.addBtn}
            onClick={() => recipe.setSteps([...recipe.steps, ""])}
          >
            + Add Step
          </button>
        </div>

        <div className={styles.inputField}>
          <label htmlFor="portions">Portions</label>
          <input
            id="portions"
            type="number"
            min="1"
            max="50"
            value={recipe.portions}
            onChange={(e) => recipe.setPortions(e.target.value)}
          />
        </div>

        <div className={styles.inputField}>
          <label htmlFor="courseType">Course Type</label>
          <Select
            isMulti
            id="courseType"
            options={courseOptions}
            value={courseOptions.filter((o) =>
              recipe.courseType.includes(o.value)
            )}
            onChange={(selected) =>
              recipe.setCourseType(selected.map((o) => o.value))
            }
          ></Select>
        </div>

        <div className={styles.inputField}>
          <label htmlFor="dietType">Diet Type</label>
          <Select
            isMulti
            id="dietType"
            options={dietOptions}
            value={dietOptions.filter((o) => recipe.dietType.includes(o.value))}
            onChange={(selected) =>
              recipe.setDietType(selected.map((o) => o.value))
            }
            menuPosition="fixed"
            menuPlacement="auto"
          ></Select>
        </div>

        <div className={styles.inputField}>
          <label htmlFor="cuisineType">Cuisine Type</label>
          <Select
            id="cuisineType"
            options={cuisineOptions}
            value={cuisineOptions.find((o) => o.value === recipe.cuisineType)}
            onChange={(selected) =>
              recipe.setCuisineType(selected?.value || "")
            }
            menuPosition="fixed"
            menuPlacement="auto"
          ></Select>
        </div>

        <div className={styles.imgUploadBlock}>
          <input
            className={styles.imgInput}
            accept="image/*"
            type="file"
            onChange={convertToBase64}
          />
          {recipe.image == "" || recipe.image == null ? (
            ""
          ) : (
            <img width={100} height={100} src={recipe.image} />
          )}
        </div>

        <button className={styles.submitBtn} type="submit">
          Submit Recipe
        </button>
      </form>
    </>
  );
}

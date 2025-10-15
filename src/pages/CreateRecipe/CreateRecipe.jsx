import useNewRecipe from "../../hooks/useNewRecipe.js";
import styles from "./CreateRecipe.module.css";

export default function CreateRecipe() {
  const recipe = useNewRecipe();

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
            <textarea
              key={i}
              placeholder={`Step ${i + 1}`}
              value={step}
              onChange={(e) => {
                const updated = [...recipe.steps];
                updated[i] = e.target.value;
                recipe.setSteps(updated);
              }}
            />
          ))}
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
          <select
            id="courseType"
            value={recipe.courseType}
            onChange={(e) => recipe.setCourseType(e.target.value)}
          >
            <option value="">Select course type</option>
            <option value="appetizer">Appetizer</option>
            <option value="main course">Main Course</option>
            <option value="side dish">Side Dish</option>
            <option value="dessert">Dessert</option>
            <option value="snack">Snack</option>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
          </select>
        </div>

        <div className={styles.inputField}>
          <label htmlFor="dietType">Diet Type</label>
          <select
            id="dietType"
            value={recipe.dietType}
            onChange={(e) => recipe.setDietType(e.target.value)}
          >
            <option value="">Select diet type</option>
            <option value="vegan">Vegan</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="pescatarian">Pescatarian</option>
            <option value="keto">Keto</option>
            <option value="meat">Meat</option>
            <option value="lactose free">Lactose Free</option>
            <option value="gluten free">Gluten Free</option>
          </select>
        </div>

        <div className={styles.inputField}>
          <label htmlFor="cuisineType">Cuisine Type</label>
          <select
            id="cuisineType"
            value={recipe.cuisineType}
            onChange={(e) => recipe.setCuisineType(e.target.value)}
          >
            <option value="">Select cuisine type</option>
            <option value="lithuanian">Lithuanian</option>
            <option value="italian">Italian</option>
            <option value="japanese">Japanese</option>
            <option value="mexican">Mexican</option>
            <option value="indian">Indian</option>
            <option value="mediterranean">Mediterranean</option>
            <option value="french">French</option>
            <option value="american">American</option>
            <option value="korean">Korean</option>
            <option value="other">Other</option>
          </select>
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

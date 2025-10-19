import styles from "./RecipeForm.module.css";
import Select from "react-select";

export default function RecipeForm({
  recipe,
  onSubmit,
  convertToBase64,
  title = "Add a Recipe",
  submitLabel = "Submit Recipe",
  cuisineOptions,
  dietOptions,
  courseOptions,
  fileInputRef,
  errors = {},
}) {
  return (
    <>
      <h2 className={styles.headline}>{title}</h2>
      <form className={styles.recipeForm} onSubmit={onSubmit}>
        <div className={styles.inputField}>
          <label htmlFor="name">Recipe name</label>
          <input
            id="name"
            type="text"
            placeholder="Chicken noodle soup"
            value={recipe.name}
            onChange={(e) => recipe.setName(e.target.value)}
          />
          {errors.name && <p className={styles.error}>{errors.name}</p>}
        </div>

        <div className={styles.inputField}>
          <label htmlFor="description">Short description</label>
          <textarea
            id="description"
            placeholder="A comforting and easy-to-make chicken noodle soup..."
            value={recipe.description}
            onChange={(e) => recipe.setDescription(e.target.value)}
          />
          {errors.description && (
            <p className={styles.error}>{errors.description}</p>
          )}
        </div>

        <fieldset className={styles.inputField}>
          <legend>Cooking Duration</legend>
          <div className={styles.hourBlock}>
            <label htmlFor="cookingHours">Hours</label>
            <input
              id="cookingHours"
              type="number"
              min="0"
              value={recipe.cookingDuration.hours || ""}
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
              id="cookingMinutes"
              type="number"
              min="0"
              max="59"
              value={recipe.cookingDuration.minutes || ""}
              onChange={(e) =>
                recipe.setCookingDuration({
                  ...recipe.cookingDuration,
                  minutes: e.target.value,
                })
              }
            />
          </div>
          {errors.cookingDuration && (
            <p className={styles.error}>{errors.cookingDuration}</p>
          )}
        </fieldset>

        <fieldset className={styles.inputField}>
          <legend>Cleaning Time</legend>
          <div className={styles.hourBlock}>
            <label htmlFor="cleaningHours">Hours</label>
            <input
              id="cleaningHours"
              type="number"
              min="0"
              value={recipe.cleaningTime.hours || ""}
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
              type="number"
              min="0"
              max="59"
              value={recipe.cleaningTime.minutes || ""}
              onChange={(e) =>
                recipe.setCleaningTime({
                  ...recipe.cleaningTime,
                  minutes: e.target.value,
                })
              }
            />
          </div>
          {errors.cleaningTime && (
            <p className={styles.error}>{errors.cleaningTime}</p>
          )}
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
                      (_, index) => index !== i
                    );
                    recipe.setIngredients(updated);
                  }}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          {errors.ingredients && (
            <p className={styles.error}>{errors.ingredients}</p>
          )}

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
                      (_, index) => index !== i
                    );
                    recipe.setSteps(updated);
                  }}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          {errors.steps && <p className={styles.error}>{errors.steps}</p>}
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
          />
          {errors.courseType && (
            <p className={styles.error}>{errors.courseType}</p>
          )}
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
          />
          {errors.dietType && <p className={styles.error}>{errors.dietType}</p>}
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
          />
          {errors.cuisineType && (
            <p className={styles.error}>{errors.cuisineType}</p>
          )}
        </div>

        <div className={styles.imgUploadBlock}>
          <input
            ref={fileInputRef}
            className={styles.imgInput}
            accept="image/*"
            type="file"
            onChange={convertToBase64}
          />
          {recipe.image && <img width={100} height={100} src={recipe.image} />}
        </div>

        <button className={styles.submitBtn} type="submit">
          {submitLabel}
        </button>
      </form>
    </>
  );
}

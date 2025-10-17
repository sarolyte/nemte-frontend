import { useParams } from "react-router-dom";
import useFetchDataById from "../../hooks/useFetchDataById.js";
import styles from "./RecipeDetails.module.css";

export default function RecipeDetails() {
  const { id } = useParams();
  const { data, loading, error } = useFetchDataById(id);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

//   if (!data || Object.keys(data).length === 0) return <p>No recipe found.</p>;

  const createdDate = data.createdAt
    ? new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date(data.createdAt))
    : "";

  const updatedDate = data.updatedAt
    ? new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date(data.updatedAt))
    : "";

  return (
    <div>
      <div>
        <p>Created: {createdDate}</p>
        {data.updatedAt && <p>Updated: {updatedDate}</p>}
        <img src={data.image} alt={data.name} style={{ width: "400px" }} />

        <div className={styles.tags} >
            {data.courseType && data.courseType.length > 0 && (
            <p>
                <strong>Course Type:</strong> {data.courseType}
            </p>
            )}
            {data.dietType && data.dietType.length > 0 && (
            <p>
                <strong>Diet Type:</strong> {data.dietType}
            </p>
            )}
            {data.cuisineType && data.cuisineType.length > 0 && (
            <p>
                <strong>Cuisine Type:</strong> {data.cuisineType}
            </p>
            )}
        </div>

        <h1>{data.name}</h1>
        <p>
          <strong>Cooking Time:</strong> {data.cookingDuration.quantity}
        </p>

        <p>
          <strong>Cleaning Time:</strong> {data.cleaningTime.quantity}
        </p>

        <p>
          <strong>Portions:</strong> {data.portions}
        </p>

        <p>{data.description}</p>
      </div>

      <div className={styles.ingredientsBlock}>
        <h2>Ingredients</h2>
        <ul className={styles.ingredientsList}>
          {data.ingredients.map((item, index) => (
            <li key={index}>
              {item.quantity} {item.name}
            </li>
          ))}
        </ul>
      </div>

        <div>
            <h2>Steps</h2>
            <ol>
                {data.steps.map((step, index) => (
                    <li key={index}>{step}</li>
                ))}
            </ol>
        </div>


    </div>
  );
}

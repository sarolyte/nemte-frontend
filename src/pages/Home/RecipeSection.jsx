import RecipeCard from "./RecipeCard.jsx";
import useFetchData from "../../hooks/useFetchData.js";

export default function RecipeSection() {
  const { data } = useFetchData();

  const sortedData = [...data].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const limitedData = sortedData.slice(0, 9);

  return (
    <div>
      <h2>Recipes</h2>
      <div id="recipes">
        {limitedData.map((recipe) => (
          <RecipeCard
            key={recipe._id}
            title={recipe.name}
            img={recipe.image}
            description={recipe.description}
          />
        ))}
      </div>
    </div>
  );
}

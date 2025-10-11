import RecipeCard from "./RecipeCard.jsx";
import useFetchData from "../../hooks/useFetchData.js";
import styles from './RecipeSection.module.css';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';

export default function RecipeSection() {
  const { data } = useFetchData();

  const sortedData = [...data].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const limitedData = sortedData.slice(0, 9);

  return (
    <div className={styles.sectionWrapper} >
      <h2>Newest recipes</h2>
      <div  className={styles.recipes} id="recipes">
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

import { Link } from "react-router-dom";
import styles from "./RecipeCard.module.css";

export default function RecipeCard({ id, img, title, description }) {
  const shortDescription =
    description.length > 120 ? description.slice(0, 120) + "..." : description;

  return (
    <Link to={`/recipe/${id}`}>
      <div className={styles.cardWrapper}>
        <div className={styles.imageBlock}>
          <img src={img} alt="" />
        </div>

        <div className={styles.cardInfo}>
          <h3> {title} </h3>
          <div className={styles.description}>
            <p> {shortDescription} </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

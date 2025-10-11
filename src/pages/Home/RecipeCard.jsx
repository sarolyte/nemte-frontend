import styles from "./RecipeCard.module.css";

export default function RecipeCard({ img, title, description }) {
  const shortDescription =
    description.length > 120 ? description.slice(0, 120) + "..." : description;

  return (
    <div className={styles.cardWrapper}>
      <div className={styles.imageBlock}>
        <img src={img} alt="" />
      </div>
      <h3> {title} </h3>
      <p> {shortDescription} </p>
    </div>
  );
}

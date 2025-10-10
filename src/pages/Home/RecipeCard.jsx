import styles from './RecipeCard.module.css'

export default function RecipeCard({img, title, description}) {
    return (
        <div className={styles.cardWrapper} >
            <div className={styles.image} >
                <img src={img} alt="" />
            </div>
            <h3> {title} </h3>
            <p> {description} </p>
        </div>
    )
}
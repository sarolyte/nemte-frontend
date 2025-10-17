import RecipeCard from "../../components/RecipeCard/RecipeCard";
import useFetchData from "../../hooks/useFetchData";
import styles from './AllRecipes.module.css'

export default function AllRecipes() {
    const { data } = useFetchData();
    return (
        <>
        <div>
            <p>filter and sort</p>
        </div>
            <div className={styles.sectionWrapper} >
              <h2>All recipes</h2>
              <div className={styles.containerWrapper}>
                <div className={styles.container} id="recipes">
                  {data.map((recipe) => (
                    <RecipeCard
                      key={recipe._id}
                      id={recipe._id}
                      title={recipe.name}
                      img={recipe.image}
                      description={recipe.description}
                    />
                  ))}
                </div>
              </div>
            </div>
        </>
    )
}
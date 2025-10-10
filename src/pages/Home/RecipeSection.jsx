import RecipeCard from "./RecipeCard.jsx";
import useFetchData from "../../hooks/useFetchData.js";

export default function RecipeSection() {
    const { data } = useFetchData();

    return (
        <div>
            <h2>Recipes</h2>
            <div id='recipes'>
                {console.log(data)}
                { data.map((recipe) => <RecipeCard key={recipe._id} title={recipe.name} img={recipe.image} description={recipe.description} />) }
            </div>
            
        </div>
    )
}
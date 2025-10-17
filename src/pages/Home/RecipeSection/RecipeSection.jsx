
import RecipeCard from "../../../components/RecipeCard/RecipeCard.jsx";
import useFetchData from "../../../hooks/useFetchData.js";
import styles from './RecipeSection.module.css';
import { useRef, useState } from "react";

//for pc
// const ITEM_WIDTH = 320;

export default function RecipeSection() {
  const { data } = useFetchData();
  //for pc
  // const [ scrollPosition, setScrollPosition ] = useState(0);
  const containerRef = useRef();

  //for pc (buttons too)
  // const handleScroll = (scrollAmount) => {
  //   //calculates the new scroll position
  //   const newScrollPosition = scrollPosition + scrollAmount;
  //   //updates scroll position
  //   setScrollPosition(newScrollPosition);

  //   containerRef.current.scrollLeft = newScrollPosition;
  // }


  const sortedData = [...data].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  const limitedData = sortedData.slice(0, 9);

  return (
    <div className={styles.sectionWrapper} >
      <h2>Newest recipes</h2>
      <div ref={containerRef} className={styles.containerWrapper}>
        <div className={styles.container} id="recipes">
          {limitedData.map((recipe) => (
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
      
{/* for pc */}
      {/* <div className={styles.actionBtns} >
        <button onClick={() => {handleScroll(-ITEM_WIDTH)}} >Scroll Left</button>
        <button onClick={() => {handleScroll(ITEM_WIDTH)}} >Scroll Right</button>
      </div> */}
    </div>
  );
}

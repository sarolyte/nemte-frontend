import RecipeCard from "../../../components/RecipeCard/RecipeCard.jsx";
import { useBreakpoints } from "../../../hooks/useBreakpoints.js";
import useFetchData from "../../../hooks/useFetchData.js";
import styles from './RecipeSection.module.css';
import { useRef, useState } from "react";
import { BsArrowLeftShort } from 'react-icons/bs';
import { BsArrowRightShort } from 'react-icons/bs';

//for pc
const ITEM_WIDTH = 300;

export default function RecipeSection() {
  const { data } = useFetchData();
  const containerRef = useRef();
  const { isDesktop } = useBreakpoints();

const handleScroll = (scrollAmount) => {
  if (containerRef.current) {
    containerRef.current.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  }
};

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
      {isDesktop && (
        <div className={styles.actionBtns}>
          <button onClick={() => handleScroll(-ITEM_WIDTH)}> <BsArrowLeftShort/> </button>
          <button onClick={() => handleScroll(ITEM_WIDTH)}> <BsArrowRightShort/> </button>
        </div>
      )}

    </div>
  );
}

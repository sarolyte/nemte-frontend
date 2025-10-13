import { useState } from "react";
import styles from "./GridGallery.module.css";

export default function GridGallery({ images = [] }) {
  const [activeImage, setActiveImage] = useState(null);

  const handleImageClick = (src) => {
    setActiveImage(src);
  };

  const closeImage = () => {
    setActiveImage(null);
  };

  return (
    <>
      <div className={styles.imageGallery}>
        {images.map(({ src, alt }, i) => (
          <img
            key={i}
            src={src}
            alt={alt}
            className={styles.thumbnail}
            onClick={() => handleImageClick(src)}
          />
        ))}
      </div>

      {activeImage && (
        <div className={styles.overlay} onClick={closeImage}>
          <img src={activeImage} alt="Full view" className={styles.fullImage} />
        </div>
      )}
    </>
  );
}

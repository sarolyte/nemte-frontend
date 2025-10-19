import { useNavigate, useParams } from "react-router-dom";
import useFetchDataById from "../../hooks/useFetchDataById.js";
import styles from "./RecipeDetails.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import useDeleteRecipe from "../../hooks/useDeleteRecipe.js";
import Modal from "../../components/Modal/Modal.jsx";
import Footer from "../../components/Footer/Footer.jsx";

export default function RecipeDetails() {
  const { id } = useParams();
  const { data, loading, error } = useFetchDataById(id);
  const navigate = useNavigate();
  const { deleteRecipe } = useDeleteRecipe();

  const [modalOpen, setModalOpen] = useState(false);

  const handleDelete = async () => {
    const success = await deleteRecipe(id);
    if (success) navigate("/");
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data || Object.keys(data).length === 0) return <p>No recipe found.</p>;

  const createdDate = data.createdAt
    ? new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date(data.createdAt))
    : "";

  const updatedDate = data.updatedAt
    ? new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date(data.updatedAt))
    : "";

  return (
    <div>
      <div className={styles.pageWrapper}>
        <div className={styles.wrapper}>
          <div className={styles.datesBlock}>
            <p>Created: {createdDate}</p>
            {data.updatedAt && <p>Updated: {updatedDate}</p>}
          </div>

          <div className={styles.imgBlock}>
            <img src={data.image} alt={data.name} />
          </div>

          <div>
            <div className={styles.tags}>
              {Array.isArray(data.courseType) && data.courseType.length > 0 && (
                <div className={styles.courseTagGroup}>
                  {data.courseType.map((type, index) => (
                    <p key={index} className={styles.courseTag}>
                      {type}
                    </p>
                  ))}
                </div>
              )}
              {Array.isArray(data.dietType) && data.dietType.length > 0 && (
                <div className={styles.dietTagGroup}>
                  {data.dietType.map((type, index) => (
                    <p key={index} className={styles.dietTag}>
                      {type}
                    </p>
                  ))}
                </div>
              )}
              {data.cuisineType && data.cuisineType.length > 0 && (
                <p className={styles.cuisineTag}>{data.cuisineType}</p>
              )}
            </div>

            <h1>{data.name}</h1>

            <div className={styles.infoBlock}>
              <p>
                <span>Cooking Time:</span> {data.cookingDuration.quantity}
              </p>

              <p>
                <span>Cleaning Time:</span> {data.cleaningTime.quantity}
              </p>

              <p>
                <span>Portions:</span> {data.portions}
              </p>
            </div>

            <p className={styles.descriptionBlock}>{data.description}</p>
          </div>

          <div className={styles.ingredientsBlock}>
            <h2>Ingredients</h2>
            <ul className={styles.ingredientsList}>
              {data.ingredients.map((item, index) => (
                <li key={index}>
                  {item.quantity} {item.name}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.stepsBlock}>
            <h2>Steps</h2>
            <ol>
              {data.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      <div className={styles.btnsBlock}>
        <Link to={`/edit/${id}`}>
          <button>Edit</button>
        </Link>

        <button onClick={openModal}>Delete</button>
      </div>

      <Modal
        isOpen={modalOpen}
        message="Are you sure you want to delete this recipe?"
        btnTxt="Yes"
        secondBtnTxt="No"
        onClose={closeModal}
        onConfirm={() => {
          closeModal();
          handleDelete();
        }}
      />
      {data && Object.keys(data).length > 0 && !loading && !error && (
        <Footer shortTxt="© 2025 Nemte. All rights reserved" />
      )}
    </div>
  );
}

import RecipeCard from "../../components/RecipeCard/RecipeCard";
import {
  courseOptions,
  cuisineOptions,
  dietOptions,
} from "../../components/RecipeForm/RecipeFormOptions";
import useFetchData from "../../hooks/useFetchData";
import styles from "./AllRecipes.module.css";
import { useState, useEffect, useMemo } from "react";
import Select from "react-select";

export default function AllRecipes() {
  const { data } = useFetchData();

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState([]);
  const [selectedDiet, setSelectedDiet] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState([]);
  const [sortOrder, setSortOrder] = useState("newest");

  //search
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 400);
    return () => clearTimeout(timeout);
  }, [searchTerm]);

  const filteredData = useMemo(() => {
    let filtered = [...data];

    if (debouncedSearch.trim()) {
      filtered = filtered.filter((recipe) =>
        recipe.name.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }

    if (selectedCuisine.length > 0) {
      const values = selectedCuisine.map((opt) => opt.value);
      filtered = filtered.filter((r) => values.includes(r.cuisineType));
    }

    if (selectedDiet.length > 0) {
      const values = selectedDiet.map((opt) => opt.value);
      filtered = filtered.filter((r) =>
        r.dietType?.some((type) => values.includes(type))
      );
    }

    if (selectedCourse.length > 0) {
      const values = selectedCourse.map((opt) => opt.value);
      filtered = filtered.filter((r) =>
        r.courseType?.some((type) => values.includes(type))
      );
    }

    filtered.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

    return filtered;
  }, [
    data,
    debouncedSearch,
    selectedCuisine,
    selectedDiet,
    selectedCourse,
    sortOrder,
  ]);

  return (
    <>
      <div>
        <div className={styles.filters}>
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />

          <Select
            isMulti
            options={cuisineOptions}
            value={selectedCuisine}
            onChange={setSelectedCuisine}
            placeholder="Filter by cuisine"
            className={styles.select}
          />

          <Select
            isMulti
            options={dietOptions}
            value={selectedDiet}
            onChange={setSelectedDiet}
            placeholder="Filter by diet"
            className={styles.select}
          />

          <Select
            isMulti
            options={courseOptions}
            value={selectedCourse}
            onChange={setSelectedCourse}
            placeholder="Filter by course"
            className={styles.select}
          />

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className={styles.sortSelect}
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>
        </div>
      </div>
      <div className={styles.sectionWrapper}>
        <h2>All recipes</h2>
        <div className={styles.containerWrapper}>
          <div className={styles.container} id="recipes">
            {filteredData.map((recipe) => (
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
  );
}

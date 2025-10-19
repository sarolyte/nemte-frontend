import Footer from "../../components/Footer/Footer.jsx";
import RecipeCard from "../../components/RecipeCard/RecipeCard.jsx";
import {
  courseOptions,
  cuisineOptions,
  dietOptions,
} from "../../components/RecipeForm/RecipeFormOptions.jsx";
import useFetchData from "../../hooks/useFetchData.js";
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

  //filter and sort
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
    <div className={styles.pageWrapper} >
      <div className={styles.contentWrapper} >
              <div className={styles.pageWrapper}>
        <div className={styles.filtersWrapper}>
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

          <Select
            options={[
              { value: "newest", label: "Newest first" },
              { value: "oldest", label: "Oldest first" },
            ]}
            value={{
              value: sortOrder,
              label: sortOrder === "newest" ? "Newest first" : "Oldest first",
            }}
            onChange={(selected) => setSortOrder(selected.value)}
            className={styles.select}
          />
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
      </div>

      </div>
            {filteredData.length > 0 && (
        <Footer shortTxt="© 2025 Nemte. All rights reserved" />
      )}
    </div>
  );
}

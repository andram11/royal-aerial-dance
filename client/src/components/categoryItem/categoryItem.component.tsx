import React from "react";
import { Category } from "../../types/types.js";

//Styles
import styles from "./categoryItem.module.css";
import { Link } from "react-router-dom";

interface CategoryItemProps {
  category: Category;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ category }) => {
  return (
    <>
      <div className={styles.container}>
        <img className={styles.backgroundImage} src={category.imageUrl}></img>
        <div className={styles.body}>
          <Link to={`/courses/${category.title.toLowerCase()}`}>
            <h2>{category.title.toUpperCase()}</h2>
          </Link>
        </div>
      </div>
    </>
  );
};

export default CategoryItem;

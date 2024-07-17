
import React from 'react'

import { useAppSelector } from '../../hooks.js'
import { selectSelectedCategory } from '../../state/categories/categoriesSlice.js'
import { Category } from '../../types/types.js'



//Styles
import styles from './categoryItem.module.css'

interface CategoryItemProps {
  category: Category;
}

const CategoryItem:  React.FC<CategoryItemProps> = ({category}) => {
 
    return (
       <>
      
       <div className={styles.container}>
        <img className={styles.backgroundImage} src={category.imageUrl}>

        </img>
         <div className={styles.body}>
          <h2>{category.title.toUpperCase()}</h2>
         </div>
       </div>

       </>
    )
}

export default CategoryItem;
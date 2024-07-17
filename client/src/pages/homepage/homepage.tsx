
import React from 'react'

import { useAppDispatch, useAppSelector } from '../../hooks.js'
import { selectCategories, selectSelectedCategory, setCategories } from '../../state/categories/categoriesSlice.js'
import { useEffect } from 'react'
import { getCategories } from '../../api/api-service.js'
import CategoryItem from '../../components/categoryItem/categoryItem.component.js'



//Styles
import styles from './homepage.module.css'
import Footer from '../../components/footer/footer.component.js'

const Homepage: React.FC= () => {
    const dispatch= useAppDispatch()
    const categories= useAppSelector(selectCategories)
    const selectedCategory= useAppSelector(selectSelectedCategory)

    useEffect(()=>{
        const fetchCategoryData = async () => {
            const categories = await getCategories();
            dispatch(setCategories(categories));
          };
          fetchCategoryData()
    }, [dispatch])



    return (
        <>
        <div className={styles.container}>
        {categories.map((category) => (
            //Category Item Component
            <CategoryItem key={category.id} category={category}/>
          
        ))}
      </div>
      <Footer/>
        </>
        
     
    )
}

export default Homepage;

import React from 'react'

import { useAppDispatch, useAppSelector } from '../../hooks.js'
import { clearLoading, selectCategories, selectLoading, setCategories, setLoading } from '../../state/categories/categoriesSlice.js'
import { useEffect } from 'react'
import { getCategories } from '../../api/api-service.js'
import CategoryItem from '../../components/categoryItem/categoryItem.component.js'



//Styles
import styles from './homepage.module.css'
import Footer from '../../components/footer/footer.component.js'

const Homepage: React.FC= () => {
    const dispatch= useAppDispatch()
    const categories= useAppSelector(selectCategories)
    const loadingCategories= useAppSelector(selectLoading)

    useEffect(()=>{
        
        const fetchCategoryData = async () => {
            try{
                dispatch(setLoading())
                const categories = await getCategories();
                dispatch(setCategories(categories));
            } catch(err){
                console.error("Error fetching categories: ", err)
                dispatch(clearLoading())
            }
            
          };
          fetchCategoryData()
    }, [dispatch])



    return (
        <>
        {loadingCategories && <p className={styles.container}>Loading...this app is hosted on a free server which can delay requests up to 2-3 minutes. Don't hesitate to refresh the page after 1-2 minutes...</p>}
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
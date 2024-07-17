import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { Category } from '../../types/types'
import { RootState } from '../store'


export interface CategoriesState {
    categories: Category[];
    selectedCategory: Category | null
  }

const initialState: CategoriesState = {
    categories: [],
    selectedCategory: null
  };

const categoriesSlice= createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setCategories: (state, action: PayloadAction<Category[]>)=> {
            state.categories= action.payload},
        setSelectedCategory: (state, action: PayloadAction<number>) => {
          state.selectedCategory = state.categories.find(category => category.id === action.payload) || null;
      }
    },
    

})

export const {setCategories, setSelectedCategory}= categoriesSlice.actions
export const selectCategories = (state: RootState) => state.categories.categories;
export const selectSelectedCategory = (state: RootState) => state.categories.selectedCategory;
export default categoriesSlice.reducer
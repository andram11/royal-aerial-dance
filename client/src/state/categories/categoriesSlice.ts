import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { Category } from '../../types/types'
import { RootState } from '../store'


export interface CategoriesState {
    categories: Category[];
    selectedCategory: Category | null;
    loading: boolean;
  }

const initialState: CategoriesState = {
    categories: [],
    selectedCategory: null,
    loading: false
  };

const categoriesSlice= createSlice({
    name: 'categories',
    initialState,
    reducers: {
      setLoading: (state) => {
        state.loading = true;
      },
        setCategories: (state, action: PayloadAction<Category[]>)=> {
            state.categories= action.payload
            state.loading= false},
        setSelectedCategory: (state, action: PayloadAction<number>) => {
          state.selectedCategory = state.categories.find(category => category.id === action.payload) || null;
      },
      clearLoading: (state) => {
        state.loading = false;
      },
    },
    

})

export const {setCategories, setSelectedCategory,setLoading, clearLoading}= categoriesSlice.actions
export const selectCategories = (state: RootState) => state.categories.categories;
export const selectSelectedCategory = (state: RootState) => state.categories.selectedCategory;
export const selectLoading= (state: RootState)=> state.categories.loading
export default categoriesSlice.reducer
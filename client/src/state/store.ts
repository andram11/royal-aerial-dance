import { configureStore } from "@reduxjs/toolkit";
import courseReducer from './courses/coursesSlice'
import categoryReducer from './categories/categoriesSlice'

export const store= configureStore({
    reducer: {
        courses: courseReducer,
        categories: categoryReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
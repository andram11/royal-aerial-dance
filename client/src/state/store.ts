import { configureStore } from "@reduxjs/toolkit";
import courseReducer from './courses/coursesSlice'
import categoryReducer from './categories/categoriesSlice'
import cartReducer from './cart/cartSlice'

export const store= configureStore({
    reducer: {
        courses: courseReducer,
        categories: categoryReducer,
        cartItems: cartReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
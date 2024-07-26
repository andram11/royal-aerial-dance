import { configureStore } from "@reduxjs/toolkit";
import courseReducer from './courses/coursesSlice'
import categoryReducer from './categories/categoriesSlice'
import cartReducer from './cart/cartSlice'
import participantReducer from './participant/participantSlice'
import orderReducer from './order/orderSlice'

export const store= configureStore({
    reducer: {
        courses: courseReducer,
        categories: categoryReducer,
        cartItems: cartReducer,
        participant: participantReducer,
        order: orderReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
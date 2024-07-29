import { configureStore } from "@reduxjs/toolkit";
import courseReducer from './courses/coursesSlice'
import categoryReducer from './categories/categoriesSlice'
import cartReducer from './cart/cartSlice'
import participantReducer from './participant/participantSlice'
import orderReducer from './order/orderSlice'
import userReducer from './user/userSlice'

export const store= configureStore({
    reducer: {
        courses: courseReducer,
        categories: categoryReducer,
        cartItems: cartReducer,
        participant: participantReducer,
        order: orderReducer,
        user: userReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
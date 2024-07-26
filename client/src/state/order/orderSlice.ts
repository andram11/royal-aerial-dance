import { createSlice, PayloadAction } from '@reduxjs/toolkit';


import { RootState } from '../store';


const initialState = {
    status: '' 
}

const orderSlice= createSlice({
    name: 'order',
    initialState,
    reducers: {
        setOrderStatus (state, action: PayloadAction<string>){
            state.status=action.payload
        }

    }
})

export const { setOrderStatus} = orderSlice.actions;
export const selectOrderStatus= (state: RootState): string=> state.order.status
export default orderSlice.reducer;
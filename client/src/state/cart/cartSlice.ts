import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CartItem } from '../../types/types';
import { RootState } from '../store';

export interface CartState {
    items: CartItem[];
    totalQuantity: number;
    totalPrice: number 
    isCartOpen: boolean
}

const initialState: CartState= {
    items: [],
    isCartOpen: false,
    totalQuantity: 0,
    totalPrice: 0
}

const cartSlice= createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setIsCartOpen (state, action: PayloadAction<boolean>){
            state.isCartOpen=action.payload
        },
        addItemToCart(state, action: PayloadAction<CartItem>){
            const newItem= action.payload
            const existingItem= state.items.find(item=> item.id===newItem.id)

            if (existingItem){
                existingItem.quantity += newItem.quantity
                existingItem.price += newItem.price*newItem.quantity
            } else {
                state.items.push({
                    ...newItem,
                    price: newItem.price*newItem.quantity
                })
            }

            state.totalQuantity += newItem.quantity
            state.totalPrice += newItem.price*newItem.quantity
        },

        removeItemFromCart(state, action: PayloadAction<string>) {
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);
      
            if (existingItem) {
              state.totalQuantity -= existingItem.quantity;
              state.totalPrice -= existingItem.price;
              state.items = state.items.filter(item => item.id !== id);
            }
          },

          updateItemQuantity(state, action: PayloadAction<{ id: string, quantity: number }>) {
            const { id, quantity } = action.payload;
            const existingItem = state.items.find(item => item.id === id);
      
            if (existingItem && quantity > 0) {
              state.totalQuantity += quantity - existingItem.quantity;
              state.totalPrice += (quantity - existingItem.quantity) * (existingItem.price / existingItem.quantity);
              existingItem.quantity = quantity;
            }
          },


    }
})

export const { setIsCartOpen, addItemToCart, removeItemFromCart, updateItemQuantity } = cartSlice.actions;
export const selectIsCartOpen= (state: RootState): boolean=> state.cartItems.isCartOpen
export const selectCartItems= (state: RootState): CartItem[]=> state.cartItems.items
export const selectTotalQuantity= (state: RootState): number=> state.cartItems.totalQuantity 
export const selectTotalPrice= (state: RootState): number=> state.cartItems.totalPrice 
export default cartSlice.reducer;
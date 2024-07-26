import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CartItem } from "../../types/types";
import { RootState } from "../store";

export interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
  isCartOpen: boolean;
}

const initialState: CartState = {
  items: [],
  isCartOpen: false,
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setIsCartOpen(state, action: PayloadAction<boolean>) {
      state.isCartOpen = action.payload;
    },
    clearCart(state) {
        state.items = [];
        state.totalQuantity = 0;
        state.totalPrice = 0;
    },
    addItemToCart(state, action: PayloadAction<CartItem>) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity += newItem.quantity;
        existingItem.price += newItem.price * newItem.quantity;
      } else {
        state.items.push({
          ...newItem,
          price: newItem.price * newItem.quantity,
        });
      }

      state.totalQuantity += newItem.quantity;
      state.totalPrice += newItem.price * newItem.quantity;
    },

    removeItemFromCart(state, action: PayloadAction<string>) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalPrice -= existingItem.price;
        state.items = state.items.filter((item) => item.id !== id);
      }
    },

    increaseItemQuantity(state, action: PayloadAction<string>) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += 1;
        state.totalQuantity += 1;
        state.totalPrice += existingItem.price;
      }
    },
    decreaseItemQuantity(state, action: PayloadAction<string>) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
        state.totalQuantity -= 1;
        state.totalPrice -= existingItem.price;
      } else if (existingItem && existingItem.quantity === 1) {
        state.totalQuantity -= existingItem.quantity;
        state.totalPrice -= existingItem.price;
        state.items = state.items.filter((item) => item.id !== id);
      }
    },
  },
});

export const {
  setIsCartOpen,
  addItemToCart,
  removeItemFromCart,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;
export const selectIsCartOpen = (state: RootState): boolean =>
  state.cartItems.isCartOpen;
export const selectCartItems = (state: RootState): CartItem[] =>
  state.cartItems.items;
export const selectTotalQuantity = (state: RootState): number =>
  state.cartItems.totalQuantity;
export const selectTotalPrice = (state: RootState): number =>
  state.cartItems.totalPrice;
export default cartSlice.reducer;

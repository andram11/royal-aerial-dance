import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../../types/types";
import { RootState } from "../store";

export interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
  isCartOpen: boolean;
}

// Utility function to calculate totals
const calculateTotals = (items: CartItem[]) => {
  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  return { totalQuantity, totalPrice };
};

// Load cart items from local storage and calculate initial totals
const savedCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
const initialState: CartState = {
  items: savedCartItems,
  isCartOpen: false,
  ...calculateTotals(savedCartItems),
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
      localStorage.removeItem('cartItems');
    },
    addItemToCart(state, action: PayloadAction<CartItem>) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.items.push(newItem);
      }

      const { totalQuantity, totalPrice } = calculateTotals(state.items);
      state.totalQuantity = totalQuantity;
      state.totalPrice = totalPrice;

      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },

    removeItemFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      const { totalQuantity, totalPrice } = calculateTotals(state.items);
      state.totalQuantity = totalQuantity;
      state.totalPrice = totalPrice;

      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },

    increaseItemQuantity(state, action: PayloadAction<string>) {
      const existingItem = state.items.find((item) => item.id === action.payload);
      if (existingItem) {
        existingItem.quantity += 1;
      }

      const { totalQuantity, totalPrice } = calculateTotals(state.items);
      state.totalQuantity = totalQuantity;
      state.totalPrice = totalPrice;

      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },

    decreaseItemQuantity(state, action: PayloadAction<string>) {
      const existingItem = state.items.find((item) => item.id === action.payload);
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      } else if (existingItem && existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== action.payload);
      }

      const { totalQuantity, totalPrice } = calculateTotals(state.items);
      state.totalQuantity = totalQuantity;
      state.totalPrice = totalPrice;

      localStorage.setItem('cartItems', JSON.stringify(state.items));
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

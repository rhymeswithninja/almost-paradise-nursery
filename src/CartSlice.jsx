import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
    cartQuantity: 0,
    disabledItems: [],
  },
  reducers: {
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existingItem = state.items.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ name, image, cost, quantity: 1 });
      }
      state.cartQuantity++; //
      state.disabled = false;
    },

    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.name !== action.payload);
      state.cartQuantity--; // Decrement the cart quantity by 1 when an item is removed from the cart
      // Add the removed item to disabledItems array
      if (!state.disabledItems.includes(action.payload)) {
        state.disabledItems.push(action.payload);
      }
    },

    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload; // Extract item name and updated quantity
      const itemToUpdate = state.items.find(item => item.name === name);

      if (itemToUpdate) {
        // Update the quantity of the item
        itemToUpdate.quantity = quantity;

        // If quantity is 0, remove the item from the cart
        if (quantity <= 0) {
          state.items = state.items.filter(item => item.name !== name);
        }
      }
    },

    CartQuantity: (state, action) => {
      state.cartQuantity = action.payload;
    },
  },
});

export const { addItem, removeItem, updateQuantity, CartQuantity } = CartSlice.actions;

export default CartSlice.reducer;

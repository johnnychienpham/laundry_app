import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    product: [],
  },
  reducers: {
    getProducts: (state, action) => {
      state.product.push({ ...action.payload });
    },
    incrementQty: (state, action) => {
      const itemPresent = state.product.find(
        (item) => item.id === action.payload.id
      );
      itemPresent.quantity++;
    },
    decrementQty: (state, action) => {
      const itemPresent = state.product.find(
        (item) => item.id === action.payload.id
      );
      // nếu quantity==1 thì khi bấm minus sẽ giảm thành 0 và xóa khỏi cart
      if (itemPresent.quantity == 1) {
        itemPresent.quantity = 0;
        const removeItem = state.product.filter((item) => item.id !== action.payload.id);
        state.cart = removeItem;
      } else {
        itemPresent.quantity--;
      }
    },
    cleanProduct: (state) => {
      state.product.map((item) => {
        if (item.quantity > 0) {
          item.quantity = 0
        }
      })

    }
  },
});

export const { getProducts, incrementQty, decrementQty, cleanProduct } = productSlice.actions;

export default productSlice.reducer;

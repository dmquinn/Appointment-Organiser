import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders: (state, action) => {
      state.orders = [action.payload];
    },
  },
});

export const { setOrders } = ordersSlice.actions;
export const selectOrders = (state) => state.orders;

export default ordersSlice.reducer;

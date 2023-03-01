import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { HYDRATE, createWrapper } from 'next-redux-wrapper'
import orders from './ordersSlice'

const combinedReducer = combineReducers({
  orders,
});

const masterReducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      orders: {
        orders: [...action.payload.orders.orders, ...state.orders.orders]
      }
    }
    return nextState;
  } else {
    return combinedReducer(state, action)
  }
}

export const makeStore = () =>
  configureStore({
    reducer: masterReducer,
  });

export const wrapper = createWrapper(makeStore, { debug: true });
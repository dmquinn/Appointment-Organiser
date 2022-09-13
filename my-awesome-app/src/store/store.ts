import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import fetchDataReducer from "./reducers/fetchDataSlice";

export const store = configureStore({
  reducer: {
    data: fetchDataReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

import { createSlice } from "@reduxjs/toolkit";
// import type { RootState } from "../store";
import data from "../../json/data.json";

const initialState = data;

export const fetchDataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    getData: () => {
      return initialState;
    },
  },
});

export const { getData } = fetchDataSlice.actions;

export const selectData = () => data;

export default fetchDataSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
// import type { RootState } from "../store";
import data from "../../json/data.json";

const initialState = data;

export const fetchDataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    getAllData: () => {
      return initialState;
    },
  },
});

export const { getAllData } = fetchDataSlice.actions;

export const selectData = () => data;

export default fetchDataSlice.reducer;

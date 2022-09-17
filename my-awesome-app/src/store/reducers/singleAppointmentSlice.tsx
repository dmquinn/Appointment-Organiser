// import { createSlice } from "@reduxjs/toolkit";
// import { RootState } from "store/store";
// import data from "../../json/data.json";

// const initialState = data;

// export const fetchAppointmentSlice = createSlice({
//   name: "appointment",
//   initialState,
//   reducers: {
//     getAppointment: () => {
//       const pathArray = window.location.pathname.split("/").toString();
//       return data.map((item) => {
//         return item.orderNo === pathArray;
//       });
//     },
//   },
// });

// export const { getAppointment } = fetchAppointmentSlice.actions;

// export const selectAppointment = (state: RootState) => state;

// export default fetchAppointmentSlice.reducer;

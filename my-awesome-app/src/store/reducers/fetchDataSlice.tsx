import { createSlice } from "@reduxjs/toolkit";
// import type { RootState } from "../store";
import { connectToDatabase } from "../../lib/mongodb";
import { Order } from "../../models/OrderModel";

async function getPosts(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectToDatabase();
    const orders = await Order.find({});
    console.log(orders);
    res.json(orders);
    return orders;
  } catch (err) {
    console.log(err);
    res.status(500).send("error");
  }
}
const initialState = null;

export const fetchDataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    getAllData: () => {
      return getPosts();
    },
  },
});

export const { getAllData } = fetchDataSlice.actions;

export const selectData = () => data;

export default fetchDataSlice.reducer;

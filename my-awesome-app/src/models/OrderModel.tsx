import mongoose from "mongoose";
const { Schema, model } = mongoose;

const orderSchema = new mongoose.Schema({
  orderNo: {
    type: String || Number,
  },
  customer: {
    name: { type: String },
    email: { type: String },
    phone: { type: String },
  },
  item: {
    title: { type: String },
    category: { type: String },
  },
  status: { type: String },
  targetDate: { type: String || Date },
});

export default (mongoose?.models?.Order as Order) ||
  mongoose?.model("Order", orderSchema);

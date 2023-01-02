import mongoose from "mongoose";
const { Schema, model } = mongoose;

const orderSchema = new Schema(
  {
    orderNo: {
      type: String,
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
    targetDate: { type: Date },
  },
  { collection: "posts" }
);

export const Order =
  mongoose.models.Order || mongoose.model("Order", orderSchema);

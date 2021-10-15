import { Schema, model } from "mongoose";

const schema = new Schema({
  user: {
    type: String,
  },
  product: {
    type: String,
  },
  amount: {
    type: Number,
  },
  price: {
    type: Number,
  },
});

export const orderModel = model("orders", schema);

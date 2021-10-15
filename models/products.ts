import { Schema, model } from "mongoose";

const schema = new Schema({
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
  amounts: {
    type: Number,
  },
});

export const productModel = model("product", schema);

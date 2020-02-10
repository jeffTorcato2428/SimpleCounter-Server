import { Schema, model } from "mongoose";

const counterSchema = new Schema({
  counter: {
    type: Number,
    required: true
  }
});
export default model("counter", counterSchema);

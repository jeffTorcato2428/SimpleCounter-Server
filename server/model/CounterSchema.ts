import { Schema, model, Document } from "mongoose";

export interface ICounter extends Document {
  _doc: any;
  counter: number
}

const counterSchema = new Schema({
  counter: {
    type: Number,
    required: true
  }
});
export default model<ICounter>("counter", counterSchema);

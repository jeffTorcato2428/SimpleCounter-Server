import CounterSchema from "./CounterSchema";
import { Types } from "mongoose";

class Counter {
  _id: Types.ObjectId;
  counter: number;
  static changeCounter: (_counter: any) => Promise<any>;
  static getCounter: () => Promise<any>;

  constructor(_id: Types.ObjectId, counter: number) {
    this._id = _id;
    this.counter = counter;
  }
}

Counter.changeCounter = async _counter => {
  const doc = await CounterSchema.findById("5e413c741c9d440000647d78");
  if (!doc) {
    throw Error("No document");
  }
  doc.counter = _counter;
  await doc.save();
  return doc._doc
};

Counter.getCounter = async () => {
  const doc = await CounterSchema.findById("5e413c741c9d440000647d78");
  if (!doc) {
    throw Error("No document");
  }
  return doc._doc.counter;
};

export default Counter;

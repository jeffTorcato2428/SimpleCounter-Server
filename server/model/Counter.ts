import CounterSchema from "./CounterSchema";
import { Types, Document } from "mongoose";

class Counter {
  _id: Types.ObjectId;
  counter: number;
  static changeCounter: (_counter: any) => Promise<any>;
  static getCounter: (_id: any) => Promise<any>;

  constructor(_id: Types.ObjectId, counter: number) {
    this._id = _id;
    this.counter = counter;
  }
}

Counter.changeCounter = async _counter => {
  const counterDoc = await CounterSchema.findById("5e413c741c9d440000647d78");
  if (!counterDoc) {
    throw Error("No document");
  }
  counterDoc.counter = _counter;
  await counterDoc.save();
  return { ...counterDoc._doc };
};

Counter.getCounter = async _id => {
  const doc = await CounterSchema.findById(_id);
  if (!doc) {
    throw Error("No document");
  }
  return { ...doc._doc };
};

export default Counter;

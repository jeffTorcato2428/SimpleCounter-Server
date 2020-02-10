import CounterSchema from "./CounterSchema";

class Counter {
  static changeCounter: (_counter: any) => Promise<void>;
  static getCounter: () => Promise<any>;
}

Counter.changeCounter = async _counter => {
  const doc = await CounterSchema.findById("5e413c741c9d440000647d78");
  if (!doc) {
    throw Error("No document");
  }
  doc.counter = _counter;
  await doc.save();
};

Counter.getCounter = async () => {
  const doc = await CounterSchema.findById("5e413c741c9d440000647d78");
  if (!doc) {
    throw Error("No document");
  }
  return doc._doc.counter
};

export default Counter;

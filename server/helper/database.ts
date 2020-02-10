import { MongoClient, Db } from "mongodb";

// const Mongo_URI =
//   "mongodb+srv://jeff:R9cz6xXtpUHcb4q9@practicecluster-x5udc.mongodb.net/test?retryWrites=true&w=majority";
// const mongoClient = new MongoClient(Mongo_URI, { useNewUrlParser: true });
// let database: Db;
// mongoClient.connect(err => {
//   console.log("[Connected to Database]")
//   database = mongoClient.db("test");
// });

const Mongo_URI =
  "mongodb+srv://jeff:R9cz6xXtpUHcb4q9@practicecluster-x5udc.mongodb.net/test?retryWrites=true&w=majority";
const mongoClient = new MongoClient(Mongo_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const mongoConnect = async () => {
  await mongoClient.connect();
  console.log("Connected successfully to MongoDB");
  const database = mongoClient.db("test");
  const collection = database.collection("count");
  return collection;
};

export default mongoConnect;

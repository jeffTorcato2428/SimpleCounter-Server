"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongodb_1 = require("mongodb");
var Mongo_URI = "mongodb+srv://jeff:R9cz6xXtpUHcb4q9@practicecluster-x5udc.mongodb.net/test?retryWrites=true&w=majority";
var mongoClient = new mongodb_1.MongoClient(Mongo_URI, { useNewUrlParser: true });
exports.mongoClient = mongoClient;
var database;
exports.database = database;
mongoClient.connect(function (err) {
    console.log("[Connected to Database]");
    exports.database = database = mongoClient.db("test");
});
//# sourceMappingURL=database.js.map
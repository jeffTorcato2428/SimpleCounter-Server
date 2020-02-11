"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var schema_1 = require("../data/schema");
var graphql_1 = require("graphql");
var schemaPath = path_1.default.resolve(__dirname, '../data/schema.graphql');
fs_1.default.writeFileSync(schemaPath, graphql_1.printSchema(schema_1.schema));
console.log('Wrote ' + schemaPath);
//# sourceMappingURL=updateSchema.js.map